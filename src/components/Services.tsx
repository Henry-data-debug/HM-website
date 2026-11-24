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
  ArrowRight,
  Zap,
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
    <section id="services" className="section-padding relative overflow-hidden bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Solutions &amp; Capabilities"
            title="Software, Automation &amp; Growth Services"
            description="Enterprise-grade technology solutions designed to automate workflows, accelerate revenue, and build unbreakable digital infrastructure."
            align="left"
            theme="light"
          />

          {/* Solution Filters */}
          <div className="reveal flex flex-wrap gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xs self-start md:self-auto">
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
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── ASYMMETRIC 12-COLUMN BENTO GRID ── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

          {/* Card 1: Business Process, Zoho & M-Pesa Automation (Featured Large Bento Card - 7 Columns on LG) */}
          {(activeTab === 'all' || activeTab === 'engineering') && (
            <div className="reveal bento-card-light p-6 sm:p-8 lg:col-span-7 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm">
                      <Workflow className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        <Zap className="h-3 w-3" />
                        Automation &amp; Fintech Pillar
                      </span>
                      <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                        Business Process, Zoho &amp; M-Pesa Automation
                      </h3>
                    </div>
                  </div>
                  <a
                    href="#quote"
                    onClick={(e) => { e.preventDefault(); scrollToQuote('Business Automation'); }}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-500 hover:text-emerald-700"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-2xl">
                  Eliminate repetitive manual bottlenecks and unite disparate systems. We design end-to-end automated pipelines,
                  custom Zoho CRM architectures, Power Automate flows, and Safaricom Daraja API integrations that run 24/7 without fail.
                </p>

                {/* Miniature UI Preview: Live M-Pesa STK Push & CRM Pipeline Simulation */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 sm:p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                      Live Automation Pipeline
                    </span>
                    <span className="text-emerald-700 font-semibold">Zero-Downtime Engine</span>
                  </div>

                  {/* Mock M-Pesa STK Push Confirmation Banner */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white border border-emerald-200 px-3.5 py-2.5 shadow-xs">
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-[10px]">
                        ✓
                      </span>
                      <span className="font-semibold text-slate-900">M-Pesa STK Push Confirmed</span>
                      <span className="font-mono text-emerald-700 font-bold">• KES 48,500.00</span>
                    </div>
                    <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Daraja B2C/C2B
                    </span>
                  </div>

                  {/* 4 Pipeline Nodes */}
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Step 01</span>
                      <p className="mt-0.5 font-semibold text-slate-800 text-[11px]">Inbound Event</p>
                      <span className="block text-[10px] text-slate-500">M-Pesa / Webhook</span>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                      <span className="text-[10px] text-indigo-500 font-bold uppercase">Step 02</span>
                      <p className="mt-0.5 font-semibold text-slate-800 text-[11px]">API Validation</p>
                      <span className="block text-[10px] text-slate-500">FastAPI Pipeline</span>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
                      <span className="text-[10px] text-emerald-600 font-bold uppercase">Step 03</span>
                      <p className="mt-0.5 font-semibold text-slate-800 text-[11px]">Zoho CRM Sync</p>
                      <span className="block text-[10px] text-slate-500">Pipeline Auto-Move</span>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5 shadow-2xs">
                      <span className="text-[10px] text-emerald-700 font-bold uppercase">Step 04</span>
                      <p className="mt-0.5 font-semibold text-emerald-950 text-[11px]">Client Alerts</p>
                      <span className="block text-[10px] text-emerald-700">Instant WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-200/80">
                <div className="flex flex-wrap gap-2">
                  {['Zoho CRM & Creator', 'Power Automate', 'Safaricom Daraja API', 'Custom Webhooks', 'ERP Integration'].map((tag) => (
                    <span key={tag} className="rounded-lg bg-slate-100 border border-slate-200/80 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#quote"
                  onClick={(e) => { e.preventDefault(); scrollToQuote('Business Automation'); }}
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Configure Automation <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* Card 2: Custom Web & App Engineering (5 Columns on LG) */}
          {(activeTab === 'all' || activeTab === 'engineering') && (
            <div className="reveal bento-card-light p-6 sm:p-8 lg:col-span-5 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm">
                    <Code2 className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                    Engineering Pillar
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Custom Web &amp; App Engineering
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  Custom web applications, responsive customer portals, and high-performance corporate sites built with modern frameworks and robust APIs.
                </p>

                {/* Stylized IDE / Performance Mini Preview */}
                <div className="mt-5 rounded-2xl border border-slate-800 bg-[#0A0F1D] p-4 text-xs font-mono text-slate-300 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="ml-2 font-sans font-medium text-slate-400">PortalDashboard.tsx</span>
                    </div>
                    <span className="font-sans text-[10px] font-semibold text-emerald-400">TTFB &lt; 38ms</span>
                  </div>
                  <div className="space-y-1 text-[11px] leading-relaxed">
                    <div><span className="text-indigo-400">const</span> app = <span className="text-cyan-300">createPlatform</span>(&#123;</div>
                    <div className="pl-3 text-slate-400">framework: <span className="text-emerald-300">'Next.js'</span>, uptime: <span className="text-sky-300">99.98%</span></div>
                    <div>&#125;);</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-5 space-y-2">
                  {[
                    'Full-Stack Web Applications (React, Next.js, Node.js)',
                    'Custom ERP, School & Hospital Systems',
                    'High-Security RESTful & GraphQL APIs',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-5">
                <span className="text-xs font-semibold text-slate-500">99.9% Uptime Guarantee</span>
                <a
                  href="#quote"
                  onClick={(e) => { e.preventDefault(); scrollToQuote('Website Development'); }}
                  className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Build Software <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* Card 3: Data Analytics & Business Intelligence (4 Columns on LG when all, 6 Columns when data) */}
          {(activeTab === 'all' || activeTab === 'data') && (
            <div className={`reveal bento-card-light p-6 sm:p-7 ${activeTab === 'data' ? 'lg:col-span-6' : 'lg:col-span-4'} group flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 shadow-sm">
                    <BarChart3 className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-sky-50 border border-sky-200 px-2.5 py-1 text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                    BI &amp; Data Pillar
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-slate-900">
                  Data Science &amp; BI Analytics
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Turn complex operational and financial data into interactive Power BI and Python dashboards that give leaders predictive foresight.
                </p>

                {/* Live Metric Simulation Pill */}
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Monthly Revenue Stream</span>
                    <span className="font-bold text-emerald-600">+34.8% YoY</span>
                  </div>
                  <div className="mt-3 flex items-end gap-1.5 h-10">
                    {[40, 55, 38, 70, 65, 85, 78, 95].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-sky-500 to-cyan-400 transition-opacity hover:opacity-100 opacity-85"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-5">
                <span className="text-xs font-medium text-slate-500">Dashboards &amp; Forecasting</span>
                <a
                  href="#quote"
                  onClick={(e) => { e.preventDefault(); scrollToQuote('Data Analytics & Business Intelligence'); }}
                  className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  View Dashboards <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* Card 4: Performance Digital Marketing & SEO (4 Columns on LG when all, 8 Columns centered when growth) */}
          {(activeTab === 'all' || activeTab === 'growth') && (
            <div className={`reveal bento-card-light p-6 sm:p-7 ${activeTab === 'growth' ? 'lg:col-span-8 lg:col-start-3' : 'lg:col-span-4'} group flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-sm">
                    <Megaphone className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                    Growth Pillar
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-slate-900">
                  Performance Marketing &amp; SEO
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Data-driven multi-channel marketing campaigns and technical SEO architecture that systematically lower customer acquisition costs.
                </p>

                {/* ROAS & SEO Mini Preview */}
                <div className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-900">Campaign Efficiency</span>
                    <span className="rounded-full bg-amber-200/70 px-2 py-0.5 text-[10px] font-bold text-amber-900">4.8x ROAS</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-amber-800">
                    <span>Google Organic Rank</span>
                    <span className="font-bold text-slate-900">#1 Nairobi Keywords</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-5">
                <span className="text-xs font-medium text-slate-500">High-Converting Funnels</span>
                <a
                  href="#quote"
                  onClick={(e) => { e.preventDefault(); scrollToQuote('Digital Marketing'); }}
                  className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
                >
                  Scale Acquisition <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* Card 5: Enterprise Cloud & IT Support (4 Columns on LG when all, 6 Columns when data) */}
          {(activeTab === 'all' || activeTab === 'data') && (
            <div className={`reveal bento-card-light p-6 sm:p-7 ${activeTab === 'data' ? 'lg:col-span-6' : 'lg:col-span-4'} group flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm">
                    <Headphones className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                    Cloud &amp; SLA
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-slate-900">
                  Enterprise Cloud &amp; IT Support
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Dependable infrastructure, network security, and on-demand technical engineering ensuring your business operations never miss a beat.
                </p>

                {/* Cloud SLA Monitor Mini Preview */}
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Azure &amp; M365 Health</span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> 100% Operational
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Active Directory • Backups</span>
                    <span className="font-semibold text-slate-700">&lt; 2h SLA</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-5">
                <span className="text-xs font-medium text-slate-500">SLA-Backed Support</span>
                <a
                  href="#quote"
                  onClick={(e) => { e.preventDefault(); scrollToQuote('IT Support'); }}
                  className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Explore Support <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
