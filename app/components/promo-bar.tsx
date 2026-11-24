import { Scissors } from "lucide-react";
import { SITE } from "@/lib/site";

export function PromoBar() {
  return (
    <div className="relative z-50 bg-gold-500 text-ink-950">
      <div className="wrap flex items-center justify-center gap-2.5 py-2 text-center">
        <Scissors className="hidden h-3.5 w-3.5 shrink-0 sm:block" aria-hidden strokeWidth={2.6} />
        <p className="text-balance text-[11px] font-black uppercase leading-tight tracking-[0.1em] sm:text-[12.5px]">
          Mention the door hanger flyer for{" "}
          <span className="underline decoration-2 underline-offset-2">
            {SITE.promo}
          </span>{" "}
          your service
        </p>
      </div>
    </div>
  );
}
