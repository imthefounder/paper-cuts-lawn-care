import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { TornEdge } from "./torn-edge";

const FLYER_LIST = SERVICES.filter((s) => s.id !== "other").slice(0, 6);

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-grass-700/25 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="wrap relative grid gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-7">
          <span className="eyebrow">
            <MapPin className="h-3.5 w-3.5" aria-hidden strokeWidth={2.6} />
            {SITE.city}&rsquo;s trusted lawn service
          </span>

          <h1 className="mt-5">
            <span className="display block text-[clamp(2.9rem,10.5vw,5.4rem)] text-paper">
              Cut Above
              <br />
              <span className="text-grass-400">The Rest</span>
            </span>
            <span className="mt-5 block max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-[17px]">
              Precision lawn mowing, bush and tree trimming, aeration, and
              full-property clean ups in {SITE.region}. Free estimates on every
              job &mdash; ask for {SITE.owner}.
            </span>
          </h1>

          <p className="mt-6 font-serif text-[17px] italic text-gold-400 sm:text-xl">
            &ldquo;{SITE.quote}&rdquo;
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#estimate" className="btn-gold">
              Get your free estimate
              <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={2.8} />
            </a>
            <a href={SITE.phoneHref} className="btn-ghost">
              <Phone className="h-4 w-4" aria-hidden strokeWidth={2.6} />
              Call {SITE.owner}: {SITE.phoneDisplay}
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <dd className="display text-2xl text-grass-300 sm:text-3xl">
                {SERVICES.length}
              </dd>
              <dt className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/45">
                Yard services
              </dt>
            </div>
            <div>
              <dd className="display text-2xl text-grass-300 sm:text-3xl">Free</dd>
              <dt className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/45">
                Estimates
              </dt>
            </div>
            <div>
              <dd className="display text-2xl text-grass-300 sm:text-3xl">Local</dd>
              <dt className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/45">
                {SITE.city}, {SITE.state}
              </dt>
            </div>
          </dl>
        </div>

        <aside className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] bg-grass-500/10 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-ink-900 shadow-lift">
              <div className="bg-gold-400 px-4 py-2.5 text-center text-[10.5px] font-black uppercase tracking-[0.14em] text-ink-950">
                Mention the flyer &mdash; {SITE.promo} your service
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-center font-serif text-[17px] italic leading-snug text-grass-300">
                  &ldquo;{SITE.quote}&rdquo;
                </p>

                <div className="mt-5 rounded-xl border border-dashed border-white/20 p-4">
                  <div className="flex items-center justify-between text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-white/35">
                    <span>Service</span>
                    <span>Free quote</span>
                  </div>
                  <ul className="mt-2.5 space-y-2">
                    {FLYER_LIST.map((service) => (
                      <li
                        key={service.id}
                        className="flex items-center justify-between gap-3 text-[13px] font-semibold text-white/80"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border border-grass-500/70 bg-grass-500/20">
                            <Check
                              className="h-3 w-3 text-grass-300"
                              aria-hidden
                              strokeWidth={3.4}
                            />
                          </span>
                          {service.short}
                        </span>
                        <span className="h-4 w-10 rounded-[3px] border border-white/20 bg-white/5" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 rounded-xl bg-ink-950/70 p-4">
                  <div className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Ask for {SITE.owner}
                  </div>
                  <a
                    href={SITE.phoneHref}
                    className="display mt-1 block text-[26px] text-paper transition hover:text-grass-300"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <a
                    href={SITE.emailHref}
                    className="mt-1 block break-all text-[12px] text-white/55 transition hover:text-grass-300"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <TornEdge className="h-8 text-paper sm:h-12" />
    </section>
  );
}
