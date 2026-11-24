import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/95 backdrop-blur md:hidden">
      <div className="safe-bottom grid grid-cols-2 gap-2 px-3 pt-2.5">
        <a
          href={SITE.phoneHref}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] text-paper"
        >
          <Phone className="h-4 w-4 text-grass-300" aria-hidden strokeWidth={2.8} />
          Call {SITE.owner}
        </a>
        <a
          href="#estimate"
          className="flex items-center justify-center gap-2 rounded-xl bg-gold-500 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] text-ink-950"
        >
          Free estimate
          <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={3} />
        </a>
      </div>
    </div>
  );
}
