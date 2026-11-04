import { useEffect, useState } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';
import { supabase } from '../lib/supabase';
import type { Testimonial } from '../types/db';

export function Testimonials() {
  const ref = useRevealGroup<HTMLDivElement>();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setItems(data as Testimonial[]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="testimonials" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Long-term partnerships built on trust, transparency, and measurable results."
        />

        {loading ? (
          <div className="mt-14 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-electric-400" />
          </div>
        ) : items.length === 0 ? (
          <p className="mt-14 text-center text-silver-400">Testimonials coming soon.</p>
        ) : (
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {items.map((t, i) => (
              <figure
                key={t.id}
                className="reveal group relative flex flex-col rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-glass-hover"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <Quote className="absolute right-6 top-6 h-10 w-10 text-electric-500/15" />

                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-ember-500 text-ember-500" />
                  ))}
                </div>

                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-silver-200">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} font-display text-sm font-bold text-white shadow-glow`}
                  >
                    {t.initials || t.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-semibold text-white">{t.name}</span>
                    <span className="text-xs text-silver-400">
                      {t.role}
                      {t.company ? `, ${t.company}` : ''}
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
