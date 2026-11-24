import { Clock3, ShieldCheck, Wallet } from "lucide-react";
import { SITE } from "@/lib/site";
import { QuoteBuilder } from "./quote-builder";

const POINTS = [
  {
    icon: Clock3,
    title: "Same-week estimates",
    body: "Send the form and James gets back to you with a price, not a sales pitch.",
  },
  {
    icon: Wallet,
    title: "Free, no obligation",
    body: "Every estimate on the flyer is free. You only pay if you like the number.",
  },
  {
    icon: ShieldCheck,
    title: "One person, start to finish",
    body: "James quotes the job and James does the job. No rotating crews.",
  },
];

export function QuoteSection() {
  return (
    <section id="estimate" className="relative bg-ink-950 py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-grass-900/25 to-transparent"
      />
      <div className="wrap relative">
        <div className="max-w-2xl">
          <span className="eyebrow">Free estimate</span>
          <h2 className="display mt-4 text-[clamp(2rem,6vw,3.4rem)] text-paper">
            Tell {SITE.owner} what your yard needs
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:text-base">
            Check the services, drop in your address, and hit send. Everything
            lands with {SITE.owner} in {SITE.city} &mdash; usually answered the
            same day.
          </p>
        </div>

        <div className="mt-10">
          <QuoteBuilder />
        </div>

        <ul className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-grass-300">
                <point.icon className="h-4 w-4" aria-hidden strokeWidth={2.4} />
              </span>
              <div>
                <h3 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-paper">
                  {point.title}
                </h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/50">
                  {point.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
