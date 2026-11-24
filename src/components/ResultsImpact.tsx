import { ArrowDown, ArrowRight, TrendingDown, TrendingUp, ShieldCheck } from 'lucide-react';
import { useRevealGroup } from '../hooks/useRevealGroup';

const results = [
  {
    client: 'Blue Ridge Logistics',
    area: 'Inventory Operations',
    challenge: 'Stock discrepancies and time-consuming manual inventory reconciliation.',
    solution: 'Rebuilt automated inventory tracking with real-time barcode syncing.',
    result: '80%',
    outcome: 'Fewer stock discrepancies',
    icon: TrendingDown,
    accent: 'text-sky-600 bg-sky-50 border-sky-200',
    numberColor: 'text-slate-900',
  },
  {
    client: 'Savannah Retail Co.',
    area: 'Digital Commerce',
    challenge: 'Launch high-concurrency headless store with instant M-Pesa one-click checkout.',
    solution: 'Engineered a Next.js store with instant Daraja STK Push callbacks.',
    result: '2×',
    outcome: 'Revenue doubled in 90 days',
    icon: TrendingUp,
    accent: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    numberColor: 'text-slate-900',
  },
  {
    client: 'Highview Health & Education',
    area: 'Cloud ERP & Collections',
    challenge: 'Fragmented manual fee reconciliation and delayed reporting cycles.',
    solution: 'Centralized cloud management portal with automated M-Pesa fee reconciliation.',
    result: '98%',
    outcome: 'Automated daily reconciliation',
    icon: ShieldCheck,
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    numberColor: 'text-slate-900',
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

        {/* Balanced 3-Card Grid with zero dead space */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.client}
                className="reveal rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-7 hover:border-indigo-400 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${item.accent} shadow-2xs`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Verified Impact
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-base font-bold text-slate-900">{item.client}</h3>
                    <p className="text-xs font-semibold text-slate-500">{item.area}</p>
                  </div>

                  <div className="mt-6 space-y-3.5">
                    <ImpactStep label="The Challenge" text={item.challenge} />
                    <ArrowDown className="ml-1 h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                    <ImpactStep label="Our Solution" text={item.solution} />
                  </div>
                </div>

                {/* Bottom Metric Bar */}
                <div className="mt-7 pt-5 border-t border-slate-200/80 flex items-end justify-between">
                  <div>
                    <p className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900">{item.result}</p>
                    <p className="mt-1 text-xs font-bold leading-relaxed text-slate-600">{item.outcome}</p>
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
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}