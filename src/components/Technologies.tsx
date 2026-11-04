import { technologies } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

const categoryColors: Record<string, string> = {
  Frontend: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/[0.08]',
  Backend: 'text-electric-300 border-electric-500/30 bg-electric-500/[0.08]',
  Data: 'text-ember-400 border-ember-500/30 bg-ember-500/[0.08]',
  DevOps: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/[0.08]',
  Cloud: 'text-purple-300 border-purple-500/30 bg-purple-500/[0.08]',
};

export function Technologies() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section className="section-padding relative overflow-hidden">
      <div ref={ref} className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Modern Tools & Technologies"
          description="We build on well-supported, enterprise-grade frameworks and platforms."
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {technologies.map((tech, i) => (
            <span
              key={`${tech.name}-${i}`}
              className={`reveal inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:scale-105 hover:shadow-md ${
                categoryColors[tech.category] ?? 'text-slate-300 border-white/10 bg-white/[0.03]'
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
