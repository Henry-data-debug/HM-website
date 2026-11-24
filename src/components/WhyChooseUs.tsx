import { whyChooseUs } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

const cardAccents = [
  { iconBg: 'bg-indigo-50 border-indigo-200 text-indigo-600 group-hover:bg-indigo-600', badge: 'Engineering Depth' },
  { iconBg: 'bg-sky-50 border-sky-200 text-sky-600 group-hover:bg-sky-600', badge: 'Creative Architecture' },
  { iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-600 group-hover:bg-emerald-600', badge: 'Agile Delivery' },
  { iconBg: 'bg-amber-50 border-amber-200 text-amber-600 group-hover:bg-amber-600', badge: 'Transparent ROI' },
  { iconBg: 'bg-purple-50 border-purple-200 text-purple-600 group-hover:bg-purple-600', badge: '24/7 SLA Support' },
  { iconBg: 'bg-blue-50 border-blue-200 text-blue-600 group-hover:bg-blue-600', badge: 'Modern Stack' },
];

export function WhyChooseUs() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section className="section-padding relative overflow-hidden bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose HM Technologies"
          description="Six foundational advantages that make HM Technologies your most reliable digital engineering partner in Kenya."
          theme="light"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            const accent = cardAccents[i % cardAccents.length];

            return (
              <article
                key={item.title}
                className="reveal rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:text-white group-hover:shadow-sm ${accent.iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {accent.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Advantage 0{i + 1}</span>
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
