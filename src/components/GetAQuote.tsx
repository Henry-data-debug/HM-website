import { useEffect, useState } from 'react';
import {
  Calculator,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Wifi,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';
import { serviceOptions } from '../data/content';
import { supabase } from '../lib/supabase';
import { sendQuoteEmail } from '../lib/email';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface QuoteForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
}

const initialForm: QuoteForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  description: '',
};

const timelines = ['ASAP', '1 month', '1 – 3 months', '3 – 6 months', 'Flexible'];

export function GetAQuote() {
  const ref = useRevealGroup<HTMLDivElement>();
  const [form, setForm] = useState<QuoteForm>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const onServiceSelect = (event: Event) => {
      const service = (event as CustomEvent<string>).detail;
      if (serviceOptions.includes(service)) {
        setForm((current) => ({ ...current, service }));
      }
    };

    window.addEventListener('select-service', onServiceSelect);
    return () => window.removeEventListener('select-service', onServiceSelect);
  }, []);

  const update =
    (key: keyof QuoteForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!form.name || !form.email || !form.service || !form.description) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, service, and project description.');
      return;
    }

    try {
      // 1. Send email notification directly to wambuahenry15@gmail.com
      const emailPromise = sendQuoteEmail({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        service: form.service,
        budget: form.budget,
        timeline: form.timeline,
        description: form.description,
      });

      // 2. Also save to Supabase database for admin tracking
      const dbPromise = supabase.from('quote_requests').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        service: form.service,
        budget: form.budget || null,
        timeline: form.timeline || null,
        description: form.description,
      });

      // Execute both in parallel
      const [emailResult, dbResult] = await Promise.allSettled([emailPromise, dbPromise]);

      const emailSuccess = emailResult.status === 'fulfilled';
      const dbSuccess = dbResult.status === 'fulfilled' && !dbResult.value.error;

      if (!emailSuccess && !dbSuccess) {
        throw new Error('Failed to submit quote request. Please try again or reach out directly via email.');
      }

      setStatus('success');
      setForm(initialForm);
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or contact us directly at wambuahenry15@gmail.com.'
      );
    }
  };

  return (
    <section id="quote" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Get a Custom Quote"
          description="Tell us about your project and we'll prepare a tailored proposal with transparent pricing — no obligations."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left: value props */}
          <div className="reveal lg:col-span-2" style={{ transitionDelay: '60ms' }}>
            <div className="space-y-4">
              <ValueProp
                icon={<Clock className="h-5 w-5" />}
                title="Fast Response"
                text="We reply to every quote request within one business day."
              />
              <ValueProp
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Transparent Pricing"
                text="Clear, itemized proposals — no hidden fees or surprise costs."
              />
              <ValueProp
                icon={<MapPin className="h-5 w-5" />}
                title="Local & Global"
                text="Based in Nairobi, serving clients across Africa and online worldwide."
              />
              <ValueProp
                icon={<Wifi className="h-5 w-5" />}
                title="Online Services"
                text="We deliver remotely with the same care as on-site engagements."
              />
            </div>

            <div className="glass mt-6 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-electric-300">
                <Calculator className="h-5 w-5" />
                <span className="font-display text-sm font-semibold text-white">
                  How it works
                </span>
              </div>
              <ol className="mt-4 space-y-3 text-sm text-silver-300">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-electric-500/20 text-xs font-bold text-electric-300">1</span>
                  Submit the form with your project details.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-electric-500/20 text-xs font-bold text-electric-300">2</span>
                  We review and prepare a tailored proposal.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ember-500/20 text-xs font-bold text-ember-400">3</span>
                  You receive a quote with scope, timeline & price.
                </li>
              </ol>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: '140ms' }}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" required>
                  <input type="text" value={form.name} onChange={update('name')} placeholder="Your full name" className={inputClass} required />
                </Field>
                <Field label="Email" required>
                  <input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" className={inputClass} required />
                </Field>
                <Field label="Phone">
                  <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+254 ..." className={inputClass} />
                </Field>
                <Field label="Company">
                  <input type="text" value={form.company} onChange={update('company')} placeholder="Company name" className={inputClass} />
                </Field>
                <Field label="Service Required" required>
                  <select value={form.service} onChange={update('service')} className={inputClass} required>
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-navy-800">{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Estimated Budget (KSh)">
                  <input
                    type="text"
                    value={form.budget}
                    onChange={update('budget')}
                    placeholder="e.g. KSh 50,000"
                    className={inputClass}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Preferred Timeline">
                    <select value={form.timeline} onChange={update('timeline')} className={inputClass}>
                      <option value="">Select a timeline</option>
                      {timelines.map((t) => (
                        <option key={t} value={t} className="bg-navy-800">{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Project Description" required>
                    <textarea
                      value={form.description}
                      onChange={update('description')}
                      placeholder="Describe your project, goals, and any specific requirements..."
                      rows={5}
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="h-4 w-4" /> Request Quote</>
                )}
              </button>

              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  Thank you! Your quote request has been received. We'll send a tailored proposal within one business day.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-navy-900/50 px-4 py-3 text-sm text-white placeholder:text-silver-400 transition-all focus:border-electric-500/50 focus:outline-none focus:ring-2 focus:ring-electric-500/20';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-silver-300">
        {label}
        {required && <span className="text-ember-400"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ValueProp({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="glass flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-electric-500/30">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-electric-500/15 text-electric-300">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="font-display text-sm font-semibold text-white">{title}</span>
        <span className="mt-1 text-sm leading-relaxed text-silver-300">{text}</span>
      </div>
    </div>
  );
}
