import { ArrowRight, Mail } from 'lucide-react';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function CTA() {
  const ref = useRevealGroup<HTMLDivElement>();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cta" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="reveal relative overflow-hidden rounded-4xl glass-strong px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* glow accents */}
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-electric-500/25 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-ember-500/20 blur-3xl animate-pulse-glow" />
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-electric-200">
              Let&rsquo;s Talk
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Let&rsquo;s Build Your Next{' '}
              <span className="text-gradient">Digital Solution</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg">
              Tell us about your goals and we&rsquo;ll craft a tailored plan to bring them to life —
              on time, on budget, and built to scale.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={() => scrollTo('#contact')} className="btn-primary w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => scrollTo('#contact')} className="btn-secondary w-full sm:w-auto">
                <Mail className="h-4 w-4" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
