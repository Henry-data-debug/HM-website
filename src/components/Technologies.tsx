import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

const techLayers = [
  {
    layer: 'Layer 01',
    category: 'Frontend & Web Platforms',
    badge: 'Client Systems',
    icon: Code2,
    accent: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    dotColor: 'bg-indigo-500',
    description:
      'High-performance, accessible user interfaces built with typed frameworks for flawless Core Web Vitals and speed.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3'],
    sla: 'TTFB < 50ms · Mobile-First',
  },
  {
    layer: 'Layer 02',
    category: 'Backend & Microservices',
    badge: 'Core Services',
    icon: Server,
    accent: 'border-sky-200 bg-sky-50 text-sky-700',
    dotColor: 'bg-sky-500',
    description:
      'Robust server architectures, asynchronous workers, and secure RESTful/GraphQL APIs handling thousands of transactions.',
    tools: ['Python', 'Node.js', 'FastAPI', 'Django', 'PHP', 'Laravel'],
    sla: 'Asynchronous · Zero Bottlenecks',
  },
  {
    layer: 'Layer 03',
    category: 'Data & Business Intelligence',
    badge: 'BI & Pipelines',
    icon: Database,
    accent: 'border-cyan-200 bg-cyan-50 text-cyan-700',
    dotColor: 'bg-cyan-500',
    description:
      'Enterprise database clustering, automated data pipelines, and executive dashboards delivering predictive reporting.',
    tools: ['Power BI', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Python ETL'],
    sla: 'Real-time KPI Sync · Sub-second',
  },
  {
    layer: 'Layer 04',
    category: 'Fintech & Cloud DevOps',
    badge: 'Fintech & Infra',
    icon: ShieldCheck,
    accent: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dotColor: 'bg-emerald-500',
    description:
      'Zero-trust cloud infrastructure, automated CI/CD deployment pipelines, and Safaricom Daraja M-Pesa STK push callbacks.',
    tools: ['M-Pesa Daraja', 'Microsoft Azure', 'Zoho CRM', 'GitHub CI/CD', 'Docker', 'M365'],
    sla: '99.98% High Availability SLA',
  },
];

export function Technologies() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="technologies" className="section-padding relative overflow-hidden bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Architectural Stack"
          title="Enterprise Tech Stack &amp; Infrastructure"
          description="We build on well-supported, enterprise-grade frameworks, high-throughput databases, and automated cloud platforms engineered for scale."
          theme="light"
        />

        {/* 4 Architectural Matrix Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techLayers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.category}
                className="reveal rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div>
                  {/* Header: Layer & Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${layer.accent}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${layer.dotColor}`} />
                      {layer.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {layer.layer}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${layer.accent} shadow-2xs`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 leading-snug">
                      {layer.category}
                    </h3>
                  </div>

                  {/* Layer Summary */}
                  <p className="mt-3.5 text-xs leading-relaxed text-slate-600">
                    {layer.description}
                  </p>

                  {/* Framework & Tool Badges */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {layer.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-lg border border-slate-200/90 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-900 shadow-2xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom SLA Marker */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{layer.sla}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Philosophy Strip */}
        <div className="reveal mt-10 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
              <Zap className="h-4 w-4" />
            </span>
            <p className="text-xs sm:text-sm text-slate-600">
              <span className="font-bold text-slate-900">Custom Engineering Standards:</span> 100% typed codebases, automated security checks, zero legacy bloat, and fully documented APIs.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
          >
            Review Architecture Specs &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
