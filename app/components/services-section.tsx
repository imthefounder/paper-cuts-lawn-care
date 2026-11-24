import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { ServiceIcon } from "./service-icon";

export function ServicesSection() {
  return (
    <section id="services" className="paper-grain bg-paper text-ink-900">
      <div className="wrap py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow before:bg-grass-700 !text-grass-700">
            What we do
          </span>
          <h2 className="display mt-4 text-[clamp(1.9rem,5.4vw,3.3rem)] text-ink-950">
            Every service on the flyer.
            <span className="mt-1.5 block text-grass-700">
              One free walk-through.
            </span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-900/70 sm:text-base">
            Pick one job or the whole list. {SITE.owner} gives a straight price
            before anything starts, and you can bundle several services into a
            single visit.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <div className="group flex h-full flex-col rounded-2xl border border-ink-900/10 bg-white p-5 shadow-[0_1px_0_0_rgba(8,11,9,0.06)] transition duration-200 hover:-translate-y-1 hover:border-grass-600/40 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-grass-500/15 text-grass-700 transition group-hover:bg-grass-500 group-hover:text-ink-950">
                    <ServiceIcon name={service.icon} className="h-[19px] w-[19px]" />
                  </span>
                  <h3 className="text-[15px] font-extrabold leading-tight text-ink-950">
                    {service.name}
                  </h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-900/65">
                  {service.blurb}
                </p>
                <a
                  href="#estimate"
                  className="mt-4 inline-flex items-center gap-1.5 pt-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-grass-700 transition group-hover:gap-2.5"
                >
                  Add to my estimate
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden strokeWidth={3} />
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[13px] text-ink-900/55">
          Have something that is not on the list? Storm clean up, hauling, and
          one-time jobs all get a free estimate.
        </p>
      </div>
    </section>
  );
}
