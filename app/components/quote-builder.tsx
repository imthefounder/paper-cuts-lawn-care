"use client";

import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  X,
} from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "manual" | "error";

type Fields = {
  name: string;
  phone: string;
  address: string;
  notes: string;
  company: string;
};

const EMPTY: Fields = {
  name: "",
  phone: "",
  address: "",
  notes: "",
  company: "",
};

const MAX_PHOTOS = 3;

async function compressImage(
  file: File,
  maxWidth = 1280,
  quality = 0.75,
): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(file);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          resolve(
            new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
              type: "image/jpeg",
            }),
          );
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };
    img.src = objectUrl;
  });
}

export function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>(["mowing"]);
  const [promo, setPromo] = useState(true);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectedNames = useMemo(
    () =>
      selected
        .map((id) => SERVICES.find((s) => s.id === id)?.name)
        .filter(Boolean) as string[],
    [selected],
  );

  const summary = useMemo(() => {
    return [
      "Hi James, I would like a free estimate from Paper Cuts Lawn Care.",
      "",
      `Name: ${fields.name || "-"}`,
      `Phone: ${fields.phone || "-"}`,
      `Address: ${fields.address || "-"}`,
      `Services: ${selectedNames.join(", ") || "-"}`,
      `Notes: ${fields.notes || "-"}`,
      `Door hanger $5 off: ${promo ? "yes" : "no"}`,
      `Photos to send: ${photos.length}`,
    ].join("\n");
  }, [fields, selectedNames, promo, photos.length]);

  const smsLink = `${SITE.smsHref}?body=${encodeURIComponent(summary)}`;
  const mailtoLink = `${SITE.emailHref}?subject=${encodeURIComponent(
    `Free estimate request - ${fields.name || "Paper Cuts Lawn Care"}`,
  )}&body=${encodeURIComponent(summary)}`;

  const setField = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files;
    if (!picked || picked.length === 0) return;
    setError(null);
    setCompressing(true);
    try {
      const room = MAX_PHOTOS - photos.length;
      const incoming = Array.from(picked)
        .filter((file) => file.type.startsWith("image/"))
        .slice(0, room);
      const compressed = await Promise.all(incoming.map((f) => compressImage(f)));
      const combined = [...photos, ...compressed].slice(0, MAX_PHOTOS);
      setPhotos(combined);
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews(combined.map((file) => URL.createObjectURL(file)));
    } catch {
      setError("One of those images could not be processed. Try another photo.");
    } finally {
      setCompressing(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) {
      setError("Pick at least one service so James knows what to quote.");
      return;
    }
    setStatus("sending");
    setError(null);
    try {
      const payload = new FormData();
      payload.append("name", fields.name);
      payload.append("phone", fields.phone);
      payload.append("address", fields.address);
      payload.append("notes", fields.notes);
      payload.append("company", fields.company);
      payload.append("applyPromo", String(promo));
      payload.append("selectedServices", JSON.stringify(selected));
      photos.forEach((photo) => payload.append("photos", photo));

      const res = await fetch("/api/quote", { method: "POST", body: payload });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        delivered?: boolean;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus(data.delivered ? "sent" : "manual");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Could not send that. Please call ${SITE.phoneDisplay}.`,
      );
      setStatus("error");
    }
  };

  const resetAll = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFields(EMPTY);
    setPhotos([]);
    setPreviews([]);
    setSelected(["mowing"]);
    setPromo(true);
    setStatus("idle");
    setError(null);
  };

  if (status === "sent" || status === "manual") {
    const sent = status === "sent";
    return (
      <div className="mx-auto max-w-xl">
        <div
          className={
            sent
              ? "rounded-2xl border border-grass-500/40 bg-grass-500/10 p-6 text-center sm:p-8"
              : "rounded-2xl border border-gold-500/40 bg-gold-500/[0.08] p-6 text-center sm:p-8"
          }
        >
          {sent ? (
            <CheckCircle2
              className="mx-auto h-11 w-11 text-grass-300"
              aria-hidden
              strokeWidth={2.2}
            />
          ) : (
            <AlertTriangle
              className="mx-auto h-11 w-11 text-gold-400"
              aria-hidden
              strokeWidth={2.2}
            />
          )}
          <h3 className="display mt-4 text-[1.7rem] text-paper">
            {sent ? "Request sent to James" : "One tap left"}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70">
            {sent ? (
              <>
                Thanks{fields.name ? `, ${fields.name.split(" ")[0]}` : ""}.{" "}
                {SITE.owner} has your list of {selected.length} service
                {selected.length === 1 ? "" : "s"} and will reach out at{" "}
                <span className="font-semibold text-white">{fields.phone}</span>
                {promo ? " with the $5 flyer discount noted" : ""}.
              </>
            ) : (
              <>
                Your details are filled in and ready. The automatic text did not
                go through, so use one of the buttons below and it lands in{" "}
                {SITE.owner}&rsquo;s phone or inbox in one tap.
              </>
            )}
          </p>

          {!sent && (
            <div className="mt-6 grid gap-2.5 text-left">
              <a href={smsLink} className="btn-grass w-full">
                <MessageSquare className="h-4 w-4" aria-hidden strokeWidth={2.6} />
                Text it to {SITE.owner} at {SITE.phoneDisplay}
              </a>
              <a href={mailtoLink} className="btn-ghost w-full">
                <Mail className="h-4 w-4" aria-hidden strokeWidth={2.6} />
                Email it to {SITE.owner}
              </a>
              <a href={SITE.phoneHref} className="btn-ghost w-full">
                <Phone className="h-4 w-4" aria-hidden strokeWidth={2.6} />
                Call {SITE.phoneDisplay}
              </a>
            </div>
          )}

          {sent && (
            <a href={SITE.phoneHref} className="btn-ghost mx-auto mt-6 w-full max-w-xs">
              <Phone className="h-4 w-4" aria-hidden strokeWidth={2.6} />
              Call {SITE.phoneDisplay}
            </a>
          )}

          <button
            type="button"
            onClick={resetAll}
            className="mt-5 text-[12px] font-bold uppercase tracking-[0.1em] text-gold-400 underline underline-offset-4 hover:text-gold-300"
          >
            Start another request
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div className="grid items-start gap-5 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-7">
        <div className="card p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="display text-[1.55rem] text-paper">
                1. Pick your services
              </h3>
              <p className="mt-1.5 text-[13px] text-white/55">
                Tap everything you want priced. Nothing is booked until you say
                yes.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-grass-500/40 bg-grass-500/15 px-3 py-1 text-[11px] font-extrabold text-grass-300">
              {selected.length} selected
            </span>
          </div>

          <div
            role="group"
            aria-label="Choose services"
            className="mt-5 grid gap-2.5 sm:grid-cols-2"
          >
            {SERVICES.map((service) => {
              const on = selected.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggleService(service.id)}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                    on
                      ? "border-grass-500/70 bg-grass-500/10 text-paper"
                      : "border-white/10 bg-ink-950/50 text-white/70 hover:border-white/25 hover:bg-ink-950/80"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition ${
                      on
                        ? "border-grass-400 bg-grass-500 text-ink-950"
                        : "border-white/25 bg-ink-900"
                    }`}
                  >
                    {on && (
                      <Check className="h-3.5 w-3.5" aria-hidden strokeWidth={3.6} />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-bold leading-snug">
                      {service.name}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-white/45">
                      {service.tile}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {selectedNames.length > 0 && (
            <p className="mt-4 text-[12px] leading-relaxed text-white/45">
              <span className="font-bold uppercase tracking-[0.12em] text-white/35">
                Your list:
              </span>{" "}
              {selectedNames.join(" · ")}
            </p>
          )}

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-gold-500/30 bg-gold-500/[0.07] p-4 transition hover:border-gold-500/60">
            <input
              type="checkbox"
              checked={promo}
              onChange={(e) => setPromo(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-gold-500"
            />
            <span>
              <span className="block text-[13px] font-extrabold text-gold-300">
                I have the door hanger flyer &mdash; apply $5 off
              </span>
              <span className="mt-0.5 block text-[11.5px] text-white/50">
                Mentioning the flyer takes $5 off your service. Uncheck if you
                do not have one.
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="lg:col-span-5">
        <form
          onSubmit={handleSubmit}
          className="card p-5 sm:p-7 lg:sticky lg:top-24"
        >
          <h3 className="display text-[1.55rem] text-paper">
            2. Where should {SITE.owner} call?
          </h3>
          <p className="mt-1.5 text-[13px] text-white/55">
            No account, no card. Just enough to quote the job.
          </p>

          <div className="mt-5 space-y-3.5">
            <div>
              <label className="label" htmlFor="q-name">
                Full name *
              </label>
              <input
                id="q-name"
                className="field"
                required
                autoComplete="name"
                placeholder="Jordan Miller"
                value={fields.name}
                onChange={setField("name")}
              />
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="q-phone">
                  Phone *
                </label>
                <input
                  id="q-phone"
                  className="field"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(937) 555-0142"
                  value={fields.phone}
                  onChange={setField("phone")}
                />
              </div>
              <div>
                <label className="label" htmlFor="q-address">
                  Address *
                </label>
                <input
                  id="q-address"
                  className="field"
                  required
                  autoComplete="street-address"
                  placeholder="123 Main St, Vandalia"
                  value={fields.address}
                  onChange={setField("address")}
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="q-notes">
                Yard details (optional)
              </label>
              <textarea
                id="q-notes"
                className="field resize-none"
                rows={3}
                placeholder="Corner lot, fenced back yard, overgrown bushes by the garage, best after 5pm..."
                value={fields.notes}
                onChange={setField("notes")}
              />
            </div>

            <div>
              <span className="label">
                Yard photos (optional &mdash; up to {MAX_PHOTOS})
              </span>

              {photos.length < MAX_PHOTOS && (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-white/15 bg-ink-950/50 px-4 py-4 text-center transition hover:border-grass-500/60 hover:bg-ink-950/80">
                  <Camera
                    className="h-5 w-5 text-grass-400"
                    aria-hidden
                    strokeWidth={2.4}
                  />
                  <span className="text-[12.5px] font-semibold text-white/80">
                    {compressing
                      ? "Optimizing photos..."
                      : "Tap to add yard photos"}
                  </span>
                  <span className="text-[10.5px] text-white/40">
                    Shrunk automatically so it sends fast
                  </span>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className="sr-only"
                  />
                </label>
              )}

              {previews.length > 0 && (
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {previews.map((src, index) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-lg border border-white/15 bg-ink-950"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Yard photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        aria-label={`Remove photo ${index + 1}`}
                        className="absolute right-1 top-1 rounded-full bg-ink-950/85 p-1 text-white transition hover:bg-red-600"
                      >
                        <X className="h-3 w-3" aria-hidden strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden" aria-hidden>
              <label htmlFor="q-company">Company</label>
              <input
                id="q-company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={fields.company}
                onChange={setField("company")}
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-800/60 bg-red-950/50 px-3.5 py-2.5 text-[12.5px] font-semibold text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending || compressing || selected.length === 0}
              className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending request...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden strokeWidth={2.8} />
                  Get my free estimate
                </>
              )}
            </button>

            <p className="text-center text-[11px] leading-relaxed text-white/40">
              Goes straight to {SITE.owner}. No spam, no mailing list. Prefer to
              talk?{" "}
              <a
                href={SITE.phoneHref}
                className="font-semibold text-grass-300 underline underline-offset-2"
              >
                Call {SITE.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
