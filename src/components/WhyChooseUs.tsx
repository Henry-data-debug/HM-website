import { whyChooseUs } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="reveal rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-400 hover:-translate-y-0.5 transition-all group"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-sm">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
