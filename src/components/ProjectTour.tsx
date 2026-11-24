import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Sparkles,
  MessageSquare,
  Target,
  FileCheck,
  Zap,
  ShieldCheck,
  Layers,
  Activity,
  ChevronRight,
  Database,
  Globe,
} from 'lucide-react';
import type { CaseStudy } from '../data/projectsData';

interface ProjectTourProps {
  project: CaseStudy;
  onBack: () => void;
  onSelectService?: (service: string) => void;
}

const tourStepTabs = [
  { id: 0, label: '01 Snapshot', short: 'Snapshot', title: 'Context & Snapshot' },
  { id: 1, label: '02 Bottleneck', short: 'Bottlenecks', title: 'The Operational Bottlenecks' },
  { id: 2, label: '03 Architecture', short: 'Architecture', title: 'Engineered Architecture' },
  { id: 3, label: '04 Tech Stack', short: 'Stack', title: 'Tech Stack & Integrations' },
  { id: 4, label: '05 Outcomes', short: 'Impact', title: 'Measurable Business Impact' },
];

export function ProjectTour({ project, onBack, onSelectService }: ProjectTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Keyboard navigation support (ArrowLeft / ArrowRight / Escape)
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
    <div className="w-full">
      {/* ─────────────────────────────────────────────────────────────
          TOP TOUR BANNER & HEADER — Deep Forest Pine (#0F3D3E)
          ───────────────────────────────────────────────────────────── */}
      <header className="relative bg-[#0F3D3E] text-[#FAF7F2] pt-28 pb-10 px-6 sm:px-8 lg:px-12 border-b border-[#0F3D3E]/40 overflow-hidden shadow-lg">
        {/* Ambient subtle glow and grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(#FAF7F2 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#E05A47]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#0D9488]/15 blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top Back & Category Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-[#FAF7F2] transition-all hover:border-[#E05A47] hover:bg-white/[0.12]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Case Studies</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#E05A47]/40 bg-[#E05A47]/20 px-3.5 py-1 text-xs font-bold text-[#FAF7F2] uppercase tracking-wider">
                {project.category}
              </span>
              <span className="hidden sm:inline-block rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-medium text-slate-300">
                Card {currentStep + 1} of 5
              </span>
            </div>
          </div>

          {/* Project Header Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E05A47]">
                Sector: {project.sector}
              </span>
              <h1 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#FAF7F2] tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#FAF7F2]/80 max-w-3xl">
                {project.summary}
              </p>
            </div>

            {/* Headline Outcomes in Header */}
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-2">
              {project.outcomes.map((outcome) => (
                <span
                  key={outcome}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm shadow-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#E05A47]" />
                  {outcome}
                </span>
              ))}
            </div>
          </div>

          {/* Stepper Progress Bar & Tabs */}
          <div className="mt-8 pt-6 border-t border-white/10">
            {/* Progress track */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#E05A47] via-[#D97706] to-[#0D9488] transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 5 Step Tabs */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {tourStepTabs.map((tab) => {
                const isActive = currentStep === tab.id;
                const isPast = currentStep > tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCurrentStep(tab.id)}
                    className={`rounded-xl py-2 px-3 font-semibold text-center transition-all ${
                      isActive
                        ? 'bg-[#E05A47] text-white shadow-md font-bold'
                        : isPast
                        ? 'bg-white/10 text-white/90 border border-white/15 hover:bg-white/15'
                        : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/5'
                    }`}
                  >
                    <span className="block truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN TOUR CANVAS — Warm Alabaster (#FAF7F2) with Split Stage
          ───────────────────────────────────────────────────────────── */}
      <main className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 lg:py-14">
        <article className="animate-fadeIn">
          {/* ══════════════════════════════════════════════════════════
              STEP 1: CONTEXT & SNAPSHOT
              ══════════════════════════════════════════════════════════ */}
          {currentStep === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Editorial Story Card */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E05A47]/10 border border-[#E05A47]/25 text-[#E05A47] font-bold text-sm">
                      01
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E05A47]">
                      Card 1 of 5 • Engagement Snapshot
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[#1C2E2E] tracking-tight">
                    Context, Industry &amp; Core Challenge
                  </h2>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1C2E2E]/85">
                    Operating in the {project.tour.snapshot.industry} sector, the organization engaged HM Technologies to overhaul manual workflows, streamline transaction pipelines, and deploy production-grade software.
                  </p>

                  <div className="mt-6 space-y-3.5">
                    <div className="flex items-start gap-3 rounded-2xl bg-[#FAF7F2] p-4 border border-[#E5DEC9]">
                      <Target className="h-5 w-5 text-[#E05A47] shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2E2E]">
                          The Core Challenge
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#1C2E2E]/80">
                          {project.tour.snapshot.problemSummary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-[#FAF7F2] p-4 border border-[#E5DEC9]">
                      <FileCheck className="h-5 w-5 text-[#0F3D3E] shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C2E2E]">
                          Primary Engineering Deliverable
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#1C2E2E]/80">
                          {project.tour.snapshot.coreDeliverable}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Left-Bordered Architectural Note */}
                  <div className="mt-8 rounded-r-2xl border-l-4 border-[#E05A47] bg-[#FAF7F2] p-5 border-y border-r border-[#E5DEC9]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E05A47]">
                      Architectural Directive
                    </span>
                    <p className="mt-1 text-xs sm:text-sm italic text-[#1C2E2E]/90 leading-relaxed">
                      &ldquo;Engineered to replace manual operational overhead with zero-lag API reconciliation and self-healing cloud microservices.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Blueprint Overview Companion Card */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
                      <Layers className="h-4 w-4 text-[#E05A47]" />
                      <span>Engagement Blueprint</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      Live in Production
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Client Sector</span>
                      <p className="mt-1 font-display text-sm font-bold text-[#1C2E2E] leading-snug">
                        {project.sector}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Delivery Velocity</span>
                      <p className="mt-1 font-display text-sm font-bold text-[#E05A47]">
                        {project.tour.snapshot.timeline}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Service Pillar</span>
                      <p className="mt-1 font-display text-xs font-bold text-[#0F3D3E] leading-snug">
                        {project.category}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Engineering SLA</span>
                      <p className="mt-1 font-display text-xs font-bold text-emerald-700">
                        60-Day Priority
                      </p>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="mt-6 pt-5 border-t border-[#E5DEC9] space-y-2.5 text-xs text-[#1C2E2E]/80">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E05A47]" />
                      <span>Full automated API testing &amp; validation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E05A47]" />
                      <span>Zero downtime blue/green production deployment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E05A47]" />
                      <span>Dedicated documentation &amp; staff handoff training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              STEP 2: THE OPERATIONAL BOTTLENECKS
              ══════════════════════════════════════════════════════════ */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Editorial Bottlenecks Card */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D97706]/10 border border-[#D97706]/25 text-[#D97706] font-bold text-sm">
                      02
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                      Card 2 of 5 • Operational Bottlenecks
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[#1C2E2E] tracking-tight">
                    Friction Points Prior to HM Technologies
                  </h2>

                  <p className="mt-3 text-sm text-[#1C2E2E]/80">
                    Before deploying our custom engineering solution, the client was constrained by three critical friction points in their daily operations:
                  </p>

                  <div className="mt-6 space-y-4">
                    {project.tour.bottlenecks.map((point, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 flex items-start gap-4 transition-all hover:bg-amber-50/70"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#D97706]/15 text-[#D97706] font-bold text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                            Friction Point {index + 1}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-[#1C2E2E]/90">
                            {point}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Left-Bordered Takeaway */}
                  <div className="mt-8 rounded-r-2xl border-l-4 border-[#D97706] bg-[#FAF7F2] p-5 border-y border-r border-[#E5DEC9]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
                      Operational Risk Assessment
                    </span>
                    <p className="mt-1 text-xs sm:text-sm italic text-[#1C2E2E]/90 leading-relaxed">
                      &ldquo;Manual operational loops don’t just slow teams down—they introduce cumulative human error and financial reconciliation risks at scale.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Before vs. After Transformation Flow */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D3E] border-b border-[#E5DEC9] pb-4">
                    <Activity className="h-4 w-4 text-[#D97706]" />
                    <span>Before vs. After Transformation</span>
                  </div>

                  {/* Before State */}
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/40 p-5">
                    <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Before HM Technologies</span>
                    </div>
                    <ul className="mt-3 space-y-2 text-xs text-[#1C2E2E]/80">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Multi-day reconciliation delays and lost tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Fragmented spreadsheets &amp; manual SMS copy-pasting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Dispute backlogs and customer frustration</span>
                      </li>
                    </ul>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex justify-center my-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F3D3E] text-[#FAF7F2] px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                      <Zap className="h-3 w-3 text-[#E05A47]" />
                      Engineered Transformation
                    </span>
                  </div>

                  {/* After State */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>After HM Technologies Solution</span>
                    </div>
                    <ul className="mt-3 space-y-2 text-xs text-[#1C2E2E]/80">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Instant webhook processing in under 250 milliseconds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Automated ledger sync and receipt dispatch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Zero dispute backlog and transparent audit logs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              STEP 3: ENGINEERED SOLUTION & ARCHITECTURE
              ══════════════════════════════════════════════════════════ */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Editorial Architecture Breakdown */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F3D3E]/10 border border-[#0F3D3E]/25 text-[#0F3D3E] font-bold text-sm">
                      03
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
                      Card 3 of 5 • System Architecture
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[#1C2E2E] tracking-tight">
                    Engineered Solution &amp; Modular Blocks
                  </h2>

                  <p className="mt-3 text-sm text-[#1C2E2E]/80">
                    HM Technologies developed a modular, high-reliability architecture structured across three core phases:
                  </p>

                  <div className="mt-6 space-y-4">
                    {project.tour.architecture.map((block) => (
                      <div
                        key={block.step}
                        className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-5 flex flex-col justify-between transition-all hover:border-[#0F3D3E]/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F3D3E] text-[#FAF7F2] font-mono text-xs font-bold shrink-0">
                            {block.step}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            Active Component
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-base font-bold text-[#1C2E2E]">
                          {block.title}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#1C2E2E]/80">
                          {block.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Architectural Note */}
                  <div className="mt-8 rounded-r-2xl border-l-4 border-[#0F3D3E] bg-[#FAF7F2] p-5 border-y border-r border-[#E5DEC9]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F3D3E]">
                      Architecture Rule
                    </span>
                    <p className="mt-1 text-xs sm:text-sm italic text-[#1C2E2E]/90 leading-relaxed">
                      &ldquo;Decoupled services ensure that payment callbacks, CRM updates, and notification engines scale independently without single points of failure.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Connected System Pipeline Companion Card */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D3E] border-b border-[#E5DEC9] pb-4">
                    <Cpu className="h-4 w-4 text-[#0F3D3E]" />
                    <span>Connected System Pipeline</span>
                  </div>

                  {/* 4 Connected Nodes */}
                  <div className="mt-6 space-y-4 relative">
                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E05A47]/10 text-[#E05A47]">
                        <Zap className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-500">Node 01 • Ingestion</span>
                        <p className="text-xs font-bold text-[#1C2E2E]">Event Trigger &amp; Daraja Webhook</p>
                      </div>
                    </div>

                    <div className="flex justify-center -my-2">
                      <ChevronRight className="h-4 w-4 text-[#0F3D3E] rotate-90" />
                    </div>

                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0F3D3E]/10 text-[#0F3D3E]">
                        <ShieldCheck className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-500">Node 02 • Middleware</span>
                        <p className="text-xs font-bold text-[#1C2E2E]">Idempotency Check &amp; Auth Gateway</p>
                      </div>
                    </div>

                    <div className="flex justify-center -my-2">
                      <ChevronRight className="h-4 w-4 text-[#0F3D3E] rotate-90" />
                    </div>

                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#3730A3]/10 text-[#3730A3]">
                        <Database className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-500">Node 03 • Processing</span>
                        <p className="text-xs font-bold text-[#1C2E2E]">CRM Mutation &amp; Ledger Automation</p>
                      </div>
                    </div>

                    <div className="flex justify-center -my-2">
                      <ChevronRight className="h-4 w-4 text-[#0F3D3E] rotate-90" />
                    </div>

                    <div className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]">
                        <Globe className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-500">Node 04 • Delivery</span>
                        <p className="text-xs font-bold text-[#1C2E2E]">Client Notification &amp; eTIMS Receipt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              STEP 4: TECH STACK & INTEGRATIONS
              ══════════════════════════════════════════════════════════ */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Editorial Stack Card */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3730A3]/10 border border-[#3730A3]/25 text-[#3730A3] font-bold text-sm">
                      04
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3730A3]">
                      Card 4 of 5 • Tech Stack &amp; APIs
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[#1C2E2E] tracking-tight">
                    Reliability-First Engineering Stack
                  </h2>

                  <p className="mt-3 text-sm text-[#1C2E2E]/80">
                    We select battle-tested frameworks, typed architectures, and localized payment APIs to guarantee high availability and sub-second response times:
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.tour.stack.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-4 transition-all hover:border-[#3730A3]/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3730A3]/10 text-[#3730A3]">
                            <Cpu className="h-4 w-4" />
                          </span>
                          <div>
                            <h3 className="font-display text-sm font-bold text-[#1C2E2E]">
                              {item.name}
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Left-Bordered Stack Note */}
                  <div className="mt-8 rounded-r-2xl border-l-4 border-[#3730A3] bg-[#FAF7F2] p-5 border-y border-r border-[#E5DEC9]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3730A3]">
                      Tech Stack Rationale
                    </span>
                    <p className="mt-1 text-xs sm:text-sm italic text-[#1C2E2E]/90 leading-relaxed">
                      &ldquo;Every tool is audited for East African network latency, zero-lag Daraja reconciliation, and straightforward long-term maintainability.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Layered Stack Companion Card */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D3E] border-b border-[#E5DEC9] pb-4">
                    <Layers className="h-4 w-4 text-[#3730A3]" />
                    <span>Layered Architecture</span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-4">
                      <span className="text-[10px] font-bold uppercase text-[#3730A3]">Tier 1 • Client &amp; UI Layer</span>
                      <p className="mt-1 text-xs font-bold text-[#1C2E2E]">Next.js, React, Tailwind CSS, TypeScript</p>
                      <span className="text-[11px] text-slate-500">Accessible responsive surfaces &amp; zero cumulative layout shift</span>
                    </div>

                    <div className="rounded-2xl border border-teal-200/80 bg-teal-50/40 p-4">
                      <span className="text-[10px] font-bold uppercase text-teal-800">Tier 2 • APIs &amp; Integrations</span>
                      <p className="mt-1 text-xs font-bold text-[#1C2E2E]">Safaricom Daraja API, Zoho Webhooks, FastAPI</p>
                      <span className="text-[11px] text-slate-500">Instant webhook handlers with automatic idempotency</span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <span className="text-[10px] font-bold uppercase text-slate-700">Tier 3 • Database &amp; Analytics</span>
                      <p className="mt-1 text-xs font-bold text-[#1C2E2E]">PostgreSQL, Supabase, Power BI, Python ETL</p>
                      <span className="text-[11px] text-slate-500">Structured schemas &amp; automated daily financial snapshots</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              STEP 5: MEASURABLE IMPACT & OUTCOMES
              ══════════════════════════════════════════════════════════ */}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Editorial Impact Card */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/25 text-[#0D9488] font-bold text-sm">
                      05
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                      Card 5 of 5 • Measurable Impact
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[#1C2E2E] tracking-tight">
                    Production Outcomes &amp; Proven Returns
                  </h2>

                  <p className="mt-3 text-sm text-[#1C2E2E]/80">
                    The deployed engineering solution generated verified operational and financial improvements across the board:
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.tour.impact.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-[#E5DEC9] bg-[#FAF7F2] p-5 text-center sm:text-left relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#0D9488]" />
                        <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#0D9488]">
                          {metric.stat}
                        </span>
                        <h3 className="mt-1 text-xs font-bold text-[#1C2E2E]">
                          {metric.label}
                        </h3>
                        <p className="mt-1.5 text-[11px] text-slate-600 leading-snug">
                          {metric.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Left-Bordered Key Architectural Takeaway */}
                  <div className="mt-8 rounded-r-2xl border-l-4 border-[#0D9488] bg-[#FAF7F2] p-5 border-y border-r border-[#E5DEC9]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">
                      Verified Architectural Takeaway
                    </span>
                    <p className="mt-1 text-xs sm:text-sm italic text-[#1C2E2E]/90 leading-relaxed">
                      &ldquo;{project.tour.keyTakeaway}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Verified Verification & Direct CTA Companion Card */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-3xl border border-[#E5DEC9] bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488] border-b border-[#E5DEC9] pb-4">
                    <Sparkles className="h-4 w-4 text-[#0D9488]" />
                    <span>Production Readiness Verified</span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-[#1C2E2E]/80">
                    This platform is currently operating in live production environments across Nairobi with dedicated SLA support and uptime guarantees.
                  </p>

                  <div className="mt-5 space-y-2.5 text-xs text-[#1C2E2E]/80">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
                      <span>Zero reconciliation lag achieved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
                      <span>KRA eTIMS &amp; Daraja compliance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
                      <span>Documented API and CRM pipelines</span>
                    </div>
                  </div>

                  {/* Direct Actions in Card */}
                  <div className="mt-6 pt-5 border-t border-[#E5DEC9] space-y-3">
                    <a
                      href={`https://wa.me/254791371301?text=${encodeURIComponent(
                        `Hello HM Technologies, I saw your case study on "${project.title}" and would like to consult on a similar solution.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Discuss on WhatsApp (+254 791 371 301)</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleRequestQuote}
                      className="w-full rounded-full border border-[#0F3D3E] bg-[#0F3D3E] hover:bg-[#0F3D3E]/90 text-white font-bold py-3 px-5 text-xs transition-all shadow-xs"
                    >
                      Request Similar Build Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM TOUR DOCK — Navigation & Quick Actions
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-12 rounded-2xl border border-[#E5DEC9] bg-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5DEC9] bg-[#FAF7F2] px-5 py-2.5 text-xs font-semibold text-[#1C2E2E] transition-all hover:bg-white hover:border-[#0F3D3E] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>

          {/* 5 Progress Dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((stepIdx) => (
              <button
                key={stepIdx}
                type="button"
                onClick={() => setCurrentStep(stepIdx)}
                className={`h-2.5 rounded-full transition-all ${
                  currentStep === stepIdx
                    ? 'w-8 bg-[#E05A47]'
                    : currentStep > stepIdx
                    ? 'w-2.5 bg-[#0F3D3E]'
                    : 'w-2.5 bg-[#E5DEC9] hover:bg-slate-300'
                }`}
                aria-label={`Go to step ${stepIdx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                className="group inline-flex items-center gap-2 rounded-full bg-[#E05A47] hover:bg-[#d04a37] text-white font-bold px-6 py-2.5 text-xs transition-all shadow-md"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onBack}
                className="group inline-flex items-center gap-2 rounded-full bg-[#0F3D3E] hover:bg-[#0F3D3E]/90 text-white font-bold px-6 py-2.5 text-xs transition-all shadow-md"
              >
                <span>Finish Case Study</span>
                <CheckCircle2 className="h-4 w-4 text-[#E05A47]" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
