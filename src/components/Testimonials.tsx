import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function Testimonials() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section className="section-padding relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Client Results"
          title="Client Testimonials &amp; Verified Reviews"
          description="Real feedback from organizations we've helped transform with software and automation."
          theme="light"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="reveal rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-7 hover:border-indigo-400 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
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
                <Quote className="mt-4 h-6 w-6 text-slate-300" />

                {/* Quote Text */}
                <p className="mt-3 text-sm leading-relaxed text-slate-700 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-200/80">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} font-display text-xs font-bold text-white shadow-xs`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs font-medium text-slate-500">
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
