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

        {/* Verified Rating & Trust Banner to eliminate dead space */}
        <div className="reveal mt-12 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600 font-bold text-sm shadow-xs">
              ★ 5.0
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">100% Milestone Delivery on SLA Agreements</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Verified reviews across logistics, retail e-commerce, and healthcare clients in Kenya.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
          >
            Start Your Project Consultation &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
