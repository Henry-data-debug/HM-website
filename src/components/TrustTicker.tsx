import {
  ShieldCheck,
  Cpu,
  Activity,
  Clock,
  CheckCircle2,
  TrendingUp,
  Layers,
  Code2,
  Smartphone,
  Database,
  BarChart3,
  Globe2,
} from 'lucide-react';

const proofAndTechItems = [
  {
    type: 'tech',
    icon: Smartphone,
    title: 'Safaricom M-Pesa',
    subtitle: 'Daraja B2C/C2B API',
    tag: 'Fintech',
    tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    type: 'proof',
    icon: Layers,
    value: '400+ Units',
    label: '& Workflows Managed',
    highlight: 'text-indigo-600',
  },
  {
    type: 'tech',
    icon: Code2,
    title: 'React & Next.js',
    subtitle: 'TypeScript Architecture',
    tag: 'Web',
    tagClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    type: 'proof',
    icon: ShieldCheck,
    value: 'Net-Zero',
    label: 'System Downtime',
    highlight: 'text-emerald-600',
  },
  {
    type: 'tech',
    icon: Cpu,
    title: 'Zoho CRM & Creator',
    subtitle: 'End-to-End Workflows',
    tag: 'Automation',
    tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    type: 'proof',
    icon: Activity,
    value: '99.9%',
    label: 'Platform Reliability',
    highlight: 'text-cyan-600',
  },
  {
    type: 'tech',
    icon: Database,
    title: 'Python & FastAPI',
    subtitle: 'Enterprise Backend',
    tag: 'Backend',
    tagClass: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    type: 'proof',
    icon: Clock,
    value: '< 2 Hours',
    label: 'SLA Response Time',
    highlight: 'text-amber-600',
  },
  {
    type: 'tech',
    icon: BarChart3,
    title: 'Power BI & SQL',
    subtitle: 'Executive Dashboards',
    tag: 'Analytics',
    tagClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  {
    type: 'proof',
    icon: TrendingUp,
    value: '3.2x',
    label: 'Avg ROI Acceleration',
    highlight: 'text-indigo-600',
  },
  {
    type: 'tech',
    icon: Globe2,
    title: 'Meta & Google Ads',
    subtitle: 'Performance SEO & CRO',
    tag: 'Growth',
    tagClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    type: 'proof',
    icon: CheckCircle2,
    value: '50+ Delivered',
    label: 'Systems & Portals',
    highlight: 'text-emerald-600',
  },
];

export function TrustTicker() {
  return (
    <div className="relative border-y border-slate-200/80 bg-slate-50 py-5">
      {/* Edge gradient masks for seamless overflow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />

      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6 hover:[animation-play-state:paused]">
          {proofAndTechItems.concat(proofAndTechItems).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 whitespace-nowrap rounded-full border border-slate-200/90 bg-white px-4 py-2 shadow-sm transition-all hover:border-indigo-400 hover:shadow-md"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Icon className="h-4 w-4" />
                </span>
                {item.type === 'tech' ? (
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </span>
                    <span className="hidden sm:inline text-[11px] text-slate-500">
                      • {item.subtitle}
                    </span>
                    {item.tag && (
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${item.tagClass}`}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`font-display text-xs font-bold tracking-tight ${item.highlight}`}>
                      {item.value}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
