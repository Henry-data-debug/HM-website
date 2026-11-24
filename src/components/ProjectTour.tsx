import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Sparkles,
  MessageSquare,
  Clock,
  Building,
  Target,
  FileCheck,
} from 'lucide-react';
import type { CaseStudy } from '../data/projectsData';

interface ProjectTourProps {
  project: CaseStudy;
  onBack: () => void;
  onSelectService?: (service: string) => void;
}

const tourStepTabs = [
  { id: 0, label: '1. Snapshot', title: 'Context & Snapshot' },
  { id: 1, label: '2. Bottleneck', title: 'The Core Bottlenecks' },
  { id: 2, label: '3. Solution', title: 'Engineered Architecture' },
  { id: 3, label: '4. Stack', title: 'Tech Stack & Integrations' },
  { id: 4, label: '5. Impact', title: 'Measurable Outcomes' },
];

export function ProjectTour({ project, onBack, onSelectService }: ProjectTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      } else if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, onBack]);

  const progressPercent = ((currentStep + 1) / 5) * 100;

  const getPillarBadge = () => {
    switch (project.category) {
      case 'Workflow & M-Pesa Automation':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
      case 'Web & E-Commerce':
        return 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300';
      case 'Data & BI Analytics':
        return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
      case 'SEO & Growth':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
      default:
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300';
    }
  };

  const handleRequestQuote = () => {
    const service =
      project.category === 'Workflow & M-Pesa Automation'
        ? 'Business Automation'
        : project.category === 'Data & BI Analytics'
        ? 'Data Analytics & Business Intelligence'
        : project.category === 'SEO & Growth'
        ? 'Digital Marketing'
        : 'Website Development';

    if (onSelectService) {
      onSelectService(service);
    } else {
      window.dispatchEvent(new CustomEvent('select-service', { detail: service }));
      document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ── Top Navigation / Back bar ── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Case Studies</span>
        </button>

        <div className="flex items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getPillarBadge()}`}>
            {project.category}
          </span>
          <span className="rounded-full border border-white/10 bg-[#0B1120] px-3 py-1 text-xs font-bold text-slate-300">
            Card {currentStep + 1} of 5
          </span>
        </div>
      </div>

      {/* ── Tour Header & Project Summary ── */}
      <div className="rounded-3xl border border-white/10 bg-[#0F172A]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sector: {project.sector}
            </span>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {project.outcomes.map((outcome) => (
              <span
                key={outcome}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {outcome}
              </span>
            ))}
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div className="mt-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900 border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 5 Clickable Step Tabs */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {tourStepTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCurrentStep(tab.id)}
                className={`rounded-xl py-2 px-2.5 font-semibold text-center transition-all ${
                  currentStep === tab.id
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="block truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVE CARD CONTENT ── */}
      <div className="mt-8">
        {/* Card 1: Context & Snapshot (2x2 Micro-Grid) */}
        {currentStep === 0 && (
          <article className="rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-10 backdrop-blur-xl shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                01
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Card 1 of 5</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Context &amp; Project Snapshot</h2>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                  <Building className="h-4 w-4 text-cyan-400" />
                  <span>Client Industry</span>
                </div>
                <p className="mt-2 text-base font-bold text-white">
                  {project.tour.snapshot.industry}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                  <Clock className="h-4 w-4 text-indigo-400" />
                  <span>Timeline to Delivery</span>
                </div>
                <p className="mt-2 text-base font-bold text-white">
                  {project.tour.snapshot.timeline}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                  <Target className="h-4 w-4 text-rose-400" />
                  <span>Core Challenge</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {project.tour.snapshot.problemSummary}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                  <FileCheck className="h-4 w-4 text-emerald-400" />
                  <span>Primary Deliverable</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {project.tour.snapshot.coreDeliverable}
                </p>
              </div>
            </div>
          </article>
        )}

        {/* Card 2: The Bottleneck */}
        {currentStep === 1 && (
          <article className="rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-10 backdrop-blur-xl shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                02
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Card 2 of 5</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">The Operational Bottlenecks</h2>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-300">
              Prior to HM Technologies stepping in, the organization was held back by the following critical inefficiencies:
            </p>

            <div className="mt-6 space-y-4">
              {project.tour.bottlenecks.map((point, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-start gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Bottleneck {index + 1}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-200">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Card 3: Solution & Architecture */}
        {currentStep === 2 && (
          <article className="rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-10 backdrop-blur-xl shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold">
                03
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Card 3 of 5</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Engineered Architecture &amp; Solution</h2>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-300">
              HM Technologies engineered the following modular architectural components to automate and streamline the system:
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {project.tour.architecture.map((block) => (
                <div
                  key={block.step}
                  className="rounded-2xl border border-indigo-500/25 bg-slate-900/80 p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                      {block.step}
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-white leading-snug">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {block.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Configured &amp; Active</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Card 4: Stack & Integrations */}
        {currentStep === 3 && (
          <article className="rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-10 backdrop-blur-xl shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-300 font-bold">
                04
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Card 4 of 5</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Tech Stack &amp; API Integrations</h2>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-300">
              The project was built using high-reliability engineering frameworks and production-ready APIs:
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.tour.stack.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 transition-all hover:border-cyan-400/40"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                      <Cpu className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Card 5: Impact & Takeaways */}
        {currentStep === 4 && (
          <article className="rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-10 backdrop-blur-xl shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                05
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Card 5 of 5</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Measurable Impact &amp; Takeaways</h2>
              </div>
            </div>

            {/* 3 Outcome Stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {project.tour.impact.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 text-center sm:text-left"
                >
                  <span className="font-display text-3xl font-extrabold text-emerald-300 text-gradient-cyan">
                    {metric.stat}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-white">
                    {metric.label}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Architectural Takeaway */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Architectural Takeaway
              </span>
              <p className="mt-2 text-sm italic leading-relaxed text-slate-200">
                &ldquo;{project.tour.keyTakeaway}&rdquo;
              </p>
            </div>

            {/* Direct CTA card linking to WhatsApp and Quote */}
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1 text-[11px] font-bold uppercase">
                  <Sparkles className="h-3 w-3" /> Ready for Similar Results?
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  Discuss a custom system for your business
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  Connect with HM Technologies engineers directly on WhatsApp or submit a proposal request.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <a
                  href={`https://wa.me/254791371301?text=${encodeURIComponent(
                    `Hello HM Technologies, I saw your case study on "${project.title}" and would like to consult on a similar solution.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-emerald group w-full sm:w-auto text-xs sm:text-sm px-6 py-3 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-6 py-3"
                >
                  Request Proposal
                </button>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* ── Step Navigation Buttons (Prev / Next) ── */}
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous Card</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((stepIdx) => (
            <button
              key={stepIdx}
              type="button"
              onClick={() => setCurrentStep(stepIdx)}
              className={`h-2 rounded-full transition-all ${
                currentStep === stepIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to card ${stepIdx + 1}`}
            />
          ))}
        </div>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
            className="group inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 text-xs transition-all shadow-md"
          >
            <span>Next Card</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 text-xs transition-all shadow-md"
          >
            <span>Finish Tour</span>
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
