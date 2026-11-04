import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BarChart3, Boxes, ExternalLink, Globe, GraduationCap, Megaphone, ShoppingCart, X } from 'lucide-react';
import { projects, type ProjectItem } from '../data/content';
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

const categoryFilters = ['All', 'Web', 'Automation', 'Analytics', 'Software', 'Digital Marketing'];

export function Projects() {
  const ref = useRevealGroup<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.tags.includes(activeFilter));

  const requestWalkthrough = (project: ProjectItem) => {
    const service = project.category === 'Data Analytics'
      ? 'Data Analytics & Business Intelligence'
      : project.category === 'Digital Marketing'
        ? 'Digital Marketing'
        : project.category === 'Software'
          ? 'Software & System Development'
          : 'Website Development';

    window.dispatchEvent(new CustomEvent('select-service', { detail: service }));
    setSelectedProject(null);
    document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-ember-500/[0.06] blur-[100px] -z-10" />

      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="A selection of solutions we've shipped across web, software, data, and marketing."
        />

        {/* Tag Filters */}
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-md'
                  : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => {
            const Icon = iconMap[project.icon] ?? Globe;
            return (
              <article
                key={project.title}
                className="reveal bento-card group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Colorful project preview with visible sample data */}
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />

                  <div className="absolute inset-x-5 bottom-0 top-7 overflow-hidden rounded-t-xl border border-white/20 bg-white/10 p-3 shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white/90" />
                        <span className="h-2 w-2 rounded-full bg-white/50" />
                        <span className="h-2 w-2 rounded-full bg-white/30" />
                      </div>
                      <span className="text-[9px] font-bold tracking-wide text-white/70 uppercase">Live Preview</span>
                    </div>
                    <div className="mt-3 grid grid-cols-[1.1fr_0.9fr] gap-2">
                      <div className="rounded-lg bg-white/15 p-2">
                        <div className="text-[9px] font-medium text-white/70">Performance</div>
                        <div className="mt-1 text-lg font-bold leading-none text-white">
                          {['98%', '24.8K', '4.9/5', '1,240', '86%', '3.2x'][i] ?? '95%'}
                        </div>
                        <div className="mt-2 flex h-7 items-end gap-1">
                          {[35, 52, 42, 68, 56, 82, 72, 94].map((height, barIndex) => (
                            <span
                              key={barIndex}
                              className="flex-1 rounded-t-sm bg-white/70"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg bg-black/10 p-2">
                        <div className="text-[9px] font-medium text-white/70">Progress</div>
                        <div className="mt-2 space-y-2">
                          {[75, 55, 88].map((width, barIndex) => (
                            <div key={barIndex} className="h-1.5 overflow-hidden rounded-full bg-white/15">
                              <div className="h-full rounded-full bg-white/75" style={{ width: `${width}%` }} />
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-[9px] font-medium text-white/60">Updated today</div>
                      </div>
                    </div>
                  </div>

                  {/* floating icon */}
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                {/* Body */}
                <div className="bg-white/[0.02] p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    View project details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {selectedProject && (
        <ProjectDetailsDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onWalkthrough={() => requestWalkthrough(selectedProject)}
        />
      )}
    </section>
  );
}

function ProjectDetailsDialog({
  project,
  onClose,
  onWalkthrough,
}: {
  project: ProjectItem;
  onClose: () => void;
  onWalkthrough: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[85vh] w-[min(42rem,calc(100%-2rem))] overflow-y-auto rounded-3xl border border-white/10 bg-[#101927] p-0 text-left text-slate-200 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="pr-12 text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">{project.category}</p>
        <h2 id="project-dialog-title" className="mt-3 pr-10 font-display text-2xl font-bold text-white sm:text-3xl">
          {project.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.summary}</p>

        <div className="mt-7 border-t border-white/10 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Example stack</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.exampleStack.map((technology) => (
              <span key={technology} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200">
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              Open live demo <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button type="button" onClick={onWalkthrough} className="btn-primary">
            Request a walkthrough <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
