import { useState } from 'react';
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

    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      service_required: form.service || null,
      message: form.message,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      return;
    }

    setStatus('success');
    setForm(initialForm);
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Start a Conversation"
          description="Share your project details and our team will respond within one business day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left: contact info + map */}
          <div className="reveal lg:col-span-2" style={{ transitionDelay: '60ms' }}>
            <div className="space-y-4">
              <ContactInfoCard
                icon={<Phone className="h-5 w-5" />}
                title="Phone"
                lines={['0791 371 301']}
                accent="blue"
              />
              <ContactInfoCard
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                lines={['info@hmtechnologies.co.ke']}
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

            {/* Map placeholder */}
            <div className="mt-6 overflow-hidden rounded-3xl glass">
              <div className="relative h-56 bg-gradient-to-br from-navy-800 to-navy-950">
                <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
                {/* Stylized map pins */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/30 animate-pulse-glow" />
                  <span className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/40 animate-pulse-glow" />
                  <MapPin className="relative h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-electric-300 drop-shadow-glow" />
                </div>
                <div className="absolute bottom-4 left-4 rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-silver-200">
                  Nairobi, Kenya
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: '140ms' }}>
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-6 sm:p-8"
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
                        <option key={s} value={s} className="bg-navy-800">
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
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
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
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  Thank you! Your message has been received. We'll be in touch shortly.
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

function ContactInfoCard({
  icon,
  title,
  lines,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  accent: 'blue' | 'ember';
}) {
  return (
    <div className="glass flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-electric-500/30">
      <span
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
          accent === 'blue' ? 'bg-electric-500/15 text-electric-300' : 'bg-ember-500/15 text-ember-400'
        }`}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-silver-400">
          {title}
        </span>
        {lines.map((l) => (
          <span key={l} className="text-sm font-medium text-white">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
