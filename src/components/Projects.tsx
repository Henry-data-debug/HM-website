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
        return 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300';
      case 'Web & E-Commerce':
        return 'border-indigo-500/30 bg-indigo-500/20 text-indigo-300';
      case 'Data & BI Analytics':
        return 'border-sky-500/30 bg-sky-500/20 text-sky-300';
      case 'SEO & Growth':
        return 'border-amber-500/30 bg-amber-500/20 text-amber-300';
      default:
        return 'border-cyan-500/30 bg-cyan-500/20 text-cyan-300';
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
    <section id="projects" className="section-padding relative overflow-hidden bg-[#0B1120]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.06] blur-[120px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-[300px] w-[300px] rounded-full bg-indigo-500/[0.06] blur-[100px] -z-10" />

      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio &amp; Case Studies"
          title="Featured Projects &amp; Guided Tours"
          description="Explore real-world software platforms, automated Daraja M-Pesa workflows, and executive BI dashboards engineered for measurable business impact."
        />

        {/* Clean Category Filter Pills */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-2">
          {categoryFilterOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                  : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-cyan-500/40'
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
              className="reveal rounded-3xl border border-white/10 bg-[#0F172A]/90 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 shadow-xl"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                {/* Visual Header Banner with Outcomes */}
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${study.gradient} p-5 flex flex-col justify-between`}>
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-25" />
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />

                  {/* Top Category Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${getPillarBadge(study.category)}`}>
                      {study.category}
                    </span>
                    <span className="rounded-full bg-black/40 border border-white/10 px-2.5 py-0.5 text-[10px] text-white/80 font-mono">
                      Case Study
                    </span>
                  </div>

                  {/* Headline Outcomes */}
                  <div className="relative z-10 flex flex-wrap gap-1.5">
                    {study.outcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="rounded-lg bg-black/50 border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>{outcome}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Sector: {study.sector}
                  </span>
                  <h3 className="mt-2 font-display text-lg sm:text-xl font-bold text-white leading-snug">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {study.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer Action: Start Project Tour */}
              <div className="p-6 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">5-Card Walkthrough</span>
                <button
                  type="button"
                  onClick={() => handleStartTour(study.slug)}
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/30 hover:border-cyan-500 px-4 py-2 text-xs font-bold text-cyan-300 hover:text-slate-950 transition-all shadow-sm"
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
