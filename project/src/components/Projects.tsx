import { ChevronDown, ChevronUp, Globe, ShoppingCart, BarChart3, Boxes, GraduationCap, Megaphone } from 'lucide-react';
import { useState } from 'react';
import { projects } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  cart: ShoppingCart,
  chart: BarChart3,
  box: Boxes,
  school: GraduationCap,
  megaphone: Megaphone,
};

export function Projects() {
  const ref = useRevealGroup<HTMLDivElement>();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="A selection of solutions we've shipped across web, software, data, and marketing."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = iconMap[project.icon] ?? Globe;
            return (
              <article
                key={project.title}
                className="reveal group relative overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2 hover:shadow-glass-hover"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Colorful project preview with visible sample data */}
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-25" />
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />

                  <div className="absolute inset-x-5 bottom-0 top-7 overflow-hidden rounded-t-xl border border-white/25 bg-white/15 p-3 shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center justify-between border-b border-white/20 pb-2">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white/90" />
                        <span className="h-2 w-2 rounded-full bg-white/60" />
                        <span className="h-2 w-2 rounded-full bg-white/35" />
                      </div>
                      <span className="text-[9px] font-semibold tracking-wide text-white/80">LIVE PREVIEW</span>
                    </div>
                    <div className="mt-3 grid grid-cols-[1.1fr_0.9fr] gap-2">
                      <div className="rounded-lg bg-white/20 p-2">
                        <div className="text-[9px] font-medium text-white/75">Performance</div>
                        <div className="mt-1 text-lg font-bold leading-none text-white">
                          {['98%', '24.8K', '4.9/5', '1,240', '86%', '3.2x'][i]}
                        </div>
                        <div className="mt-2 flex h-7 items-end gap-1">
                          {[35, 52, 42, 68, 56, 82, 72, 94].map((height, barIndex) => (
                            <span
                              key={barIndex}
                              className="flex-1 rounded-t-sm bg-white/75"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg bg-black/10 p-2">
                        <div className="text-[9px] font-medium text-white/75">Progress</div>
                        <div className="mt-2 space-y-2">
                          {[75, 55, 88].map((width, barIndex) => (
                            <div key={barIndex} className="h-1.5 overflow-hidden rounded-full bg-white/20">
                              <div className="h-full rounded-full bg-white/80" style={{ width: `${width}%` }} />
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-[9px] font-medium text-white/70">Updated today</div>
                      </div>
                    </div>
                  </div>

                  {/* floating icon */}
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                {/* Body */}
                <div className="bg-white/[0.03] p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-electric-300">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver-300">
                    {project.description}
                  </p>
                  {expandedProject === project.title && (
                    <p className="mt-3 rounded-xl border border-electric-500/15 bg-electric-500/5 p-3 text-sm leading-relaxed text-silver-200">
                      {project.summary}
                    </p>
                  )}
                  <button
                    onClick={() => setExpandedProject((current) => current === project.title ? null : project.title)}
                    aria-expanded={expandedProject === project.title}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-300 transition-colors hover:text-electric-200"
                  >
                    {expandedProject === project.title ? 'Show less' : 'Read more'}
                    {expandedProject === project.title ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
