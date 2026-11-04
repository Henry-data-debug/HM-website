import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function Testimonials() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-cyan-500/[0.06] blur-[120px] -z-10" />

      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Client Results"
          title="Trusted by Leading Teams"
          description="Real feedback from organizations we've helped transform."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="reveal bento-card group flex flex-col justify-between p-6"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="mt-4 h-6 w-6 text-white/10" />

                {/* Quote Text */}
                <p className="mt-3 text-sm leading-relaxed text-slate-300 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/[0.08]">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} font-display text-xs font-bold text-white shadow-md`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">
                    {t.role}{t.company ? ` · ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
