import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
} from 'lucide-react';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';
import { serviceOptions } from '../data/content';
import { supabase } from '../lib/supabase';
import { sendContactEmail } from '../lib/email';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
};

export function Contact() {
  const ref = useRevealGroup<HTMLDivElement>();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleServiceSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setForm((prev) => ({
          ...prev,
          service: customEvent.detail,
          message: prev.message || `I am interested in ${customEvent.detail}. Please provide more information and a proposal.`,
        }));
      }
    };
    window.addEventListener('select-service', handleServiceSelect);
    return () => window.removeEventListener('select-service', handleServiceSelect);
  }, []);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    try {
      // 1. Send email notification directly to wambuahenry15@gmail.com
      const emailPromise = sendContactEmail({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        service: form.service,
        message: form.message,
      });

      // 2. Also save to Supabase database
      const dbPromise = supabase.from('contact_submissions').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        service_required: form.service || null,
        message: form.message,
      });

      const [emailResult, dbResult] = await Promise.allSettled([emailPromise, dbPromise]);

      const emailSuccess = emailResult.status === 'fulfilled';
      const dbSuccess = dbResult.status === 'fulfilled' && !dbResult.value.error;

      if (!emailSuccess && !dbSuccess) {
        throw new Error('Failed to send your message. Please try again or email us directly.');
      }

      setStatus('success');
      setForm(initialForm);
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly at wambuahenry15@gmail.com.'
      );
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div id="quote" className="sr-only" aria-hidden="true" />
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          description="Share your project requirements and our team will respond with a tailored proposal within one business day."
          theme="light"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left: contact info + map */}
          <div className="reveal lg:col-span-2" style={{ transitionDelay: '60ms' }}>
            <div className="space-y-4">
              <ContactInfoCard
                icon={<Phone className="h-5 w-5" />}
                title="Phone"
                lines={['+254 791 371 301']}
                href="tel:+254791371301"
                accent="blue"
              />
              <ContactInfoCard
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                lines={['info@hmtechnologies.co.ke']}
                href="mailto:info@hmtechnologies.co.ke"
                accent="ember"
              />
              <ContactInfoCard
                icon={<MapPin className="h-5 w-5" />}
                title="Location"
                lines={['Nairobi, Kenya']}
                accent="blue"
              />
              <ContactInfoCard
                icon={<Clock className="h-5 w-5" />}
                title="Business Hours"
                lines={['Mon – Fri: 8:00 – 17:00', 'Sat: 9:00 – 13:00']}
                accent="ember"
              />
            </div>

            {/* Map preview */}
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xs">
              <div className="relative h-56 bg-gradient-to-br from-slate-100 via-indigo-50/40 to-slate-100">
                <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
                {/* Stylized map pins */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 animate-pulse-glow" />
                  <span className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/25 animate-pulse-glow" />
                  <MapPin className="relative h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-indigo-600 drop-shadow-sm" />
                </div>
                <div className="absolute bottom-4 left-4 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
                  Nairobi, Kenya • Central Business District
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: '140ms' }}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your full name"
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@company.com"
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+254 ..."
                    className={inputClass}
                  />
                </Field>
                <Field label="Company">
                  <input
                    type="text"
                    value={form.company}
                    onChange={update('company')}
                    placeholder="Company name"
                    className={inputClass}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Service Required">
                    <select value={form.service} onChange={update('service')} className={inputClass}>
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message" required>
                    <textarea
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Tell us about your project..."
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
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:from-indigo-700 hover:to-blue-700 hover:shadow-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                  Thank you! Your message has been received. We'll be in touch shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-600" />
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
  'w-full rounded-xl border border-slate-300 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs';

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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

function ContactInfoCard({
  icon,
  title,
  lines,
  href,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  href?: string;
  accent: 'blue' | 'ember';
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md">
      <span
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${
          accent === 'blue'
            ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
            : 'border-amber-200 bg-amber-50 text-amber-600'
        }`}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {lines.map((l) =>
          href ? (
            <a
              key={l}
              href={href}
              className="text-sm font-bold text-slate-900 transition-colors hover:text-indigo-600"
            >
              {l}
            </a>
          ) : (
            <span key={l} className="text-sm font-semibold text-slate-900">
              {l}
            </span>
          )
        )}
      </div>
    </div>
  );
}
