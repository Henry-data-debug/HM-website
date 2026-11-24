import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://hmtechnologies.co.ke').replace(/\/+$/, '');

const routes = [
  {
    path: '/',
    title: 'HM Technologies | Software, Automation & Growth Kenya',
    description:
      'Scale your business with HM Technologies. Nairobi experts in custom software, workflow automation, data analytics, and digital marketing. Request a quote.',
    keywords:
      'HM Technologies, custom software development Kenya, business workflow automation Nairobi, data analytics Power BI, digital marketing Nairobi, enterprise IT support, ERP systems Kenya',
    canonical: `${SITE_URL}/`,
    ogTitle: 'HM Technologies | Software, Automation & Growth Kenya',
    ogDescription:
      'Scale your business with HM Technologies. Nairobi experts in custom software, workflow automation, data analytics, and digital marketing. Request a quote.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'HM Technologies software engineering and automation team workspace in Nairobi, Kenya',
    ogType: 'website',
  },
  {
    path: '/about',
    title: 'About HM Technologies | Tech Partner in Nairobi, Kenya',
    description:
      "Learn about HM Technologies, Nairobi's trusted technology partner delivering custom software, operations automation, and data analytics across East Africa.",
    keywords:
      'about HM Technologies, technology partner Nairobi, software engineering Kenya, digital transformation Africa, IT consultants Nairobi',
    canonical: `${SITE_URL}/about`,
    ogTitle: 'About HM Technologies | Tech Partner in Nairobi, Kenya',
    ogDescription:
      "Learn about HM Technologies, Nairobi's trusted technology partner delivering custom software, operations automation, and data analytics across East Africa.",
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'About HM Technologies team and engineering culture in Nairobi',
    ogType: 'website',
  },
  {
    path: '/services',
    title: 'Services | Custom Software, Automation & IT Support',
    description:
      'Explore technology services from HM Technologies: bespoke software, business automation, Power BI analytics, digital marketing, and enterprise IT support.',
    keywords:
      'software development services Kenya, workflow automation Zoho Power Automate, data analytics dashboards Nairobi, digital marketing SEO, IT support services',
    canonical: `${SITE_URL}/services`,
    ogTitle: 'Services | Custom Software, Automation & IT Support',
    ogDescription:
      'Explore technology services from HM Technologies: bespoke software, business automation, Power BI analytics, digital marketing, and enterprise IT support.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'HM Technologies technology capabilities and services in Kenya',
    ogType: 'website',
  },
  {
    path: '/projects',
    title: 'Case Studies & Projects | HM Technologies Nairobi Kenya',
    description:
      'Explore case studies and software delivered by HM Technologies in Nairobi, from inventory management to business dashboards and e-commerce platforms.',
    keywords:
      'HM Technologies case studies, software portfolio Nairobi, inventory system Kenya, school management system, e-commerce web platform',
    canonical: `${SITE_URL}/projects`,
    ogTitle: 'Case Studies & Projects | HM Technologies Nairobi Kenya',
    ogDescription:
      'Explore case studies and software delivered by HM Technologies in Nairobi, from inventory management to business dashboards and e-commerce platforms.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'Selected projects and client success stories by HM Technologies',
    ogType: 'website',
  },
  {
    path: '/projects/mpesa-property-automation',
    title: 'M-Pesa & Zoho Property Automation Case Study | HM Technologies',
    description:
      'Explore how HM Technologies automated tenant rent collection, utility reconciliations, and Zoho CRM workflows for 400+ properties in Nairobi.',
    keywords:
      'M-Pesa property automation, Daraja API integration Nairobi, Zoho CRM property management, rent collection automation Kenya',
    canonical: `${SITE_URL}/projects/mpesa-property-automation`,
    ogTitle: 'M-Pesa & Zoho Property Automation Case Study | HM Technologies',
    ogDescription:
      'Explore how HM Technologies automated tenant rent collection, utility reconciliations, and Zoho CRM workflows for 400+ properties in Nairobi.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'M-Pesa and Zoho property automation platform case study',
    ogType: 'article',
  },
  {
    path: '/projects/savannah-retail-ecommerce',
    title: 'Savannah Retail E-Commerce Case Study | HM Technologies',
    description:
      'Discover how HM Technologies engineered a headless Next.js e-commerce store with M-Pesa one-click checkout, doubling client digital sales.',
    keywords:
      'Next.js ecommerce Nairobi, M-Pesa checkout integration, headless commerce Kenya, Savannah Retail case study',
    canonical: `${SITE_URL}/projects/savannah-retail-ecommerce`,
    ogTitle: 'Savannah Retail E-Commerce Case Study | HM Technologies',
    ogDescription:
      'Discover how HM Technologies engineered a headless Next.js e-commerce store with M-Pesa one-click checkout, doubling client digital sales.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'Savannah Retail ecommerce store case study',
    ogType: 'article',
  },
  {
    path: '/projects/highview-erp-system',
    title: 'Highview ERP & Fee Automation Case Study | HM Technologies',
    description:
      'See how HM Technologies built a modular cloud ERP system centralizing student fee collection and medical records with 98% automation.',
    keywords:
      'school ERP system Kenya, fee collection automation M-Pesa, hospital management system Nairobi, Highview case study',
    canonical: `${SITE_URL}/projects/highview-erp-system`,
    ogTitle: 'Highview ERP & Fee Automation Case Study | HM Technologies',
    ogDescription:
      'See how HM Technologies built a modular cloud ERP system centralizing student fee collection and medical records with 98% automation.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'Highview ERP and fee automation case study',
    ogType: 'article',
  },
  {
    path: '/projects/supply-chain-bi-dashboard',
    title: 'Supply Chain BI Dashboard Case Study | HM Technologies',
    description:
      'Learn how HM Technologies engineered automated Power BI & Python analytics dashboards, cutting decision turnaround from 15 days to under 1 hour.',
    keywords:
      'Power BI supply chain Nairobi, Python ETL dashboards Kenya, logistics analytics, business intelligence Nairobi',
    canonical: `${SITE_URL}/projects/supply-chain-bi-dashboard`,
    ogTitle: 'Supply Chain BI Dashboard Case Study | HM Technologies',
    ogDescription:
      'Learn how HM Technologies engineered automated Power BI & Python analytics dashboards, cutting decision turnaround from 15 days to under 1 hour.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'Supply chain BI dashboard case study',
    ogType: 'article',
  },
  {
    path: '/projects/aura-wellness-ecommerce',
    title: 'Aura Wellness Store Case Study | HM Technologies',
    description:
      'How HM Technologies delivered a 3.1x conversion uplift and repeat subscription portal for East Africa’s top wellness nutrition brand.',
    keywords:
      'wellness ecommerce Kenya, headless WooCommerce, WhatsApp order assist, Aura nutrition case study',
    canonical: `${SITE_URL}/projects/aura-wellness-ecommerce`,
    ogTitle: 'Aura Wellness Store Case Study | HM Technologies',
    ogDescription:
      'How HM Technologies delivered a 3.1x conversion uplift and repeat subscription portal for East Africa’s top wellness nutrition brand.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'Aura wellness store case study',
    ogType: 'article',
  },
  {
    path: '/projects/full-funnel-seo-growth',
    title: 'Full-Funnel Technical SEO Case Study | HM Technologies',
    description:
      'How HM Technologies solved client-side rendering with static SSG and engineered Meta Ads funnels delivering a 4.8x campaign ROAS.',
    keywords:
      'technical SEO case study Kenya, static pre-rendering SSG, Meta ads performance Nairobi, search engine marketing',
    canonical: `${SITE_URL}/projects/full-funnel-seo-growth`,
    ogTitle: 'Full-Funnel Technical SEO Case Study | HM Technologies',
    ogDescription:
      'How HM Technologies solved client-side rendering with static SSG and engineered Meta Ads funnels delivering a 4.8x campaign ROAS.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'Full funnel SEO and growth case study',
    ogType: 'article',
  },
];

function buildJsonLd(route) {
  const currentCanonical = route.canonical;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': `${SITE_URL}/#organization`,
        name: 'HM Technologies',
        alternateName: 'HM Tech Kenya',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.svg`,
          width: '512',
          height: '512',
        },
        image: `${SITE_URL}/hero/software-web.webp`,
        description:
          'Nairobi-based technology engineering firm specializing in custom software development, business workflow automation, data analytics, and digital marketing.',
        telephone: '+254791371301',
        email: 'info@hmtechnologies.co.ke',
        priceRange: '$$',
        currenciesAccepted: 'KES, USD',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer, M-Pesa',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Nairobi',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi County',
          addressCountry: 'KE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -1.286389,
          longitude: 36.817223,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '13:00',
          },
        ],
        areaServed: [
          {
            '@type': 'Country',
            name: 'Kenya',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'East Africa',
          },
        ],
        sameAs: [
          'https://twitter.com',
          'https://www.linkedin.com',
          'https://github.com',
          'https://www.facebook.com',
          'https://www.instagram.com',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'HM Technologies',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': `${currentCanonical}#webpage`,
        url: currentCanonical,
        name: route.title,
        description: route.description,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en',
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-software`,
        serviceType: 'Custom Software Development',
        name: 'Software & System Development',
        description:
          'Custom business systems, ERP, CRM, school and hospital management platforms engineered to streamline operations and centralize business data.',
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-automation`,
        serviceType: 'Business Workflow Automation',
        name: 'Business Automation & Architecture',
        description:
          'End-to-end automated pipelines, Zoho CRM integrations, Power Automate workflows, and API architectures eliminating manual bottlenecks.',
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-analytics`,
        serviceType: 'Data Analytics & Business Intelligence',
        name: 'Data Analytics & Reporting',
        description:
          'Turn raw business data into actionable decisions with Power BI dashboards, Python analytics, data visualization, and predictive forecasting.',
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-marketing`,
        serviceType: 'Digital Marketing',
        name: 'Digital Marketing & Growth',
        description:
          'Data-driven search engine optimization (SEO), Google Ads, Meta Ads, and content marketing engineered to lower acquisition costs and scale revenue.',
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
    ],
  };
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function prerender() {
  console.log('🚀 Starting Static Pre-Rendering (SSG) for HM Technologies...');

  // 1. Build SSR bundle
  const serverOutDir = path.resolve(rootDir, 'dist/server');
  await build({
    root: rootDir,
    build: {
      ssr: path.resolve(rootDir, 'src/entry-server.tsx'),
      outDir: serverOutDir,
      emptyOutDir: true,
      minify: false,
    },
    configFile: path.resolve(rootDir, 'vite.config.ts'),
  });

  const entryPath = path.resolve(serverOutDir, 'entry-server.js');
  const { render } = await import(pathToFileURL(entryPath).href);

  // 2. Read base index.html template from dist/
  const templatePath = path.resolve(rootDir, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html does not exist! Run "vite build" first.');
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 3. Pre-render each route
  for (const route of routes) {
    console.log(`  ⚡ Pre-rendering route: ${route.path}`);
    const { html: appHtml } = render(route.path);
    const jsonLd = buildJsonLd(route);

    let pageHtml = template;

    // Update <title>
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(route.title)}</title>`);

    // Update Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']description["'][\s\S]*?>/i,
      `<meta name="description" content="${escapeAttr(route.description)}" />`
    );

    // Update Meta Keywords
    if (pageHtml.match(/<meta\s+name=["']keywords["']/i)) {
      pageHtml = pageHtml.replace(
        /<meta\s+name=["']keywords["'][\s\S]*?>/i,
        `<meta name="keywords" content="${escapeAttr(route.keywords)}" />`
      );
    } else {
      pageHtml = pageHtml.replace(
        '</head>',
        `    <meta name="keywords" content="${escapeAttr(route.keywords)}" />\n  </head>`
      );
    }

    // Update Canonical URL
    pageHtml = pageHtml.replace(
      /<link\s+rel=["']canonical["'][\s\S]*?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // Update Open Graph tags
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:url["'][\s\S]*?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:title["'][\s\S]*?>/i,
      `<meta property="og:title" content="${escapeAttr(route.ogTitle)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:description["'][\s\S]*?>/i,
      `<meta property="og:description" content="${escapeAttr(route.ogDescription)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:image["'][\s\S]*?>/i,
      `<meta property="og:image" content="${route.ogImage}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:image:alt["'][\s\S]*?>/i,
      `<meta property="og:image:alt" content="${escapeAttr(route.ogImageAlt)}" />`
    );

    // Update Twitter tags
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:title["'][\s\S]*?>/i,
      `<meta name="twitter:title" content="${escapeAttr(route.ogTitle)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:description["'][\s\S]*?>/i,
      `<meta name="twitter:description" content="${escapeAttr(route.ogDescription)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:image["'][\s\S]*?>/i,
      `<meta name="twitter:image" content="${route.ogImage}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:image:alt["'][\s\S]*?>/i,
      `<meta name="twitter:image:alt" content="${escapeAttr(route.ogImageAlt)}" />`
    );

    // Inject JSON-LD Structured Data & NoScript styling for crawlers without JS
    const headAdditions = `
    <!-- Structured Data (JSON-LD Schema Markup) -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
    <noscript>
      <style>
        .reveal { opacity: 1 !important; transform: none !important; }
      </style>
    </noscript>
  </head>`;

    pageHtml = pageHtml.replace('</head>', headAdditions);

    // Inject pre-rendered React component tree into #root
    pageHtml = pageHtml.replace(
      /<div id=["']root["']>[\s\S]*?<\/div>/i,
      `<div id="root">${appHtml}</div>`
    );

    // Determine target output path
    let targetFilePath;
    if (route.path === '/') {
      targetFilePath = path.resolve(rootDir, 'dist/index.html');
    } else {
      const routeDir = path.resolve(rootDir, 'dist', route.path.replace(/^\//, ''));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      targetFilePath = path.resolve(routeDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, pageHtml, 'utf-8');
    const stats = fs.statSync(targetFilePath);
    console.log(`    ✓ Wrote ${targetFilePath.replace(rootDir, '')} (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  // 4. Remove temporary server bundle
  fs.rmSync(serverOutDir, { recursive: true, force: true });

  // 5. Generate dynamic sitemap.xml with accurate ISO date
  const today = new Date().toISOString().split('T')[0];
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path === '/services' ? '0.9' : r.path === '/projects' ? '0.85' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  fs.writeFileSync(path.resolve(rootDir, 'public/sitemap.xml'), sitemapContent, 'utf-8');
  fs.writeFileSync(path.resolve(rootDir, 'dist/sitemap.xml'), sitemapContent, 'utf-8');
  console.log(`  ✓ Updated sitemap.xml with lastmod: ${today}`);

  // 6. Ensure robots.txt is present in dist
  const robotsSrc = path.resolve(rootDir, 'public/robots.txt');
  const robotsDist = path.resolve(rootDir, 'dist/robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDist);
    console.log('  ✓ Synced robots.txt to dist/');
  }

  console.log('✅ Static pre-rendering completed successfully!');
}

prerender().catch((err) => {
  console.error('❌ Error during static pre-rendering:', err);
  process.exit(1);
});
