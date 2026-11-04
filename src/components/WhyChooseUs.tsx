import { whyChooseUs } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function WhyChooseUs() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section className="section-padding relative overflow-hidden">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Us"
          title="Built Different"
          description="Six foundational advantages that make HM Technologies your most reliable digital partner."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="reveal bento-card group p-6"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 transition-all group-hover:bg-cyan-500/20 group-hover:shadow-glow-cyan">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
