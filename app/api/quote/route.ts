import { NextResponse } from "next/server";
import { SERVICE_LOOKUP } from "@/lib/services";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PHOTOS = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;

/**
 * Best-effort per-instance rate limit. Serverless instances are ephemeral, so
 * this is a speed bump for scripted abuse, not a security boundary.
 */
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 400) hits.clear();
  return false;
}

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function esc(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);
}

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

/** E.164 for US/CA numbers: +1XXXXXXXXXX. Numbers already in +CC form pass through. */
function toE164(value: string): string {
  const raw = value.trim();
  const d = digits(raw);
  if (raw.startsWith("+")) return `+${d}`;
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return `+${d}`;
}

type Lead = {
  name: string;
  phone: string;
  address: string;
  notes: string;
  services: string[];
  promo: boolean;
  photos: File[];
};

type Channel = {
  status: "sent" | "not_configured" | "failed";
  detail?: string;
};

/** The phone that receives every quote request as a text. */
const SMS_TARGET = toE164(process.env.QUOTE_TO_SMS || SITE.smsNumber);

function smsBody(lead: Lead): string {
  const notes = lead.notes ? lead.notes.replace(/\s+/g, " ").slice(0, 220) : "none";
  return [
    "PAPER CUTS - NEW ESTIMATE REQUEST (text message)",
    `${lead.name} - ${lead.phone}`,
    lead.address,
    `Services: ${lead.services.join(", ")}`,
    `Notes: ${notes}`,
    lead.promo ? "$5 door hanger: YES" : "$5 door hanger: no",
    lead.photos.length
      ? `Photos: ${lead.photos.length} on the online form (${SITE.url})`
      : "",
    `Reply to ${lead.phone} with the estimate.`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Twilio REST over plain fetch - no SDK, no extra bundle weight.
 * Works with a single Twilio/toll-free From number or a Messaging Service SID.
 */
async function sendSms(lead: Lead): Promise<Channel> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const serviceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!sid || !token || (!from && !serviceSid)) return { status: "not_configured" };

  const body = new URLSearchParams({ To: SMS_TARGET, Body: smsBody(lead) });
  if (serviceSid) body.set("MessagingServiceSid", serviceSid);
  else body.set("From", toE164(String(from)));

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("[paper-cuts:twilio]", res.status, detail.slice(0, 500));
      return { status: "failed", detail: `twilio_${res.status}` };
    }

    const data = (await res.json().catch(() => ({}))) as { sid?: string; status?: string };
    console.log("[paper-cuts:twilio]", SMS_TARGET, data.sid ?? "", data.status ?? "");
    return { status: "sent" };
  } catch (err) {
    console.error("[paper-cuts:twilio]", err);
    return { status: "failed", detail: "twilio_unreachable" };
  }
}

function emailHtml(lead: Lead): string {
  const rows = lead.services
    .map((name) => `<li style="margin:0 0 6px;">&#9989; <strong>${esc(name)}</strong></li>`)
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e4e4e7;border-radius:14px;overflow:hidden;">
    <div style="background:#0d120e;padding:22px;text-align:center;">
      <div style="color:#84c02a;font-size:20px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Paper Cuts Lawn Care</div>
      <div style="color:#f5f3ea;font-size:13px;margin-top:6px;">New online estimate request</div>
    </div>
    <div style="padding:24px;color:#111827;">
      ${
        lead.promo
          ? `<div style="background:#fef3c7;border:1px solid #f2c518;color:#7c4a03;padding:12px;border-radius:8px;font-weight:700;text-align:center;margin-bottom:20px;">DOOR HANGER PROMO &mdash; $5 OFF</div>`
          : ""
      }
      <div style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e4e4e7;padding-bottom:8px;">Customer</div>
      <p style="margin:10px 0;"><strong>Name:</strong> ${esc(lead.name)}</p>
      <p style="margin:10px 0;"><strong>Phone:</strong> <a href="tel:${esc(lead.phone)}" style="color:#4e7d12;">${esc(lead.phone)}</a></p>
      <p style="margin:10px 0;"><strong>Address:</strong> ${esc(lead.address)}</p>
      <p style="margin:10px 0;"><strong>Notes:</strong> ${esc(lead.notes || "None provided")}</p>
      <p style="margin:10px 0;"><strong>Photos attached:</strong> ${lead.photos.length}</p>
      <div style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e4e4e7;padding-bottom:8px;margin-top:24px;">Requested services</div>
      <ul style="list-style:none;padding:0;margin:12px 0 0;">${rows}</ul>
    </div>
    <div style="background:#f5f3ea;padding:14px;text-align:center;color:#6b7280;font-size:12px;">
      Sent from ${esc(SITE.url)} &middot; reply directly to this address to reach the customer by phone.
    </div>
  </div>`;
}

function emailText(lead: Lead): string {
  return [
    "PAPER CUTS LAWN CARE - new online estimate request",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Address: ${lead.address}`,
    `Notes: ${lead.notes || "None provided"}`,
    `Door hanger $5 off: ${lead.promo ? "YES" : "no"}`,
    `Photos attached: ${lead.photos.length}`,
    "",
    "Services:",
    ...lead.services.map((name) => ` - ${name}`),
  ].join("\n");
}

async function sendEmail(lead: Lead): Promise<Channel> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || SITE.email;
  const from = process.env.QUOTE_FROM_EMAIL || "Paper Cuts Lawn Care <onboarding@resend.dev>";

  if (!apiKey) return { status: "not_configured" };

  const attachments = await Promise.all(
    lead.photos.map(async (file) => ({
      filename: file.name || "yard-photo.jpg",
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })),
  );

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New estimate request: ${lead.name} (${lead.address})${
          lead.photos.length
            ? ` [${lead.photos.length} photo${lead.photos.length === 1 ? "" : "s"}]`
            : ""
        }`,
        html: emailHtml(lead),
        text: emailText(lead),
        attachments,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[paper-cuts:resend]", res.status, detail.slice(0, 500));
      return { status: "failed", detail: `resend_${res.status}` };
    }

    return { status: "sent" };
  } catch (err) {
    console.error("[paper-cuts:resend]", err);
    return { status: "failed", detail: "resend_unreachable" };
  }
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests from this connection. Please call or try again shortly." },
        { status: 429 },
      );
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return NextResponse.json(
        { ok: false, error: "That request did not come from the estimate form. Please use the form on the site or call." },
        { status: 400 },
      );
    }

    // Honeypot: real browsers leave this empty because it is visually hidden.
    if (String(form.get("company") ?? "").trim() !== "") {
      return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
    }

    const name = String(form.get("name") ?? "").trim().slice(0, 120);
    const phone = String(form.get("phone") ?? "").trim().slice(0, 40);
    const address = String(form.get("address") ?? "").trim().slice(0, 200);
    const notes = String(form.get("notes") ?? "").trim().slice(0, 2000);
    const promo = String(form.get("applyPromo") ?? "false") === "true";

    let selected: string[] = [];
    try {
      const parsed = JSON.parse(String(form.get("selectedServices") ?? "[]"));
      if (Array.isArray(parsed)) {
        selected = parsed
          .filter((id): id is string => typeof id === "string")
          .filter((id) => Boolean(SERVICE_LOOKUP[id]))
          .slice(0, 12);
      }
    } catch {
      selected = [];
    }

    const services = selected.map((id) => SERVICE_LOOKUP[id].name);

    if (!name || !phone || !address || services.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please add your name, phone, address, and at least one service.",
        },
        { status: 400 },
      );
    }

    if (digits(phone).length < 10) {
      return NextResponse.json(
        { ok: false, error: "That phone number looks incomplete. Please double-check it." },
        { status: 400 },
      );
    }

    const rawPhotos = form.getAll("photos").filter((entry): entry is File => entry instanceof File);
    const photos = rawPhotos.filter((file) => file.size > 0).slice(0, MAX_PHOTOS);
    const totalBytes = photos.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Those photos are too large to send. Try fewer or smaller photos." },
        { status: 413 },
      );
    }

    const lead: Lead = { name, phone, address, notes, services, promo, photos };

    // Always leave a trace in the function logs so a lead is never fully lost.
    console.log(
      "[paper-cuts:lead]",
      JSON.stringify({
        at: new Date().toISOString(),
        name,
        phone,
        address,
        services,
        promo,
        photos: photos.length,
        smsTo: SMS_TARGET,
      }),
    );

    // Text first (James reads texts on the job), email second (carries the photos).
    const [sms, email] = await Promise.all([sendSms(lead), sendEmail(lead)]);
    console.log("[paper-cuts:delivery]", JSON.stringify({ sms, email }));

    const delivered = sms.status === "sent" || email.status === "sent";

    if (!delivered) {
      return NextResponse.json(
        {
          ok: true,
          delivered: false,
          reason:
            sms.status === "failed" || email.status === "failed"
              ? "delivery_failed"
              : "channels_not_configured",
          sms: sms.status,
          email: email.status,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { ok: true, delivered: true, sms: sms.status, email: email.status },
      { status: 200 },
    );
  } catch (err) {
    console.error("[paper-cuts:quote]", err);
    return NextResponse.json(
      { ok: false, error: `Failed to process that request. Please call ${SITE.phoneDisplay}.` },
      { status: 500 },
    );
  }
}
