import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-3 sm:h-[74px]">
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3">
          <Logo className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
          <span className="leading-none">
            <span className="display block text-[17px] text-paper sm:text-[19px]">
              Paper Cuts
            </span>
            <span className="mt-1 block text-[8.5px] font-extrabold uppercase tracking-[0.34em] text-grass-400">
              Lawn Care
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {NAV.filter((item) => item.href !== "#estimate").map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold text-white/60 transition hover:text-grass-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={SITE.phoneHref}
          className="btn-grass px-3.5 py-2.5 text-[11px] sm:px-4 sm:text-[12px]"
        >
          <Phone className="h-4 w-4" aria-hidden strokeWidth={2.6} />
          <span className="whitespace-nowrap">{SITE.phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}
