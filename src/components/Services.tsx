import { useState } from 'react';
import {
  Workflow,
  Code2,
  BarChart3,
  Megaphone,
  Headphones,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  ArrowRight
} from 'lucide-react';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function Services() {
  const ref = useRevealGroup<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<'all' | 'engineering' | 'data' | 'growth'>('all');

  const scrollToQuote = (serviceName?: string) => {
    const quoteEl = document.querySelector('#quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
      if (serviceName) {
        window.dispatchEvent(new CustomEvent('select-service', { detail: serviceName }));
      }
    }
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-[#0B1120]">
      {/* Background ambient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/10 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Solutions & Capabilities"
            title="Interactive Bento Architecture"
            description="Enterprise-grade technology solutions designed to automate workflows, accelerate revenue, and build unbreakable digital infrastructure."
            align="left"
          />

          {/* Solution Filters */}
          <div className="reveal flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-1.5 backdrop-blur-md self-start md:self-auto">
            {[
              { id: 'all', label: 'All Solutions' },
              { id: 'engineering', label: 'Systems & Web' },
              { id: 'data', label: 'Data & Cloud' },
              { id: 'growth', label: 'Marketing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Systems Architecture & Business Automation (Featured Large Bento Card - 2 Columns on LG) */}
          {(activeTab === 'all' || activeTab === 'engineering') && (
            <div className="reveal bento-card p-5 sm:p-6 lg:col-span-2 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-500 text-white shadow-glow">
                      <Workflow className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                        Enterprise Core
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white">
                        Systems Architecture & Automation
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => scrollToQuote('Business Automation')}
                    className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400 hover:text-white"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-300 max-w-2xl">
                  Eliminate repetitive manual bottlenecks and unite disparate systems. We design end-to-end automated pipelines,
                  custom Zoho CRM architectures, Power Automate flows, and API integrations that run 24/7 without fail.
                </p>

                {/* Interactive Workflow Visualizer Simulation */}
                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#070D1A]/80 p-4 sm:p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                      Live Automation Engine
                    </span>
                    <span className="text-emerald-400 font-semibold">Zero-Downtime Pipeline</span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                      <span className="text-[10px] text-cyan-300 font-bold uppercase">Step 01</span>
                      <p className="mt-1 font-semibold text-white">Inbound Lead / Webhook</p>
                      <span className="mt-1 block text-[11px] text-slate-400">Instant Event Capture</span>
                    </div>
                    <div className="rounded-xl border border-electric-500/30 bg-electric-500/10 p-3">
                      <span className="text-[10px] text-electric-300 font-bold uppercase">Step 02</span>
                      <p className="mt-1 font-semibold text-white">API Transformation</p>
                      <span className="mt-1 block text-[11px] text-slate-400">Data Sanitization</span>
                    </div>
                    <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3">
                      <span className="text-[10px] text-indigo-300 font-bold uppercase">Step 03</span>
                      <p className="mt-1 font-semibold text-white">Zoho CRM & ERP Sync</p>
                      <span className="mt-1 block text-[11px] text-slate-400">Automated Pipeline Update</span>
                    </div>
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                      <span className="text-[10px] text-emerald-300 font-bold uppercase">Step 04</span>
                      <p className="mt-1 font-semibold text-white">Instant Client Ping</p>
                      <span className="mt-1 block text-[11px] text-slate-400">WhatsApp & Email Alerts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.08]">
                <div className="flex flex-wrap gap-2">
                  {['Zoho CRM & Creator', 'Power Automate', 'SharePoint Solutions', 'Custom Webhooks', 'ERP Integrations'].map((tag) => (
                    <span key={tag} className="rounded-lg bg-white/[0.05] border border-white/[0.06] px-2.5 py-1 text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => scrollToQuote('Business Automation')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Configure Automation <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Software & Web Development */}
          {(activeTab === 'all' || activeTab === 'engineering') && (
            <div className="reveal bento-card p-5 sm:p-6 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-600 to-indigo-600 text-white shadow-glow">
                    <Code2 className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 uppercase">
                    React & Next.js
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  Software & Web Development
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  Custom web applications, responsive customer portals, and high-performance corporate sites built with modern frameworks and robust APIs.
                </p>

                {/* Tech Highlights */}
                <div className="mt-5 space-y-2">
                  {[
                    'Full-Stack Web Applications (React, Next.js)',
                    'Custom ERP, School & Hospital Systems',
                    'Headless CMS & High-Conversion E-commerce',
                    'High-Security RESTful & GraphQL APIs',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <span className="min-w-0 text-xs font-medium text-slate-400">99.9% Uptime Guarantee</span>
                <button
                  onClick={() => scrollToQuote('Website Development')}
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Build Software <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Data Analytics & Business Intelligence */}
          {(activeTab === 'all' || activeTab === 'data') && (
            <div className="reveal bento-card p-5 sm:p-6 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-500 to-amber-600 text-white shadow-glow-ember">
                    <BarChart3 className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-ember-500/10 border border-ember-500/20 px-2.5 py-1 text-[10px] font-bold text-ember-400 uppercase">
                    Power BI & Python
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  Data Analytics & Intelligence
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  Turn complex operational and financial data into interactive dashboards that give leaders instant clarity and predictive foresight.
                </p>

                {/* Live Metric Simulation Pill */}
                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#070D1A]/90 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Revenue Tracking</span>
                    <span className="font-bold text-emerald-400">+34.8% YoY</span>
                  </div>
                  <div className="mt-2.5 flex items-end gap-1.5 h-8">
                    {[40, 55, 38, 70, 65, 85, 78, 95].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-ember-500 to-amber-400 opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <span className="min-w-0 text-xs font-medium text-slate-400">Dashboards & Forecasting</span>
                <button
                  onClick={() => scrollToQuote('Data Analytics & Business Intelligence')}
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-ember-400 hover:text-ember-300"
                >
                  View Dashboards <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 4: Digital Marketing & Customer Acquisition */}
          {(activeTab === 'all' || activeTab === 'growth') && (
            <div className="reveal bento-card p-5 sm:p-6 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-glow-cyan">
                    <Megaphone className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-[10px] font-bold text-cyan-300 uppercase">
                    Paid Ads & SEO
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  Digital Marketing & Acquisition
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  Data-driven multi-channel marketing campaigns that systematically lower acquisition costs and increase qualified customer inquiries.
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    'Targeted Google & Meta Paid Ad Campaigns',
                    'Technical & Content SEO Growth Engine',
                    'Conversion-Optimized Landing Page Design',
                    'Automated Email Nurture Sequences',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <span className="min-w-0 text-xs font-medium text-slate-400">High-Converting Funnels</span>
                <button
                  onClick={() => scrollToQuote('Digital Marketing')}
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Scale Acquisition <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 5: Enterprise IT Infrastructure & Cloud */}
          {(activeTab === 'all' || activeTab === 'data') && (
            <div className="reveal bento-card p-5 sm:p-6 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-glow">
                    <Headphones className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-[10px] font-bold text-indigo-300 uppercase">
                    Azure & M365
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  Enterprise Cloud & IT Support
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  Dependable infrastructure, network security, and on-demand technical engineering ensuring your business operations never miss a beat.
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    'Microsoft 365 & Active Directory Administration',
                    'Cloud Migration & Scalable Azure Backups',
                    'Network Security & Disaster Recovery',
                    'Rapid Response Helpdesk & Hardware Care',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <span className="min-w-0 text-xs font-medium text-slate-400">SLA-Backed Support</span>
                <button
                  onClick={() => scrollToQuote('IT Support')}
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  Explore Support <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
