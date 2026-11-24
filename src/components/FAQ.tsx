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
    <section id="faq" className="section-padding relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          description="Clear answers about our software engineering, automation workflows, pricing, and project delivery in Kenya."
          theme="light"
        />

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="reveal rounded-2xl border border-slate-200/90 bg-slate-50/70 overflow-hidden transition-all duration-300 shadow-2xs hover:border-indigo-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:text-indigo-600"
                  >
                    <span className="flex items-center gap-3 font-display text-base sm:text-lg font-bold text-slate-900">
                      <HelpCircle className="h-5 w-5 shrink-0 text-indigo-600" aria-hidden="true" />
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-indigo-600 border-indigo-300 bg-indigo-50' : ''
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
                    <p className="border-t border-slate-200/80 pt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Support callout */}
        <div className="reveal mt-10 rounded-2xl border border-slate-200/90 bg-slate-50 p-5 text-center sm:p-6">
          <p className="text-sm text-slate-600">
            Have a question not listed here?{' '}
            <a
              href="#contact"
              className="font-semibold text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-700"
            >
              Ask our Nairobi engineering team directly
            </a>{' '}
            or message us on WhatsApp at{' '}
            <a
              href="https://wa.me/254791371301"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
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
