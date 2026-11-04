import { whyChooseUs } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function WhyChooseUs() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="why-us" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The HM Technologies Advantage"
          description="We pair engineering rigor with business sense — delivering outcomes, not just outputs."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="reveal group relative overflow-hidden rounded-3xl glass-light p-7 transition-all duration-500 hover:bg-white/8 hover:-translate-y-1.5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* number watermark */}
                <span className="absolute right-5 top-3 font-display text-5xl font-extrabold text-white/5 transition-colors group-hover:text-electric-500/15">
                  0{i + 1}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500/20 to-electric-700/10 text-electric-300 transition-transform group-hover:scale-110 group-hover:shadow-glow">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="relative mt-5 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-silver-300">
                  {item.description}
                </p>

                {/* bottom accent line */}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-electric-500 to-ember-500 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
