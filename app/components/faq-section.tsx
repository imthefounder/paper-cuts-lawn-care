import { Plus } from "lucide-react";
import { FAQS, SITE } from "@/lib/site";

export function FaqSection() {
  return (
    <section id="faq" className="paper-grain bg-paper pb-16 text-ink-900 sm:pb-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <span className="eyebrow !text-grass-700 before:!bg-grass-700">
            Questions
          </span>
          <h2 className="display mt-4 text-[clamp(1.9rem,5.5vw,3.1rem)] text-ink-950">
            What neighbors ask before booking
          </h2>
        </div>

        <div className="mt-8 grid gap-2.5">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-ink-900/10 bg-white px-5 py-4 transition open:border-grass-600/30 open:shadow-[0_12px_28px_-20px_rgba(8,11,9,0.5)]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[14.5px] font-extrabold leading-snug text-ink-950 [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="mt-0.5 h-4 w-4 shrink-0 text-grass-700 transition duration-200 group-open:rotate-45"
                  aria-hidden
                  strokeWidth={3}
                />
              </summary>
              <p className="mt-3 max-w-3xl text-[13.5px] leading-relaxed text-ink-900/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-7 text-[13px] text-ink-900/60">
          Still stuck?{" "}
          <a
            href={SITE.phoneHref}
            className="font-bold text-grass-700 underline underline-offset-2"
          >
            Call {SITE.owner} at {SITE.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a
            href={SITE.emailHref}
            className="font-bold text-grass-700 underline underline-offset-2"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
