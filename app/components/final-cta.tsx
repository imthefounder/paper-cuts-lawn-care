import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { TornEdge } from "./torn-edge";

export function FinalCta() {
  return (
    <section className="relative bg-grass-700">
      <TornEdge flip className="h-8 text-paper sm:h-10" />
      <div className="lawn relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-ink-950/25"
        />
        <div className="wrap relative py-14 text-center sm:py-20">
          <h2 className="display mx-auto max-w-3xl text-[clamp(2.1rem,7vw,3.9rem)] text-paper drop-shadow-[0_2px_12px_rgba(8,11,9,0.55)]">
            Free estimate. Straight price. Cut above the rest.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-paper/85 sm:text-base">
            {SITE.promoLine}. {SITE.owner} is taking on {SITE.city}-area yards
            now.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#estimate" className="btn-gold">
              Build my free estimate
              <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2.8} />
            </a>
            <a
              href={SITE.phoneHref}
              className="btn border border-white/25 bg-ink-950/45 text-paper backdrop-blur hover:border-white/60 hover:bg-ink-950/65"
            >
              <Phone className="h-4 w-4" aria-hidden strokeWidth={2.6} />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
