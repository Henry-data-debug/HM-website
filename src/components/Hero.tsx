import { useEffect, useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Wifi,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Phone,
  MessageSquare,
  Code2,
  Workflow,
  BarChart3,
} from 'lucide-react';

const heroSlides = [
  {
    label: 'Platform Operations',
    src: '/hero/hero-platform-dashboard.jpg',
    alt: 'Executive cloud operations dashboard and M-Pesa automated transaction analytics at HM Technologies Nairobi',
  },
  {
    label: 'Engineering Studio',
    src: '/hero/software-engineering-studio.jpg',
    alt: 'Custom software, web applications and microservices engineering studio at HM Technologies',
  },
  {
    label: 'BI & Analytics',
    src: '/hero/data-analytics-bi.jpg',
    alt: 'Executive Power BI dashboards, ETL pipelines, and financial analytics at HM Technologies',
  },
  {
    label: 'M-Pesa Automation',
    src: '/hero/mpesa-automation-flow.jpg',
    alt: 'Safaricom M-Pesa Daraja STK Push and Zoho CRM automation workflow at HM Technologies',
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [systemTab, setSystemTab] = useState<'mpesa' | 'web' | 'data'>('mpesa');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="hero relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#090D16] py-16 lg:py-24"
    >
      {/* ── Ambient Radial Lighting & Precision Mesh ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1800}
            height={1200}
            className={`absolute inset-0 h-full w-full scale-[1.05] object-cover object-center blur-[2px] transition-[opacity,transform] duration-[1800ms] ease-in-out ${
              activeSlide === index ? 'scale-100 opacity-30' : 'scale-[1.04] opacity-0'
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : undefined}
          />
        ))}
        {/* Subtle radial ambient glow using Precision Indigo #4F46E5 & Cyan #06B6D4 */}
        <div className="absolute top-1/4 left-1/2 h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#4F46E5]/15 via-[#06B6D4]/12 to-transparent blur-[110px]" />
        <div className="absolute top-[35%] -left-[10%] h-[400px] w-[500px] rounded-full bg-[#4F46E5]/10 blur-[100px]" />
        <div className="absolute top-[25%] -right-[10%] h-[450px] w-[500px] rounded-full bg-[#06B6D4]/12 blur-[100px]" />
        {/* Faint architectural grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        {/* Bottom gradient fade into light transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#090D16] via-[#090D16]/80 to-transparent" />
      </div>

      {/* Floating particles */}
      <Particles />

      {/* ── Main Split Hero Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Column (7 cols): Commercial Intent Headline, Subtitle, Dual CTAs & Proof */}
          <div className="text-left lg:col-span-7">
            <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Nairobi Digital Engineering &amp; Automation Firm
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-electric-400" aria-hidden="true" />
                Nairobi, Kenya
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md">
                <Wifi className="h-3.5 w-3.5 text-ember-400" aria-hidden="true" />
                Global Online Delivery
              </span>
            </div>

            {/* Strict Single H1 with Primary Commercial Intent */}
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.12]">
              Custom Software Development,{' '}
              <span className="block text-gradient mt-1">
                Workflow Automation
              </span>
              <span className="block text-gradient-cyan mt-1">
                &amp; Data Analytics in Kenya
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              We engineer high-performance web platforms, automate business pipelines with Safaricom M-Pesa &amp; Zoho,
              and build executive BI dashboards for ambitious African enterprises.
            </p>

            {/* Dual CTAs: Phone, WhatsApp, and Proposal */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="tel:+254791371301"
                className="btn-primary group flex items-center gap-2 text-sm px-6 py-3.5 shadow-glow"
              >
                <Phone className="h-4 w-4" />
                <span>Call 0791371301</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/254791371301"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-emerald group flex items-center gap-2 text-sm px-6 py-3.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#quote"
                onClick={(e) => { e.preventDefault(); scrollTo('#quote'); }}
                className="btn-secondary text-sm px-5 py-3.5"
              >
                Request Proposal
              </a>
            </div>

            {/* Micro-trust indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 sm:gap-6">
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                &lt; 2h Response SLA
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                99.9% System Uptime
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <Zap className="h-4 w-4 text-amber-400" aria-hidden="true" />
                Transparent KSh Proposals
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 pt-6">
              {[
                { value: '400+', label: 'Units & Workflows' },
                { value: '50+', label: 'Delivered Systems' },
                { value: '99.9%', label: 'Platform Reliability' },
                { value: '3.2x', label: 'Average Client ROI' },
              ].map((m) => (
                <div key={m.label} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="font-display text-xl sm:text-2xl font-extrabold text-white text-gradient-cyan block">
                    {m.value}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Interactive System Preview Switcher */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-[#0F172A]/90 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Interactive Live Architecture
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">v2.4 Engine</span>
              </div>

              {/* System Switcher Tabs */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-2xl bg-[#090D16] p-1.5 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setSystemTab('mpesa')}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 font-semibold transition-all ${
                    systemTab === 'mpesa'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Workflow className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">M-Pesa &amp; Zoho</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSystemTab('web')}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 font-semibold transition-all ${
                    systemTab === 'web'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Web &amp; Portals</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSystemTab('data')}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-1 font-semibold transition-all ${
                    systemTab === 'data'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Data &amp; Growth</span>
                </button>
              </div>

              {/* Dynamic Interactive Tab Content */}
              <div className="mt-5 min-h-[310px]">
                {systemTab === 'mpesa' && (
                  <div className="space-y-3 animate-fadeIn">
                    {/* Visual Preview Thumbnail */}
                    <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-emerald-500/30">
                      <img
                        src="/hero/mpesa-automation-flow.jpg"
                        alt="Safaricom M-Pesa Daraja API and Zoho CRM automated pipeline"
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          Daraja STK &rarr; Zoho CRM Auto-Sync
                        </span>
                        <span className="text-[10px] font-mono text-emerald-200 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/40">
                          200 OK (34ms)
                        </span>
                      </div>
                    </div>

                    {/* Live STK Push Banner */}
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 font-bold text-emerald-300">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">✓</span>
                          M-Pesa STK Push Confirmed
                        </span>
                        <span className="font-mono text-xs font-bold text-white">KES 48,500.00</span>
                      </div>
                    </div>

                    {/* Stat pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                        <span className="text-[10px] text-slate-400 uppercase">Automation Rate</span>
                        <p className="mt-0.5 font-bold text-white">100% Touchless</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                        <span className="text-[10px] text-slate-400 uppercase">Error Reduction</span>
                        <p className="mt-0.5 font-bold text-emerald-400">-99.4% Discrepancies</p>
                      </div>
                    </div>
                  </div>
                )}

                {systemTab === 'web' && (
                  <div className="space-y-3 animate-fadeIn">
                    {/* Visual Preview Thumbnail */}
                    <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-indigo-500/30">
                      <img
                        src="/hero/software-engineering-studio.jpg"
                        alt="Custom software engineering and microservices studio"
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                          React, Next.js &amp; FastAPI
                        </span>
                        <span className="text-[10px] font-mono text-indigo-200 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-500/40">
                          TTFB 36ms
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                        <span className="text-[10px] text-slate-400 uppercase">Core Web Vitals</span>
                        <p className="mt-0.5 font-bold text-emerald-400">100 / 100 Mobile</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                        <span className="text-[10px] text-slate-400 uppercase">Architecture</span>
                        <p className="mt-0.5 font-bold text-indigo-300">Microservices &amp; Edge</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#090D16] p-2.5 text-xs flex items-center justify-between">
                      <span className="text-slate-400">Database Engine:</span>
                      <span className="font-semibold text-white">PostgreSQL &amp; Redis Cache</span>
                    </div>
                  </div>
                )}

                {systemTab === 'data' && (
                  <div className="space-y-3 animate-fadeIn">
                    {/* Visual Preview Thumbnail */}
                    <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-sky-500/30">
                      <img
                        src="/hero/data-analytics-bi.jpg"
                        alt="Executive business intelligence dashboards and predictive revenue analytics"
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
                        <span className="font-semibold text-sky-300 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                          Power BI &amp; Python ETL Pipeline
                        </span>
                        <span className="text-[10px] font-mono text-emerald-300 bg-sky-950/70 px-2 py-0.5 rounded border border-sky-500/40">
                          +34.8% Growth
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5">
                        <span className="text-[10px] text-amber-300 uppercase font-semibold">Campaign ROAS</span>
                        <p className="mt-0.5 font-bold text-white">4.8x Efficiency</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                        <span className="text-[10px] text-slate-400 uppercase">Reporting Lag</span>
                        <p className="mt-0.5 font-bold text-emerald-400">&lt; 1 Hour Turnaround</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#090D16] p-2.5 text-xs flex items-center justify-between">
                      <span className="text-slate-400">ETL Pipeline Sync:</span>
                      <span className="font-semibold text-sky-300">Hourly Automated Snapshot</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Particles() {
  const ps = [
    { left: '8%',  top: '22%', s: 3, d: '0s',   dur: '7s'  },
    { left: '22%', top: '65%', s: 2, d: '1.2s', dur: '9s'  },
    { left: '38%', top: '18%', s: 4, d: '2s',   dur: '8s'  },
    { left: '58%', top: '78%', s: 2, d: '0.5s', dur: '10s' },
    { left: '72%', top: '14%', s: 3, d: '1.5s', dur: '7.5s'},
    { left: '84%', top: '55%', s: 2, d: '2.5s', dur: '9s'  },
    { left: '92%', top: '28%', s: 4, d: '0.8s', dur: '8.5s'},
    { left: '14%', top: '85%', s: 2, d: '1.8s', dur: '10s' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {ps.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan-400/40 animate-float"
          style={{
            left: p.left, top: p.top,
            width: p.s, height: p.s,
            animationDelay: p.d,
            animationDuration: p.dur,
            boxShadow: '0 0 8px rgba(6,182,212,0.6)',
          }}
        />
      ))}
    </div>
  );
}
