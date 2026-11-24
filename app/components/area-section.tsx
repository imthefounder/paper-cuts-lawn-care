import { MapPin, Phone } from "lucide-react";
import { AREA_TOWNS, SITE } from "@/lib/site";

export function AreaSection() {
  return (
    <section id="area" className="paper-grain bg-paper text-ink-900">
      <div className="wrap py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <span className="eyebrow !text-grass-700 before:!bg-grass-700">
              Service area
            </span>
            <h2 className="display mt-4 text-[clamp(1.9rem,5.2vw,3rem)] text-ink-950">
              Local to {SITE.city}.
              <span className="mt-1.5 block text-grass-700">
                And the towns around it.
              </span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-900/70">
              Paper Cuts is a {SITE.city} company. If you are just outside the
              city line, call or text &mdash; {SITE.owner} will tell you straight
              up whether your street is in range.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a href={SITE.phoneHref} className="btn-grass">
                <Phone className="h-4 w-4" aria-hidden strokeWidth={2.6} />
                {SITE.phoneDisplay}
              </a>
              <a
                href="#estimate"
                className="btn border border-ink-900/15 bg-white text-ink-950 hover:border-grass-600/60"
              >
                Request an estimate
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-[0_1px_0_0_rgba(8,11,9,0.06)] sm:p-8">
              <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-ink-900/45">
                <MapPin className="h-3.5 w-3.5" aria-hidden strokeWidth={2.8} />
                Towns around {SITE.city}
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AREA_TOWNS.map((town) => (
                  <li
                    key={town}
                    className="rounded-full border border-ink-900/10 bg-paper px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-900/75"
                  >
                    {town}
                    {town === SITE.city ? ", OH" : ", OH"}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-dashed border-ink-900/15 pt-4 text-[12.5px] leading-relaxed text-ink-900/55">
                Not seeing your town? Send the estimate form anyway with your
                address &mdash; {SITE.owner} answers with a yes or a no, and a
                referral if it is too far out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
