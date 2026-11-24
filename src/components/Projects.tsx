import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  caseStudies,
  categoryFilterOptions,
  getProjectBySlug,
  type CaseStudy,
  type ProjectCategory,
} from '../data/projectsData';
import { ProjectTour } from './ProjectTour';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';
import { navigateTo } from '../lib/navigation';

interface ProjectsProps {
  initialSlug?: string;
}

export function Projects({ initialSlug }: ProjectsProps) {
  const ref = useRevealGroup<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(initialSlug);

  useEffect(() => {
    setSelectedSlug(initialSlug);
  }, [initialSlug]);

  const activeProject: CaseStudy | undefined = selectedSlug ? getProjectBySlug(selectedSlug) : undefined;

  const filtered = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter((project) => project.category === activeFilter);

  const handleStartTour = (slug: string) => {
    setSelectedSlug(slug);
    navigateTo(`/projects/${slug}`);
  };

  const handleBackToProjects = () => {
    setSelectedSlug(undefined);
    navigateTo('/projects');
  };

  const getPillarBadge = (category: ProjectCategory) => {
    switch (category) {
      case 'Workflow & M-Pesa Automation':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'Web & E-Commerce':
        return 'border-indigo-200 bg-indigo-50 text-indigo-700';
      case 'Data & BI Analytics':
        return 'border-sky-200 bg-sky-50 text-sky-700';
      case 'SEO & Growth':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-700';
    }
  };

  // If a specific project is selected, render the guided walkthrough
  if (activeProject) {
    return (
      <section id="project-tour" className="relative overflow-hidden bg-[#FAF7F2] text-[#1C2E2E] min-h-screen">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(#0F3D3E 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <ProjectTour project={activeProject} onBack={handleBackToProjects} />
      </section>
    );
  }

  // Otherwise, render the Projects Showcase Index
  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio &amp; Case Studies"
          title="Featured Projects &amp; Guided Tours"
          description="Explore real-world software platforms, automated Daraja M-Pesa workflows, and executive BI dashboards engineered for measurable business impact."
          theme="light"
        />

        {/* Clean Category Filter Pills */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-2">
          {categoryFilterOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'border border-slate-200/90 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean, Scannable Projects Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study, i) => (
            <article
              key={study.slug}
              className="reveal rounded-3xl border border-slate-200/90 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 shadow-sm"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                {/* Visual Header Banner with Outcomes */}
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${study.gradient} p-5 flex flex-col justify-between`}>
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />

                  {/* Top Category Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-2xs ${getPillarBadge(study.category)}`}>
                      {study.category}
                    </span>
                    <span className="rounded-full bg-white/90 border border-slate-200/80 px-2.5 py-0.5 text-[10px] text-slate-800 font-mono shadow-xs">
                      Case Study
                    </span>
                  </div>

                  {/* Headline Outcomes */}
                  <div className="relative z-10 flex flex-wrap gap-1.5">
                    {study.outcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="rounded-lg bg-slate-950/75 border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md flex items-center gap-1.5 shadow-xs"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>{outcome}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Sector: {study.sector}
                  </span>
                  <h3 className="mt-2 font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {study.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer Action: Start Project Tour */}
              <div className="p-6 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">5-Step Guided Tour</span>
                <button
                  type="button"
                  onClick={() => handleStartTour(study.slug)}
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white transition-all shadow-sm hover:shadow-indigo-500/25"
                >
                  <span>Start Project Tour</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
