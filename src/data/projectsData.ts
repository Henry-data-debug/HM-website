export type ProjectCategory =
  | 'Workflow & M-Pesa Automation'
  | 'Web & E-Commerce'
  | 'Data & BI Analytics'
  | 'SEO & Growth';

export interface ProjectTourStep {
  title: string;
  subtitle: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: ProjectCategory;
  sector: string;
  summary: string;
  outcomes: string[];
  gradient: string;
  iconName: 'workflow' | 'cart' | 'hospital' | 'chart' | 'nutrition' | 'growth';
  
  // 5 Guided Tour Cards
  tour: {
    // Card 1: Context & Snapshot (2x2 Micro-Grid)
    snapshot: {
      industry: string;
      timeline: string;
      problemSummary: string;
      coreDeliverable: string;
    };
    
    // Card 2: The Bottleneck (Max 3 concise bullet points)
    bottlenecks: string[];
    
    // Card 3: Solution & Architecture (Modular engineering blocks)
    architecture: {
      step: string;
      title: string;
      description: string;
    }[];
    
    // Card 4: Stack & Integrations (Tool tag pills)
    stack: {
      name: string;
      role: string;
    }[];
    
    // Card 5: Impact & Takeaways
    impact: {
      stat: string;
      label: string;
      detail: string;
    }[];
    keyTakeaway: string;
  };
}

export const categoryFilterOptions: (ProjectCategory | 'All')[] = [
  'All',
  'Workflow & M-Pesa Automation',
  'Web & E-Commerce',
  'Data & BI Analytics',
  'SEO & Growth',
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mpesa-property-automation',
    title: 'Safaricom M-Pesa & Zoho Property Automation Platform',
    category: 'Workflow & M-Pesa Automation',
    sector: 'Commercial Real Estate & Property Management',
    summary:
      'End-to-end tenant rent collection and automated utility reconciliation via Safaricom Daraja C2B/B2C API synced with Zoho CRM.',
    outcomes: ['Net-Zero Reconciliation Lag', '400+ Units Automated'],
    gradient: 'from-emerald-600 via-teal-700 to-slate-900',
    iconName: 'workflow',
    tour: {
      snapshot: {
        industry: 'Commercial & Residential Property Management',
        timeline: '6 Weeks to Production',
        problemSummary: 'Manual M-Pesa reconciliation across 400+ properties causing 3-day billing delays and dispute backlogs.',
        coreDeliverable: 'Safaricom Daraja API Webhooks, Zoho CRM Deal Mover & Tenant Receipting Engine',
      },
      bottlenecks: [
        'Over 400 monthly rent transfers manually matched from raw SMS notifications, causing 3-day reconciliation backlogs.',
        'Unreconciled water and electricity bills creating inaccurate ledger balances and landlord-tenant friction.',
        'Lack of real-time confirmation triggers causing property managers to spend 15+ hours weekly answering payment queries.',
      ],
      architecture: [
        {
          step: '01',
          title: 'Daraja STK Push & Webhook Gateway',
          description:
            'Engineered a resilient FastAPI listener handling Safaricom C2B/B2C callbacks with automatic idempotency in < 250ms.',
        },
        {
          step: '02',
          title: 'Zoho CRM & Finance Pipeline Sync',
          description:
            'Mapped tenant accounts to automate deal stage movements, invoice settlements, and official KRA eTIMS receipt generation.',
        },
        {
          step: '03',
          title: 'Automated Multi-Channel Client Ping',
          description:
            'Triggered instant tenant WhatsApp & SMS confirmation receipts with remaining balances and automated landlord ledger updates.',
        },
      ],
      stack: [
        { name: 'Safaricom Daraja API', role: 'Payment Gateway (C2B/B2C)' },
        { name: 'Zoho CRM & Creator', role: 'Tenant Lifecycle & Invoicing' },
        { name: 'Python & FastAPI', role: 'High-Concurrency Webhook Listener' },
        { name: 'PostgreSQL', role: 'Ledger Audit Database' },
        { name: 'Twilio & WhatsApp API', role: 'Instant Notification Triggers' },
        { name: 'React & Tailwind', role: 'Landlord Administrative Portal' },
      ],
      impact: [
        { stat: '85%', label: 'Admin Hours Saved', detail: 'Billing reconciliations dropped from 3 days to real-time.' },
        { stat: '0', label: 'Payment Discrepancies', detail: 'Net-zero ledger errors across 400+ managed rental units.' },
        { stat: '< 30s', label: 'Receipt Delivery', detail: 'Tenants receive verified WhatsApp receipts in seconds.' },
      ],
      keyTakeaway:
        'Eliminating manual payment reconciliation freed property teams to focus on tenant occupancy while guaranteeing 100% financial accuracy.',
    },
  },
  {
    slug: 'savannah-retail-ecommerce',
    title: 'Savannah Retail Multi-Vendor E-Commerce Platform',
    category: 'Web & E-Commerce',
    sector: 'Retail & Omnichannel Commerce',
    summary:
      'High-conversion headless e-commerce store with real-time stock sync, integrated M-Pesa one-click checkout, and automated courier dispatches.',
    outcomes: ['2.4x Revenue Surge', '< 42ms TTFB'],
    gradient: 'from-indigo-600 via-blue-700 to-slate-900',
    iconName: 'cart',
    tour: {
      snapshot: {
        industry: 'Omnichannel Fashion & Lifestyle Retail',
        timeline: '5 Weeks to Launch',
        problemSummary: 'Clunky 6-step checkout with 8-second mobile load times causing 68% mobile cart abandonment.',
        coreDeliverable: 'Headless Next.js Storefront, 1-Click M-Pesa STK Checkout & Real-Time POS Inventory Sync',
      },
      bottlenecks: [
        '68% mobile cart abandonment caused by friction-heavy checkout forms and manual bank transfers.',
        'Disconnected inventory systems causing customers to order stock already sold in brick-and-mortar stores.',
        'Legacy server latency (TTFB > 1.8s) hurting organic search visibility and mobile user experience.',
      ],
      architecture: [
        {
          step: '01',
          title: 'Edge-Rendered Headless Next.js Store',
          description:
            'Architected a lightning-fast frontend with edge caching and image optimization, dropping TTFB to 38ms.',
        },
        {
          step: '02',
          title: 'Friction-Free M-Pesa STK Push',
          description:
            'Embedded instantaneous phone number checkout prompting Safaricom PIN entry directly on customer mobile devices.',
        },
        {
          step: '03',
          title: 'Unified POS & Courier Dispatch Sync',
          description:
            'Bi-directional inventory sync between retail physical branches and automated waybill generation with local Nairobi couriers.',
        },
      ],
      stack: [
        { name: 'Next.js 14 & React', role: 'Edge-Rendered Headless Frontend' },
        { name: 'TypeScript', role: 'Type-Safe Architecture' },
        { name: 'Tailwind CSS', role: 'Responsive Mobile-First UI' },
        { name: 'Safaricom Daraja API', role: '1-Click STK Push Checkout' },
        { name: 'Redis Cache', role: 'Low-Latency Session & Cart State' },
        { name: 'PostgreSQL & Prisma', role: 'Order & Product Catalog DB' },
      ],
      impact: [
        { stat: '2.4x', label: 'Revenue Growth', detail: 'Total digital sales more than doubled in the first 90 days.' },
        { stat: '19%', label: 'Cart Abandonment', detail: 'Dropped from 68% down to 19% with instant M-Pesa checkout.' },
        { stat: '1.1s', label: 'Mobile LCP', detail: 'Achieved 100/100 Core Web Vitals score on mobile 4G networks.' },
      ],
      keyTakeaway:
        'Pairing sub-second page performance with native M-Pesa STK checkout converted casual Kenyan mobile browsers into instant paying customers.',
    },
  },
  {
    slug: 'highview-erp-system',
    title: 'Highview Hospital & School Management System',
    category: 'Workflow & M-Pesa Automation',
    sector: 'Education & Healthcare Administration',
    summary:
      'Modular cloud ERP system centralizing student fee collection, medical records, teacher grading, and automated parent communication.',
    outcomes: ['98% Fee Collection Automation', 'Centralized Records'],
    gradient: 'from-emerald-700 via-cyan-800 to-slate-900',
    iconName: 'hospital',
    tour: {
      snapshot: {
        industry: 'Private Education & Healthcare Services',
        timeline: '8 Weeks Agile Delivery',
        problemSummary: 'Manual bank slip reconciliation taking 10+ days at the start of every academic term, with paper record fragmentation.',
        coreDeliverable: 'Role-Based Cloud ERP Portal, Automated Fee Allocation & Instant WhatsApp Grade Cards',
      },
      bottlenecks: [
        'Manual bank slip and cash reconciliation consuming over 10 days of administrative staff time every school term.',
        'Paper record fragmentation causing delays in student medical histories and academic performance tracking.',
        'Lack of real-time balance visibility prompting fee disputes and high accounts-receivable arrears.',
      ],
      architecture: [
        {
          step: '01',
          title: 'Role-Based Cloud Architecture',
          description:
            'Engineered multi-tenant portals for Administrators, Doctors, Teachers, and Parents with enterprise RBAC security.',
        },
        {
          step: '02',
          title: 'Automated Account Reconciliation',
          description:
            'Integrated Daraja B2C/C2B endpoints automatically matching student admission numbers to incoming bank and M-Pesa payments.',
        },
        {
          step: '03',
          title: 'Real-Time WhatsApp Report Generator',
          description:
            'Automated grade computation and dynamic PDF generation dispatched directly to verified guardian phone numbers.',
        },
      ],
      stack: [
        { name: 'React & TypeScript', role: 'Multi-Role Administrative Portal' },
        { name: 'Node.js & Express', role: 'RESTful Backend Microservices' },
        { name: 'Microsoft Azure', role: 'HIPAA/FERPA-Compliant Cloud Hosting' },
        { name: 'Safaricom Daraja API', role: 'Automated Fee Allocation' },
        { name: 'PostgreSQL', role: 'Relational Student & Medical Records' },
      ],
      impact: [
        { stat: '< 30s', label: 'Fee Reconciliation', detail: 'Reduced from 10 manual days to instant automated ledger posting.' },
        { stat: '98%', label: 'On-Time Fee Rate', detail: 'Automated WhatsApp balance alerts accelerated term collections.' },
        { stat: '100%', label: 'Digital Transition', detail: 'Completely eliminated paper fee slips and physical grade cards.' },
      ],
      keyTakeaway:
        'Digitizing student and patient workflows while tying fees directly to automated Daraja reconciliation restored administrative order and operational liquidity.',
    },
  },
  {
    slug: 'supply-chain-bi-dashboard',
    title: 'Executive Financial & Supply Chain BI Dashboard',
    category: 'Data & BI Analytics',
    sector: 'Logistics & FMCG Distribution',
    summary:
      'Unified Power BI & Python analytics suite pulling warehouse data, fleet logistics, and sales performance into actionable executive KPI dashboards.',
    outcomes: ['+34.8% YoY Margins', 'Hourly Automated ETL Refresh'],
    gradient: 'from-sky-600 via-cyan-700 to-slate-900',
    iconName: 'chart',
    tour: {
      snapshot: {
        industry: 'East African Logistics & Regional FMCG Distribution',
        timeline: '4 Weeks to Production',
        problemSummary: 'Executives waited until the 15th of each month for financial reconciliations, while regional depots suffered silent stockouts.',
        coreDeliverable: 'Power BI Executive Cloud Dashboard, Automated Python ETL Pipeline & Real-Time Slack Margin Alerts',
      },
      bottlenecks: [
        'Leadership relied on monthly Excel spreadsheets compiled manually, causing decision latency of up to 3 weeks.',
        'Regional warehouse stockouts went undetected until customer orders were already delayed or cancelled.',
        'Cross-border freight expenses were roughly estimated rather than calculated with dynamic real-time fuel and driver costs.',
      ],
      architecture: [
        {
          step: '01',
          title: 'Multi-Source Python ETL Pipeline',
          description:
            'Engineered automated hourly data pipelines aggregating records from ERP systems, warehouse databases, and fleet GPS feeds.',
        },
        {
          step: '02',
          title: 'Power BI Enterprise Model',
          description:
            'Designed interactive executive dashboards with granular drill-downs across gross margin, route profitability, and stock turn rates.',
        },
        {
          step: '03',
          title: 'Automated Depletion Warning Bots',
          description:
            'Configured webhook alert triggers warning supply managers whenever fast-moving SKU buffers fall below 5 business days.',
        },
      ],
      stack: [
        { name: 'Microsoft Power BI', role: 'Executive Interactive Dashboards' },
        { name: 'Python & Pandas', role: 'Automated ETL & Data Cleansing' },
        { name: 'SQL Server', role: 'Centralized Analytical Data Warehouse' },
        { name: 'Azure Data Lake', role: 'Scalable Cloud Storage & Backups' },
        { name: 'FastAPI Webhooks', role: 'Real-Time Alert Dispatcher' },
      ],
      impact: [
        { stat: '< 1 hr', label: 'Decision Turnaround', detail: 'Reporting turnaround slashed from 15 days to under 60 minutes.' },
        { stat: '+34.8%', label: 'Margin Visibility', detail: 'Revealed unprofitable regional distribution routes immediately.' },
        { stat: '-40%', label: 'Depot Stockouts', detail: 'Proactive depletion warnings eliminated regional supply bottlenecks.' },
      ],
      keyTakeaway:
        'Replacing static monthly spreadsheets with an automated analytical data pipeline transformed supply chain management from reactive damage control to proactive optimization.',
    },
  },
  {
    slug: 'aura-wellness-ecommerce',
    title: 'Aura Nutrition & Wellness E-Commerce Platform',
    category: 'Web & E-Commerce',
    sector: 'Health, Wellness & Nutrition',
    summary:
      'Conversion-optimized e-commerce platform and subscription portal for East Africa’s leading wellness and nutritional supplement brand.',
    outcomes: ['3.1x Conversion Uplift', 'Instant WhatsApp Orders'],
    gradient: 'from-indigo-600 via-purple-700 to-slate-900',
    iconName: 'nutrition',
    tour: {
      snapshot: {
        industry: 'Health Supplements & Organic Wellness Retail',
        timeline: '4 Weeks to Launch',
        problemSummary: 'High bounce rate on legacy WooCommerce store with zero repeat subscription functionality for nutritional regimens.',
        coreDeliverable: 'Conversion-Engineered Headless Store, WhatsApp Instant Order Assist & Recurring Replenishment Engine',
      },
      bottlenecks: [
        'Slow, unoptimized mobile store with 70% bounce rates on standard 3G/4G connections across Nairobi and Mombasa.',
        'Customers were unable to set up recurring monthly deliveries, causing 75% drop-off after initial purchase.',
        'Absence of immediate customer consultation triggers during checkout leading to abandoned shopping carts.',
      ],
      architecture: [
        {
          step: '01',
          title: 'Next.js Ultra-Lean Mobile Storefront',
          description:
            'Implemented a lightweight, mobile-first design system with instant page transitions and sub-1.2s Largest Contentful Paint.',
        },
        {
          step: '02',
          title: 'One-Tap WhatsApp Order Assistant',
          description:
            'Created sticky product consultation buttons that pass selected items and dosages directly into WhatsApp customer care chats.',
        },
        {
          step: '03',
          title: 'Automated Replenishment Engine',
          description:
            'Designed automated SMS and email re-order prompts timed to customer supplement consumption cycles.',
        },
      ],
      stack: [
        { name: 'Next.js & React', role: 'High-Conversion Storefront' },
        { name: 'Tailwind CSS', role: 'Modern Responsive Design System' },
        { name: 'Safaricom Daraja API', role: 'M-Pesa STK Push Integration' },
        { name: 'Headless WooCommerce', role: 'Catalog & Order Management' },
        { name: 'Google Analytics 4', role: 'Enhanced E-Commerce Tracking' },
      ],
      impact: [
        { stat: '3.1x', label: 'Conversion Uplift', detail: 'Online conversion rate leaped from 0.8% to 2.5%.' },
        { stat: '42%', label: 'Repeat Customer Rate', detail: 'Automated cycle reminders drove predictable recurring orders.' },
        { stat: '< 1.2s', label: 'Mobile LCP', detail: 'Flawless loading experience on low-bandwidth mobile connections.' },
      ],
      keyTakeaway:
        'Combining a blazing-fast edge storefront with direct WhatsApp sales support turned skeptical first-time wellness buyers into recurring monthly subscribers.',
    },
  },
  {
    slug: 'full-funnel-seo-growth',
    title: 'Full-Funnel Organic SEO & Meta Ads Growth Engine',
    category: 'SEO & Growth',
    sector: 'Professional B2B Services & Hospitality',
    summary:
      'Technical SEO overhaul, semantic schema architecture, and high-conversion Meta/Google Ads campaign engineering tripling qualified inbound inquiries.',
    outcomes: ['4.8x Campaign ROAS', '#1 Nairobi Organic Rank'],
    gradient: 'from-amber-600 via-orange-700 to-slate-900',
    iconName: 'growth',
    tour: {
      snapshot: {
        industry: 'B2B Engineering, Real Estate & Hospitality',
        timeline: '8 Weeks Execution',
        problemSummary: 'Website was invisible to Google search crawlers due to client-side CSR, coupled with exorbitant cost-per-lead on generic ad campaigns.',
        coreDeliverable: 'Static HTML Pre-Rendering (SSG), JSON-LD Semantic Schema & Conversion-Targeted Meta Ads Engine',
      },
      bottlenecks: [
        'Marketing website delivered an empty <div id="root"> payload, preventing Google, Bing, and AI bots from indexing copy.',
        'High cost per qualified lead (KES 3,200+) on generic Google Ads campaigns with no conversion tracking.',
        'Disconnect between ad messaging and landing page copy causing 85% bounce rate on ad traffic.',
      ],
      architecture: [
        {
          step: '01',
          title: 'Static Pre-Rendering (SSG) Overhaul',
          description:
            'Re-architected build pipeline to pre-render full semantic HTML with route-specific meta tags and schema markup at build time.',
        },
        {
          step: '02',
          title: 'JSON-LD Structured Data Graph',
          description:
            'Injected complete ProfessionalService and Service schema graphs establishing clear entity relationships for search engines.',
        },
        {
          step: '03',
          title: 'Dedicated Conversion Funnels',
          description:
            'Engineered targeted, friction-free landing pages paired with granular Meta Pixel and Google Tag Manager conversion events.',
        },
      ],
      stack: [
        { name: 'Vite SSG Pre-Rendering', role: 'Static HTML Server Generation' },
        { name: 'JSON-LD Schema Markup', role: 'Search Engine Entity Graph' },
        { name: 'Google Tag Manager', role: 'Server-Side Event Tracking' },
        { name: 'Meta Ads Manager', role: 'Targeted Retargeting Funnels' },
        { name: 'Google Search Console', role: 'Indexing & Crawl Budget Optimization' },
      ],
      impact: [
        { stat: '4.8x', label: 'Ad Campaign ROAS', detail: 'Cost-per-qualified-lead dropped by 62% within 60 days.' },
        { stat: '#1', label: 'Google Organic Rank', detail: 'Dominated high-intent commercial keywords in Nairobi, Kenya.' },
        { stat: '100%', label: 'Crawl Indexation', detail: '100% of marketing routes indexed within 48 hours of launch.' },
      ],
      keyTakeaway:
        'Solving fundamental server-side crawlability and aligning ad campaigns with dedicated, high-intent landing pages delivered predictable, compounding B2B inquiries.',
    },
  },
];

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}
