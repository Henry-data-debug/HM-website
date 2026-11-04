import { Target, Eye } from 'lucide-react';
import { useRevealGroup } from '../hooks/useRevealGroup';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
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
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-gradient-to-b from-cyan-500/10 to-transparent blur-[100px] -z-10" />

      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left: visual */}
          <div className="reveal relative">
            <div className="glass relative overflow-hidden rounded-3xl p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-ember-500/10 blur-3xl" />

              <div className="relative grid grid-cols-2 gap-4">
                <StatTile value="7+" label="Years in business" gradient="from-cyan-500/20 to-electric-700/10" />
                <StatTile value="50+" label="Projects delivered" gradient="from-ember-500/20 to-ember-600/10" />
                <StatTile value="15+" label="Tech stack experts" gradient="from-electric-500/20 to-indigo-700/10" />
                <StatTile value="100%" label="Client focus" gradient="from-ember-500/20 to-amber-600/10" />
              </div>

              <div className="relative mt-6 rounded-2xl border border-white/[0.08] bg-[#070D1A]/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Digital Transformation Index</span>
                  <span className="text-xs font-bold text-cyan-400">+180%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-electric-500 via-cyan-500 to-ember-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: text content */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <SectionHeading
              eyebrow="Who We Are"
              title="HM Technologies"
              description="We are a Nairobi-based technology company helping businesses grow through innovative software, data analytics, automation, and digital marketing."
              align="left"
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <MissionCard
                icon={<Target className="h-5 w-5" />}
                title="Our Mission"
                description="To deliver innovative, reliable, and affordable tech solutions that drive real business growth across Africa and beyond."
                gradient="from-electric-500/15 to-cyan-500/15"
              />
              <MissionCard
                icon={<Eye className="h-5 w-5" />}
                title="Our Vision"
                description="To become East Africa's most trusted partner for digital transformation, empowering organizations of every size to compete globally."
                gradient="from-ember-500/15 to-amber-500/15"
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
  gradient,
}: {
  value: string;
  label: string;
  gradient: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-5`}>
      <span className="font-display text-3xl font-extrabold text-white">{value}</span>
      <span className="mt-1 block text-xs font-medium text-slate-300">{label}</span>
    </div>
  );
}

function MissionCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className={`bento-card bg-gradient-to-br ${gradient} p-6`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.08] text-cyan-300 border border-white/[0.06]">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  );
}
