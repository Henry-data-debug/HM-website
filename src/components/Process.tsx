import { processSteps } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function Process() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="process" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Proven Process"
          description="A transparent, seven-step framework that turns ideas into reliable, shipped products."
        />

        <div className="mt-16">
          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* connecting line */}
              <div className="absolute left-0 right-0 top-9 h-0.5 bg-gradient-to-r from-electric-500/40 via-electric-500/20 to-ember-500/40" />
              <div className="grid grid-cols-7 gap-3">
                {processSteps.map((step, i) => (
                  <div
                    key={step.number}
                    className="reveal flex flex-col items-center text-center"
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl glass-strong font-display text-lg font-bold text-gradient shadow-glass transition-all duration-500 hover:scale-110 hover:shadow-glow">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-silver-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden">
            <div className="relative mx-auto max-w-md">
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-500/40 via-electric-500/20 to-ember-500/40" />
              <div className="flex flex-col gap-6">
                {processSteps.map((step, i) => (
                  <div
                    key={step.number}
                    className="reveal relative flex items-start gap-5"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl glass-strong font-display text-base font-bold text-gradient shadow-glass">
                      {step.number}
                    </span>
                    <div className="glass rounded-2xl p-4 pt-4">
                      <h3 className="font-display text-base font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-silver-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
