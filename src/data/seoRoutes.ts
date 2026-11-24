export interface RouteSEO {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: string;
}

export function getSiteUrl(): string {
  if (typeof process !== 'undefined' && process.env?.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL.replace(/\/+$/, '');
  }
  // Vite client build / SSR fallback
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) {
      return (import.meta.env.VITE_SITE_URL as string).replace(/\/+$/, '');
    }
  } catch {
    // Ignore in non-esm environments
  }
  return 'https://hmtechnologies.co.ke';
}

export const SITE_URL = getSiteUrl();

export const routesSEO: Record<string, RouteSEO> = {
  '/': {
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
  '/about': {
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
    ogImageAlt: 'About HM Technologies team and engineering culture',
    ogType: 'website',
  },
  '/services': {
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
  '/projects': {
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
  '/projects/mpesa-property-automation': {
    path: '/projects/mpesa-property-automation',
    title: 'M-Pesa Property Automation Case Study | HM Technologies',
    description:
      'Explore how HM Technologies automated tenant rent collection, utility reconciliations, and Zoho CRM workflows for 400+ properties in Nairobi.',
    keywords:
      'M-Pesa property automation, Daraja API integration Nairobi, Zoho CRM property management, rent collection automation Kenya',
    canonical: `${SITE_URL}/projects/mpesa-property-automation`,
    ogTitle: 'M-Pesa Property Automation Case Study | HM Technologies',
    ogDescription:
      'Explore how HM Technologies automated tenant rent collection, utility reconciliations, and Zoho CRM workflows for 400+ properties in Nairobi.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'M-Pesa and Zoho property automation platform case study',
    ogType: 'article',
  },
  '/projects/savannah-retail-ecommerce': {
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
  '/projects/highview-erp-system': {
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
  '/projects/supply-chain-bi-dashboard': {
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
  '/projects/aura-wellness-ecommerce': {
    path: '/projects/aura-wellness-ecommerce',
    title: 'Aura Wellness E-Commerce Case Study | HM Technologies',
    description:
      'How HM Technologies delivered a 3.1x conversion uplift and repeat subscription portal for East Africa’s top wellness nutrition brand.',
    keywords:
      'wellness ecommerce Kenya, headless WooCommerce, WhatsApp order assist, Aura nutrition case study',
    canonical: `${SITE_URL}/projects/aura-wellness-ecommerce`,
    ogTitle: 'Aura Wellness E-Commerce Case Study | HM Technologies',
    ogDescription:
      'How HM Technologies delivered a 3.1x conversion uplift and repeat subscription portal for East Africa’s top wellness nutrition brand.',
    ogImage: `${SITE_URL}/hero/software-web.webp`,
    ogImageAlt: 'Aura wellness store case study',
    ogType: 'article',
  },
  '/projects/full-funnel-seo-growth': {
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
};

export function generateJsonLd(routePath: string, siteUrl: string = SITE_URL): object {
  const currentCanonical = `${siteUrl}${routePath === '/' ? '/' : routePath}`;

  const baseSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': `${siteUrl}/#organization`,
        name: 'HM Technologies',
        alternateName: 'HM Tech Kenya',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon.svg`,
          width: '512',
          height: '512',
        },
        image: `${siteUrl}/hero/software-web.webp`,
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
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'HM Technologies',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': `${currentCanonical}#webpage`,
        url: currentCanonical,
        name: routesSEO[routePath]?.title ?? 'HM Technologies',
        description: routesSEO[routePath]?.description ?? '',
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: 'en',
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service-software`,
        serviceType: 'Custom Software Development',
        name: 'Software & System Development',
        description:
          'Custom business systems, ERP, CRM, school and hospital management platforms engineered to streamline operations and centralize business data.',
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service-automation`,
        serviceType: 'Business Workflow Automation',
        name: 'Business Automation & Architecture',
        description:
          'End-to-end automated pipelines, Zoho CRM integrations, Power Automate workflows, and API architectures eliminating manual bottlenecks.',
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service-analytics`,
        serviceType: 'Data Analytics & Business Intelligence',
        name: 'Data Analytics & Reporting',
        description:
          'Turn raw business data into actionable decisions with Power BI dashboards, Python analytics, data visualization, and predictive forecasting.',
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service-marketing`,
        serviceType: 'Digital Marketing',
        name: 'Digital Marketing & Growth',
        description:
          'Data-driven search engine optimization (SEO), Google Ads, Meta Ads, and content marketing engineered to lower acquisition costs and scale revenue.',
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
      },
    ],
  };

  return baseSchema;
}
