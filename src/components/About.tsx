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
      <span className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-electric-200">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-silver-300 sm:text-lg">{description}</p>
      )}
    </div>
  );
}

export function About() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="about" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left: visual */}
          <div className="reveal relative">
            <div className="glass relative overflow-hidden rounded-3xl p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric-500/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-ember-500/10 blur-3xl" />

              <div className="relative grid grid-cols-2 gap-4">
                <StatTile value="7+" label="Years in business" gradient="from-electric-500/20 to-electric-700/10" />
                <StatTile value="50+" label="Projects delivered" gradient="from-ember-500/20 to-ember-600/10" />
                <StatTile value="15+" label="Tech stack experts" gradient="from-electric-500/20 to-electric-700/10" />
                <StatTile value="100%" label="Client focus" gradient="from-ember-500/20 to-ember-600/10" />
              </div>

              <div className="relative mt-6 rounded-2xl border border-white/10 bg-navy-900/40 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-silver-400">Digital Transformation Index</span>
                  <span className="text-xs font-semibold text-electric-300">+180%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-electric-500 to-ember-500" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-silver-400">
                  <span>2020</span>
                  <span>2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <SectionHeading
              eyebrow="About Us"
              title="Who We Are"
              align="left"
            />
            <p className="mt-6 text-base leading-relaxed text-silver-300 sm:text-lg">
              HM Technologies is a technology solutions company dedicated to helping businesses
              embrace digital transformation. We specialize in developing modern websites, custom
              software systems, intelligent business automation, data analytics, IT support, and
              digital marketing strategies that deliver measurable results.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric-500/15 text-electric-300">
                  <Target className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-300">
                  To empower businesses with innovative technology solutions that drive efficiency,
                  growth, and long-term success.
                </p>
              </div>
              <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-500/15 text-ember-400">
                  <Eye className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-300">
                  To become one of Africa&rsquo;s leading technology and digital transformation
                  companies.
                </p>
              </div>
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
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-5`}>
      <div className="font-display text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-silver-300">{label}</div>
    </div>
  );
}
