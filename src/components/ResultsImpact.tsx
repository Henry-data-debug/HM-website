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
    <section ref={ref} id="results" className="section-padding relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80">
      <div className="relative mx-auto max-w-7xl">
        <div className="reveal max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/90 bg-indigo-50/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700 shadow-sm">
            Results &amp; Impact
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Proven Client Outcomes &amp; Measurable Business Impact
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Client outcomes demonstrate the measurable efficiency, uptime, and revenue gains achieved through our engineering and automation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {results.map((item, index) => {
            const Icon = item.icon;
            const accent = item.accent === 'cyan'
              ? 'text-sky-600 bg-sky-50 border-sky-200'
              : 'text-indigo-600 bg-indigo-50 border-indigo-200';

            return (
              <article
                key={item.client}
                className="reveal rounded-3xl border border-slate-200/90 bg-slate-50/70 grid gap-7 p-6 sm:grid-cols-[1fr_auto] sm:p-8 hover:border-indigo-400 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${accent} shadow-2xs`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{item.client}</h3>
                      <p className="text-xs font-semibold text-slate-500">{item.area}</p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    <ImpactStep label="Challenge" text={item.challenge} />
                    <ArrowDown className="ml-1 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <ImpactStep label="Solution" text={item.solution} />
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-5 sm:min-w-40 sm:flex-col sm:items-start sm:justify-center sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                  <div>
                    <p className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">{item.result}</p>
                    <p className="mt-1 max-w-36 text-xs sm:text-sm font-semibold leading-relaxed text-slate-600">{item.outcome}</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
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
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}