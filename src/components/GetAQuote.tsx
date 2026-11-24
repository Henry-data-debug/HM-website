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
  Sparkles,
  ArrowRight,
  Zap,
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

const pricingPackages = [
  {
    name: 'Sprint MVP / Web Platform',
    price: 'KES 65,000',
    usd: '~$500 USD',
    description: 'Fast-track launch for startups, corporate brands, and growing businesses.',
    service: 'Website Development',
    budget: 'KES 65,000',
    timeline: '1 month',
    popular: false,
    features: [
      'Custom React / Next.js Responsive Web Platform',
      'Technical SEO & Core Web Vitals Optimization',
      'Lead Capture Form & Instant WhatsApp Integration',
      '30-Day Post-Launch Technical Support & SLA',
    ],
  },
  {
    name: 'Enterprise Automation & Zoho',
    price: 'KES 140,000',
    usd: '~$1,100 USD',
    description: 'End-to-end operational automation, payment webhooks, and CRM pipeline sync.',
    service: 'Business Automation',
    budget: 'KES 140,000',
    timeline: '1 – 3 months',
    popular: true,
    features: [
      'Safaricom M-Pesa Daraja STK Push & B2C/C2B Integration',
      'Zoho CRM, Creator & Power Automate Workflows',
      'Custom Webhooks & Multi-Platform Database Sync',
      'Instant SMS & WhatsApp Client Notification Triggers',
      '60-Day Dedicated Priority SLA & Maintenance',
    ],
  },
  {
    name: 'Full-Funnel Growth & BI Analytics',
    price: 'KES 220,000',
    usd: '~$1,750 USD',
    description: 'Executive intelligence dashboards and high-conversion acquisition funnels.',
    service: 'Data Analytics & Business Intelligence',
    budget: 'KES 220,000',
    timeline: '1 – 3 months',
    popular: false,
    features: [
      'Interactive Power BI & Python Executive Dashboards',
      'Targeted Meta & Google Ads Campaign Engineering',
      'Technical SEO Architecture & Funnel CRO Optimization',
      'Predictive Revenue Forecasting & Multi-Source ETL',
      'Quarterly Strategic Engineering & SLA Reviews',
    ],
  },
];

export function GetAQuote({ sourcePage }: { sourcePage: string }) {
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

  const selectPackage = (pkg: typeof pricingPackages[0]) => {
    setForm((current) => ({
      ...current,
      service: pkg.service,
      budget: pkg.budget,
      timeline: pkg.timeline,
      description: current.description || `Inquiring about the ${pkg.name} package.`,
    }));

    const formEl = document.querySelector('#quote-form-container');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        sourcePage,
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
        source_page: sourcePage,
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
          : 'Something went wrong. Please try again or contact us directly at info@hmtechnologies.co.ke.'
      );
    }
  };

  return (
    <section id="quote" className="section-padding relative bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Transparent Pricing &amp; Packages"
          title="Engagement Packages &amp; Custom Project Estimates"
          description="Transparent, milestone-based pricing with guaranteed delivery SLAs. Choose a pre-packaged tier or request a bespoke itemized proposal."
          theme="light"
        />

        {/* ── ENGAGEMENT PACKAGES (3 CARDS) ── */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`reveal rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white ring-2 ring-indigo-600 shadow-xl relative -translate-y-1'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <div>
                {pkg.popular ? (
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-700">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    RECOMMENDED • MOST POPULAR
                  </div>
                ) : (
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    <Zap className="h-3.5 w-3.5 text-slate-500" />
                    Tailored Solution
                  </div>
                )}

                <h3 className="font-display text-xl font-bold text-slate-900">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {pkg.description}
                </p>

                <div className="mt-5 pb-5 border-b border-slate-200/80">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-slate-900">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {pkg.usd}
                    </span>
                  </div>
                  <span className="mt-1 block text-[11px] font-medium text-emerald-700">
                    ✓ Milestone-based payment terms
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Deliverables Included:
                  </span>
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-indigo-600' : 'text-emerald-600'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => selectPackage(pkg)}
                  className={`group w-full rounded-full py-3 px-5 text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    pkg.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/25'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>Select Package</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── CUSTOM QUOTE FORM CONTAINER ── */}
        <div id="quote-form-container" className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Left: value props */}
          <div className="reveal lg:col-span-2" style={{ transitionDelay: '60ms' }}>
            <div className="space-y-4">
              <ValueProp
                icon={<Clock className="h-5 w-5" />}
                title="Fast SLA Response"
                text="We reply to every quote request within two business hours."
              />
              <ValueProp
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Itemized Proposals"
                text="Clear, transparent pricing breakdown — no hidden fees or surprise costs."
              />
              <ValueProp
                icon={<MapPin className="h-5 w-5" />}
                title="Nairobi Hub &amp; Global Standard"
                text="Based in Nairobi, Kenya, engineering platforms for Africa and worldwide."
              />
              <ValueProp
                icon={<Wifi className="h-5 w-5" />}
                title="Reliable Remote Delivery"
                text="We manage sprints remotely with transparent Jira/Trello boards and weekly demos."
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
              <div className="flex items-center gap-2 text-indigo-600">
                <Calculator className="h-5 w-5" />
                <span className="font-display text-sm font-bold text-slate-900">
                  How Our Proposal Works
                </span>
              </div>
              <ol className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px]">1</span>
                  Submit project details or select a package above.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px]">2</span>
                  We analyze system requirements, stack, and scope.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">3</span>
                  You receive an itemized proposal with deliverables, milestones &amp; SLAs.
                </li>
              </ol>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: '140ms' }}>
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm" noValidate>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Request a Custom Quote
              </h3>
              <p className="mt-1 text-xs text-slate-500 mb-6">
                Tell us about your architecture, goals, and timeline.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" required>
                  <input type="text" value={form.name} onChange={update('name')} placeholder="Your full name" className={inputClass} required />
                </Field>
                <Field label="Email" required>
                  <input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" className={inputClass} required />
                </Field>
                <Field label="Phone">
                  <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+254 7..." className={inputClass} />
                </Field>
                <Field label="Company">
                  <input type="text" value={form.company} onChange={update('company')} placeholder="Company name" className={inputClass} />
                </Field>
                <Field label="Service Required" required>
                  <select value={form.service} onChange={update('service')} className={inputClass} required>
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Estimated Budget (KSh)">
                  <input
                    type="text"
                    value={form.budget}
                    onChange={update('budget')}
                    placeholder="e.g. KSh 140,000"
                    className={inputClass}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Preferred Timeline">
                    <select value={form.timeline} onChange={update('timeline')} className={inputClass}>
                      <option value="">Select a timeline</option>
                      {timelines.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Project Description" required>
                    <textarea
                      value={form.description}
                      onChange={update('description')}
                      placeholder="Describe your project, objectives, technical requirements, or automation goals..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group mt-6 w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 shadow-md hover:shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Submitting Request...</>
                ) : (
                  <><Send className="h-4 w-4" /> <span>Submit Proposal Request</span> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                )}
              </button>

              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  Thank you! Your quote request has been received. Our Nairobi engineering team will send a tailored proposal within two hours.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-800">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
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
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs';

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
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
        {label}
        {required && <span className="text-rose-500"> *</span>}
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
    <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-indigo-300">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="font-display text-sm font-bold text-slate-900">{title}</span>
        <span className="mt-0.5 text-xs leading-relaxed text-slate-600">{text}</span>
      </div>
    </div>
  );
}
