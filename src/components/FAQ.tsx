import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';
import { faqItems } from '../data/content';

export function FAQ() {
  const ref = useRevealGroup<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-[#0A0F1D]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-80 w-[36rem] rounded-full bg-cyan-500/[0.05] blur-[120px] -z-10" />

      <div ref={ref} className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          description="Clear answers about our software engineering, automation workflows, pricing, and project delivery in Kenya."
        />

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="reveal bento-card overflow-hidden transition-all duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:text-cyan-300"
                  >
                    <span className="flex items-center gap-3 font-display text-base sm:text-lg font-bold text-white">
                      <HelpCircle className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-300 border-cyan-400/40 bg-cyan-500/10' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7">
                    <p className="border-t border-white/[0.06] pt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Support callout */}
        <div className="reveal mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center sm:p-6">
          <p className="text-sm text-slate-300">
            Have a question not listed here?{' '}
            <a
              href="#contact"
              className="font-semibold text-cyan-400 underline underline-offset-4 transition-colors hover:text-cyan-300"
            >
              Ask our Nairobi engineering team directly
            </a>{' '}
            or call{' '}
            <a
              href="tel:+254791371301"
              className="font-semibold text-cyan-400 underline underline-offset-4 transition-colors hover:text-cyan-300"
            >
              +254 791 371 301
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
