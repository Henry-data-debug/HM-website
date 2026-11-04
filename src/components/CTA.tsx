import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#060911]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-electric-500/15 via-cyan-500/12 to-indigo-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-15" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-300 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Let's Build Together
        </span>

        <h2 className="mt-6 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight tracking-tight">
          Ready to Transform Your{' '}
          <span className="text-gradient-cyan">Digital Operations?</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Whether you need to automate operations, build custom software, or launch high-converting campaigns —
          our team is ready to deliver measurable results.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <button onClick={() => scrollTo('#quote')} className="btn-primary w-full sm:w-auto text-base px-8 py-3.5">
            Schedule Consultation
            <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-secondary w-full sm:w-auto text-base px-8 py-3.5">
            Send a Message
          </button>
        </div>

        <p className="mt-5 text-xs text-slate-400">
          ✓ No commitment required · ✓ Response within 2 hours · ✓ Transparent KSh proposals
        </p>
      </div>
    </section>
  );
}
