import { Target, Eye } from 'lucide-react';
import { useRevealGroup } from '../hooks/useRevealGroup';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'dark',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  
  if (theme === 'light') {
    return (
      <div className={`reveal max-w-2xl ${alignClass}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/90 bg-indigo-50/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700 shadow-sm">
          {eyebrow}
        </span>
        <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`reveal max-w-2xl ${alignClass}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-300 backdrop-blur-sm">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
      )}
    </div>
  );
}

export function About() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left: visual studio card with high-res engineering visual */}
          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-50 p-6 sm:p-8 shadow-sm">
              {/* Studio Image Header */}
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-2xl border border-slate-200 shadow-inner group">
                <img
                  src="/hero/software-engineering-studio.jpg"
                  alt="HM Technologies Nairobi Engineering Studio & Architecture"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Engineering Studio • Nairobi HQ
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded">
                    TS · Python · Daraja
                  </span>
                </div>
              </div>

              {/* 4 Key Statistics Micro-Grid */}
              <div className="relative mt-6 grid grid-cols-2 gap-3.5">
                <StatTile value="7+" label="Years in business" accent="indigo" />
                <StatTile value="50+" label="Projects delivered" accent="emerald" />
                <StatTile value="15+" label="Tech stack experts" accent="sky" />
                <StatTile value="100%" label="Client focus" accent="amber" />
              </div>

              {/* Transformation Indicator */}
              <div className="relative mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Digital Transformation Impact</span>
                  <span className="text-xs font-bold text-indigo-600">+180% Avg ROI</span>
                </div>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: text content */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <SectionHeading
              eyebrow="Who We Are"
              title="About HM Technologies"
              description="We are a Nairobi-based technology engineering firm helping businesses scale through custom software, automated operational workflows, data analytics, and digital marketing."
              align="left"
              theme="light"
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <MissionCard
                icon={<Target className="h-5 w-5" />}
                title="Our Mission"
                description="To deliver innovative, reliable, and affordable tech solutions that drive real business growth across Africa and beyond."
                accent="indigo"
              />
              <MissionCard
                icon={<Eye className="h-5 w-5" />}
                title="Our Vision"
                description="To become East Africa's most trusted partner for digital transformation, empowering organizations of every size to compete globally."
                accent="emerald"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: 'indigo' | 'emerald' | 'sky' | 'amber';
}) {
  const accentClasses = {
    indigo: 'border-indigo-100 bg-indigo-50/40 text-indigo-700',
    emerald: 'border-emerald-100 bg-emerald-50/40 text-emerald-700',
    sky: 'border-sky-100 bg-sky-50/40 text-sky-700',
    amber: 'border-amber-100 bg-amber-50/40 text-amber-700',
  }[accent];

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${accentClasses} p-4 transition-all hover:shadow-xs`}>
      <span className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">{value}</span>
      <span className="mt-1 block text-xs font-semibold text-slate-600">{label}</span>
    </div>
  );
}

function MissionCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: 'indigo' | 'emerald';
}) {
  const iconClasses = accent === 'indigo'
    ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
    : 'bg-emerald-50 text-emerald-600 border-emerald-200';

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-2xs transition-all hover:bg-white hover:shadow-sm">
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconClasses}`}>
        {icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
