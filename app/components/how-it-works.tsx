import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "Send the list",
    body: `Check the services you need and send your address. Add a couple of yard photos if you want a faster number.`,
  },
  {
    n: "02",
    title: `${SITE.owner} quotes it`,
    body: `You get a straight price for the work, usually the same day. No pressure and no upsell script.`,
  },
  {
    n: "03",
    title: "The yard gets done",
    body: `Pick a day that works, leave the gate open, and come home to a cut lawn and a clean edge.`,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-y border-white/5 bg-ink-900 py-16 sm:py-20"
    >
      <div className="wrap">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">How it works</span>
            <h2 className="display mt-4 text-[clamp(1.9rem,5vw,3rem)] text-paper">
              Three steps, one phone call
            </h2>
          </div>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-white/50">
            No contracts to sign up front and no surprises on the invoice. If
            the quote does not work for you, that is the end of it.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950/60 p-6"
            >
              <span
                aria-hidden
                className="display pointer-events-none absolute right-4 top-2 text-[3.4rem] leading-none text-white/[0.05]"
              >
                {step.n}
              </span>
              <span className="display text-[13px] tracking-[0.2em] text-grass-400">
                {step.n}
              </span>
              <h3 className="display mt-3 text-[1.4rem] text-paper">{step.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/55">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
