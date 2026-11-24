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

The estimate form posts multipart form data to `/api/quote`. Every lead is texted
to the owner's phone **(937) 280-5772** through Twilio; email is the secondary
channel that carries the yard photos.

* `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` and `TWILIO_FROM_NUMBER` (or
  `TWILIO_MESSAGING_SERVICE_SID`) set -> the route sends the lead as a real SMS
  to `QUOTE_TO_SMS` (defaults to the number in `lib/site.ts`) and returns
  `{ delivered: true, sms: "sent" }`.
* `RESEND_API_KEY` set -> the same lead is also emailed, with up to 3 compressed
  yard photos attached, to `QUOTE_TO_EMAIL`.
* If neither channel is configured or both fail, nothing is silently dropped: the
  route logs the lead to the Vercel function logs and returns
  `{ delivered: false }`. The UI then shows a one-tap "Text it to James" /
  "Email it to James" panel with the request already written out.

Set these in Vercel -> Project -> Settings -> Environment Variables:

| Name | Value |
| --- | --- |
| `TWILIO_ACCOUNT_SID` | from [console.twilio.com](https://console.twilio.com) |
| `TWILIO_AUTH_TOKEN` | from the Twilio console |
| `TWILIO_FROM_NUMBER` | the Twilio number (or toll-free) texts are sent FROM, E.164 `+1XXXXXXXXXX` |
| `TWILIO_MESSAGING_SERVICE_SID` | optional, replaces `TWILIO_FROM_NUMBER` |
| `QUOTE_TO_SMS` | `+19372805772` (default; the lead destination) |
| `RESEND_API_KEY` | optional, from [resend.com](https://resend.com) (free tier) |
| `QUOTE_TO_EMAIL` | `papercutslawn@gmail.com` |
| `QUOTE_FROM_EMAIL` | `Paper Cuts Lawn Care <onboarding@resend.dev>` until a domain is verified |

US carriers require A2P 10DLC registration for application-to-person traffic: buy
or register a 10DLC brand/campaign in the Twilio console (toll-free numbers need
verification instead). Twilio trial accounts can only text numbers verified in the
console, so verify `+19372805772` before the first live lead.

Resend's free tier only sends to the address that owns the account, so sign up
with `papercutslawn@gmail.com` or verify `papercutslawncare.com` and switch
`QUOTE_FROM_EMAIL` to `quotes@papercutslawncare.com`.

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
