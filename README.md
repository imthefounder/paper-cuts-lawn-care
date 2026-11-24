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

The estimate form posts multipart form data to `/api/quote`.

* With `RESEND_API_KEY` set, the route emails the request (plus up to 3 compressed
  yard photos as attachments) to `QUOTE_TO_EMAIL` and returns `{ delivered: true }`.
* Without a key, nothing is silently dropped: the route logs the lead to the
  Vercel function logs and returns `{ delivered: false }`. The UI then shows a
  one-tap "Text it to James" / "Email it to James" panel with the request already
  written out.

Set these in Vercel -> Project -> Settings -> Environment Variables:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | from [resend.com](https://resend.com) (free tier) |
| `QUOTE_TO_EMAIL` | `papercutslawn@gmail.com` |
| `QUOTE_FROM_EMAIL` | `Paper Cuts Lawn Care <onboarding@resend.dev>` until a domain is verified |

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
