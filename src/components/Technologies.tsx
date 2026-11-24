import { technologies } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

const categoryColors: Record<string, string> = {
  Frontend: 'text-indigo-700 border-indigo-200 bg-indigo-50/70',
  Backend: 'text-sky-700 border-sky-200 bg-sky-50/70',
  Data: 'text-cyan-700 border-cyan-200 bg-cyan-50/70',
  DevOps: 'text-purple-700 border-purple-200 bg-purple-50/70',
  Cloud: 'text-emerald-700 border-emerald-200 bg-emerald-50/70',
};

export function Technologies() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section className="section-padding relative overflow-hidden bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Enterprise Tech Stack &amp; Frameworks"
          description="We build on well-supported, enterprise-grade frameworks, databases, and cloud platforms."
          theme="light"
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {technologies.map((tech, i) => (
            <span
              key={`${tech.name}-${i}`}
              className={`reveal inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all hover:scale-105 hover:shadow-sm shadow-2xs ${
                categoryColors[tech.category] ?? 'text-slate-700 border-slate-200 bg-white'
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
