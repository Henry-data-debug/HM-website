import { ShieldCheck, Cpu, Activity, Clock, CheckCircle2, TrendingUp, Layers } from 'lucide-react';

const proofPoints = [
  {
    icon: Layers,
    value: '400+ Units',
    label: '& Workflows Managed',
    accent: 'text-cyan-400',
  },
  {
    icon: ShieldCheck,
    value: 'Net-Zero',
    label: 'System Downtime',
    accent: 'text-electric-300',
  },
  {
    icon: Cpu,
    value: 'Enterprise',
    label: 'Custom Automation',
    accent: 'text-ember-400',
  },
  {
    icon: Activity,
    value: '99.9%',
    label: 'Platform Reliability',
    accent: 'text-cyan-400',
  },
  {
    icon: Clock,
    value: '< 2 Hours',
    label: 'Average Response Time',
    accent: 'text-electric-300',
  },
  {
    icon: TrendingUp,
    value: '3.2x',
    label: 'Average ROI Acceleration',
    accent: 'text-ember-400',
  },
  {
    icon: CheckCircle2,
    value: '50+ Delivered',
    label: 'Systems & Portals',
    accent: 'text-cyan-400',
  },
];

export function TrustTicker() {
  return (
    <div className="relative border-y border-white/[0.08] bg-[#070B14]/90 py-5 backdrop-blur-xl">
      {/* Edge gradient masks for seamless overflow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#060911] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#060911] to-transparent" />

      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {proofPoints.concat(proofPoints).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2 transition-colors hover:border-cyan-500/30 hover:bg-white/[0.05]"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] ${item.accent}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-display text-sm font-bold text-white tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
