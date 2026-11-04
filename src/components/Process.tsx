import { processSteps } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function Process() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-indigo-500/[0.07] blur-[100px] -z-10" />

      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Delivery Process"
          description="A proven, structured approach from first conversation to post-launch support."
        />

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-electric-500/30 to-transparent hidden lg:block lg:left-1/2 lg:-translate-x-px" />

          <div className="grid gap-6 lg:gap-8">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className="reveal flex items-start gap-5 lg:gap-0"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {/* Left content (even items on desktop) */}
                <div className={`hidden lg:block lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:order-3 lg:pl-12'}`}>
                  <div className="bento-card inline-block p-5 text-left">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Step {step.number}</span>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.description}</p>
                  </div>
                </div>

                {/* Center dot / number */}
                <div className="relative z-10 flex-shrink-0 lg:order-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-500/40 bg-[#0B1120] font-display text-sm font-extrabold text-cyan-400 shadow-glow-cyan">
                    {step.number}
                  </span>
                </div>

                {/* Mobile content / Right spacer */}
                <div className={`lg:w-1/2 lg:hidden`}>
                  <div className="bento-card p-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Step {step.number}</span>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.description}</p>
                  </div>
                </div>

                {/* Desktop spacer */}
                <div className={`hidden lg:block lg:w-1/2 ${i % 2 === 0 ? 'lg:order-3' : ''}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
