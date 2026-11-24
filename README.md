# Paper Cuts Lawn Care - website

Marketing site and quote-request funnel for Paper Cuts Lawn Care (Vandalia, OH).
Next.js 14 App Router, TypeScript, Tailwind CSS, no database.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Lead delivery

The estimate form posts multipart form data to `/api/quote`. Email is the live
channel today; the SMS path is coded and dormant until a Twilio sender number is
purchased and registered with the carriers.

* `GMAIL_USER` + `GMAIL_APP_PASSWORD` set -> the route emails the request (with up
  to 3 compressed yard photos attached) to `QUOTE_TO_EMAIL` and returns
  `{ delivered: true, email: "sent", via: "gmail" }`. Gmail needs 2-Step
  Verification and an app password from myaccount.google.com/apppasswords.
* `RESEND_API_KEY` set -> the same email goes out through Resend instead
  (`via: "resend"`). Resend is tried first, Gmail is the fallback.
* `TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN` + `TWILIO_FROM_NUMBER` (or
  `TWILIO_MESSAGING_SERVICE_SID`) set -> every lead is ALSO texted to
  `QUOTE_TO_SMS` (`(937) 280-5772`). This needs a Twilio number with SMS
  capability **and** carrier registration: A2P 10DLC brand + campaign for a US
  long code, or toll-free verification for an 8xx. Trial accounts can only text
  numbers verified in the console, and a $0.00 balance cannot buy a number.
* If every channel is unconfigured or fails, nothing is silently dropped: the
  route logs the lead to the Vercel function logs and returns
  `{ delivered: false }`. The UI then shows a one-tap "Text it to James" /
  "Email it to James" panel with the request already written out.

Set these in Vercel -> Project -> Settings -> Environment Variables:

| Name | Value |
| --- | --- |
| `GMAIL_USER` | the Google account that sends the leads |
| `GMAIL_APP_PASSWORD` | 16-character Google app password (never the account password) |
| `RESEND_API_KEY` | optional alternative sender, from [resend.com](https://resend.com) |
| `QUOTE_TO_EMAIL` | `papercutslawn@gmail.com` |
| `QUOTE_FROM_EMAIL` | `Paper Cuts Lawn Care <onboarding@resend.dev>` until a domain is verified |
| `QUOTE_TO_SMS` | `+19372805772` (only used once Twilio is configured) |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER` | dormant SMS path |

Resend's free tier only sends to the address that owns the account, so sign up
with `papercutslawn@gmail.com` or verify `papercutslawncare.com` and switch
`QUOTE_FROM_EMAIL` to `quotes@papercutslawncare.com` — the Gmail app-password path
has no such restriction.

## Content source

Everything customer-facing (services, phone, email, the $5 flyer promo, the
"welcome mat" line, "Cut Above the Rest") comes from the printed door hanger.
Pricing is intentionally absent: the flyer leaves quote boxes blank for James to
fill in, so the site sells free estimates rather than invented prices.

## Structure

```
app/
  layout.tsx            metadata, fonts, LocalBusiness JSON-LD
  page.tsx              section order
  globals.css           brand tokens and component classes
  components/           header, hero, services, quote builder, faq, footer
  api/quote/route.ts    validation, rate limit, Resend delivery
  opengraph-image.tsx   social card
  robots.ts sitemap.ts manifest.ts
lib/
  site.ts               phone, email, area towns, FAQ copy
  services.ts           the nine services from the flyer
```
