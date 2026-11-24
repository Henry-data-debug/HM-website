import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const deliveryPhases = [
  {
    number: '01',
    title: 'Architecture & Discovery',
    description:
      'Requirements analysis, data modeling, system architecture blueprints, and API integration scoping tailored to your business outcomes.',
    tag: 'Phase 01 · Planning',
    accent: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
  },
  {
    number: '02',
    title: 'Agile Engineering & Sprints',
    description:
      'Bi-weekly delivery sprints, Clean Code in TypeScript & Python, and continuous CI/CD integration with M-Pesa Daraja and Zoho CRM APIs.',
    tag: 'Phase 02 · Build',
    accent: 'border-electric-500/30 text-electric-300 bg-electric-500/10',
  },
  {
    number: '03',
    title: 'Rigorous QA & Security',
    description:
      'Automated end-to-end testing, load simulation, multi-tenant security verification, and client acceptance testing before production cutover.',
    tag: 'Phase 03 · Validate',
    accent: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
  },
  {
    number: '04',
    title: 'Deployment & SLA Support',
    description:
      'Zero-downtime production deployment, comprehensive staff training, and 24/7 SLA monitoring ensuring 99.9% ongoing system reliability.',
    tag: 'Phase 04 · Scale',
    accent: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
  },
];

export function Process() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="process" className="section-padding relative overflow-hidden bg-[#0F172A] border-t border-slate-800">
      {/* Ambient glow in Deep Slate */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-cyan-500/[0.06] blur-[110px] -z-10" />

      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="4-Step Delivery Framework"
          title="Our Engineering & Delivery Process"
          description="A structured, predictable 4-step delivery pipeline from first architecture consultation to ongoing SLA monitoring."
        />

        {/* 4-Column Delivery Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliveryPhases.map((phase, i) => (
            <div
              key={phase.number}
              className="reveal rounded-3xl border border-slate-700/80 bg-slate-800/50 backdrop-blur-xl p-6 sm:p-7 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border font-display text-base font-extrabold shadow-sm ${phase.accent}`}>
                    {phase.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Step {phase.number}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    {phase.tag}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-white leading-snug">
                    {phase.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
                    {phase.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-1.5 text-xs text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Milestone verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick CTA strip */}
        <div className="reveal mt-12 rounded-2xl border border-slate-700/80 bg-slate-800/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
            Have a project deadline or custom technical requirements? Let&apos;s build an architectural roadmap.
          </p>
          <a
            href="#quote"
            className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 text-xs transition-all shadow-md"
          >
            <span>Start Architecture Review</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
