import { ArrowDown, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { useRevealGroup } from '../hooks/useRevealGroup';

const results = [
  {
    client: 'Blue Ridge Logistics',
    area: 'Inventory operations',
    challenge: 'Stock discrepancies and time-consuming manual inventory work.',
    solution: 'Rebuilt the inventory system around the team’s operational workflow.',
    result: '80%',
    outcome: 'fewer stock discrepancies',
    icon: TrendingDown,
    accent: 'cyan',
  },
  {
    client: 'Savannah Retail Co.',
    area: 'Digital commerce',
    challenge: 'Launch a reliable e-commerce experience built to support growth.',
    solution: 'Delivered an e-commerce platform aligned to the company’s vision.',
    result: '2×',
    outcome: 'revenue within three months',
    icon: TrendingUp,
    accent: 'blue',
  },
];

export function ResultsImpact() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section ref={ref} id="results" className="section-padding relative overflow-hidden bg-[#0F172A]">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.08]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.08] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Results &amp; Impact</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Better systems. Measurable change.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Client outcomes show what focused engineering can change across day-to-day operations and growth.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {results.map((item, index) => {
            const Icon = item.icon;
            const accent = item.accent === 'cyan'
              ? 'text-cyan-300 bg-cyan-400/10 border-cyan-300/20'
              : 'text-blue-300 bg-blue-400/10 border-blue-300/20';

            return (
              <article
                key={item.client}
                className="reveal bento-card grid gap-7 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accent}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{item.client}</p>
                      <p className="text-xs text-slate-400">{item.area}</p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    <ImpactStep label="Challenge" text={item.challenge} />
                    <ArrowDown className="ml-1 h-4 w-4 text-slate-500" aria-hidden="true" />
                    <ImpactStep label="Solution" text={item.solution} />
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-4 border-t border-white/10 pt-5 sm:min-w-40 sm:flex-col sm:items-start sm:justify-center sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                  <div>
                    <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">{item.result}</p>
                    <p className="mt-1 max-w-36 text-sm leading-relaxed text-slate-300">{item.outcome}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImpactStep({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-200">{text}</p>
    </div>
  );
}