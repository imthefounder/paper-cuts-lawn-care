import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { SERVICES } from "@/lib/services";
import { AREA_TOWNS, NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <div className="leading-none">
                <div className="display text-lg text-paper">Paper Cuts</div>
                <div className="mt-1 text-[8.5px] font-extrabold uppercase tracking-[0.34em] text-grass-400">
                  Lawn Care
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/50">
              Locally owned lawn mowing and full-property clean ups based in{" "}
              {SITE.region}. Free estimates, no contracts, ask for {SITE.owner}.
            </p>
            <p className="mt-4 font-serif text-[15px] italic text-gold-400">
              &ldquo;{SITE.quote}&rdquo;
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-white/40">
              Services
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-1.5 text-[12.5px] text-white/60 sm:grid-cols-2 lg:grid-cols-1">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#estimate"
                    className="transition hover:text-grass-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-white/40">
              Get in touch
            </h2>
            <ul className="mt-3 space-y-2.5 text-[13px]">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 font-semibold text-paper transition hover:text-grass-300"
                >
                  <Phone className="h-3.5 w-3.5 text-grass-400" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-2 break-all text-white/60 transition hover:text-grass-300"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-grass-400" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <MapPin className="h-3.5 w-3.5 text-grass-400" aria-hidden />
                Based in {SITE.region}
              </li>
            </ul>
            <p className="mt-4 text-[11.5px] leading-relaxed text-white/35">
              Serving {AREA_TOWNS.slice(0, 5).join(", ")}, and nearby.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/35">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 transition hover:text-grass-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
