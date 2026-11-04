import {
  Globe,
  Code2,
  BarChart3,
  Megaphone,
  Headphones,
  Workflow,
  Award,
  Lightbulb,
  Zap,
  Tag,
  ShieldCheck,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  accent: 'blue' | 'ember';
}

export const services: ServiceItem[] = [
  {
    icon: Globe,
    title: 'Website Development',
    description:
      'High-performance, responsive websites engineered to convert visitors into customers.',
    features: [
      'Corporate websites',
      'Business websites',
      'Portfolio websites',
      'Landing pages',
      'E-commerce websites',
    ],
    accent: 'blue',
  },
  {
    icon: Code2,
    title: 'Software & System Development',
    description:
      'Custom business systems that streamline operations and centralize your data.',
    features: [
      'Business systems',
      'ERP Systems',
      'CRM Systems',
      'Inventory Management Systems',
      'School Management Systems',
      'Hospital Management Systems',
    ],
    accent: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics & Business Intelligence',
    description:
      'Turn raw data into clear decisions with dashboards, reporting, and forecasting.',
    features: [
      'Excel Dashboards',
      'Power BI',
      'Python Analytics',
      'Data Visualization',
      'Business Reporting',
      'Forecasting',
    ],
    accent: 'ember',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Data-driven campaigns that grow reach, engagement, and revenue across channels.',
    features: [
      'SEO',
      'Social Media Marketing',
      'Google Ads',
      'Facebook Ads',
      'Content Marketing',
      'Email Marketing',
    ],
    accent: 'blue',
  },
  {
    icon: Headphones,
    title: 'IT Support',
    description:
      'Reliable technical support and infrastructure keeping your business online.',
    features: [
      'Computer Maintenance',
      'Network Support',
      'Cloud Solutions',
      'Microsoft 365',
      'Technical Support',
    ],
    accent: 'ember',
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    description:
      'Eliminate repetitive work with intelligent workflows and system integrations.',
    features: [
      'Workflow Automation',
      'Power Automate',
      'SharePoint Solutions',
      'CRM Integration',
    ],
    accent: 'blue',
  },
];

export interface WhyItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyChooseUs: WhyItem[] = [
  {
    icon: Award,
    title: 'Experienced Professionals',
    description:
      'A seasoned team with years of hands-on delivery across industries and platforms.',
  },
  {
    icon: Lightbulb,
    title: 'Innovative Solutions',
    description:
      'We combine proven engineering with modern tools to solve problems creatively.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description:
      'Agile workflows and clear milestones mean your project ships on time, every time.',
  },
  {
    icon: Tag,
    title: 'Affordable Pricing',
    description:
      'Transparent, competitive pricing built around the real value we deliver.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Support',
    description:
      'Ongoing maintenance and responsive support keep your systems running smoothly.',
  },
  {
    icon: Cpu,
    title: 'Modern Technology',
    description:
      'We build on current, well-supported stacks so your investment stays future-proof.',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We listen to your goals, challenges, and scope to understand the problem.',
  },
  {
    number: '02',
    title: 'Planning',
    description: 'A clear roadmap, milestones, and architecture are defined and agreed.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We craft intuitive interfaces and system blueprints for your review.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Clean, scalable code is built in iterative, reviewable increments.',
  },
  {
    number: '05',
    title: 'Testing',
    description: 'Rigorous QA ensures performance, security, and cross-device reliability.',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'We deploy, monitor, and hand over with full documentation and training.',
  },
  {
    number: '07',
    title: 'Support',
    description: 'Ongoing maintenance and improvements keep your solution running optimally.',
  },
];

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  summary: string;
  gradient: string;
  icon: string;
  tags: string[];
  exampleStack: string[];
  liveDemoUrl?: string;
}

export const projects: ProjectItem[] = [
  {
    title: 'Corporate Website',
    category: 'Web Development',
    description: 'A sleek, high-converting corporate presence with CMS-driven content.',
    summary: 'A responsive business website that gives teams an easy way to present their services, publish updates, and turn visitors into qualified enquiries.',
    gradient: 'from-electric-600 to-electric-800',
    icon: 'globe',
    tags: ['Web'],
    exampleStack: ['React', 'Node.js', 'Microsoft Azure'],
  },
  {
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'Full-featured online store with secure payments and inventory sync.',
    summary: 'A complete shopping experience with organized product discovery, a smooth checkout journey, secure payments, and stock information that stays current.',
    gradient: 'from-ember-500 to-ember-600',
    icon: 'cart',
    tags: ['Web'],
    exampleStack: ['React', 'Node.js', 'MySQL'],
  },
  {
    title: 'Business Dashboard',
    category: 'Data Analytics',
    description: 'Real-time KPI dashboard unifying sales, finance, and operations data.',
    summary: 'A single decision-making view that brings sales, finance, and operations together so leadership can spot trends and act with confidence.',
    gradient: 'from-electric-500 to-electric-700',
    icon: 'chart',
    tags: ['Analytics'],
    exampleStack: ['Power BI', 'Python', 'MySQL'],
  },
  {
    title: 'Inventory System',
    category: 'Software',
    description: 'Multi-warehouse inventory management with barcode and alert automation.',
    summary: 'A practical inventory workflow for tracking stock across locations, reducing manual errors, and alerting teams before important items run out.',
    gradient: 'from-electric-600 to-navy-800',
    icon: 'box',
    tags: ['Automation', 'Software'],
    exampleStack: ['React', 'Node.js', 'MySQL'],
  },
  {
    title: 'School Management System',
    category: 'Software',
    description: 'End-to-end school platform covering students, fees, grades, and parents.',
    summary: 'A connected school platform that keeps student records, fee collection, academic progress, and parent communication organized in one place.',
    gradient: 'from-ember-500 to-electric-700',
    icon: 'school',
    tags: ['Automation', 'Software'],
    exampleStack: ['React', 'Node.js', 'Microsoft Azure'],
  },
  {
    title: 'Marketing Campaign',
    category: 'Digital Marketing',
    description: 'Integrated SEO and paid campaign that tripled qualified lead volume.',
    summary: 'A focused growth campaign combining search visibility, paid promotion, and clear messaging to attract more of the right audience.',
    gradient: 'from-electric-500 to-ember-500',
    icon: 'megaphone',
    tags: ['Digital Marketing'],
    exampleStack: ['Google Ads', 'Meta Ads', 'SEO'],
  },
];

export interface TechItem {
  name: string;
  category: string;
}

export const technologies: TechItem[] = [
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'PHP', category: 'Backend' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'Power BI', category: 'Data' },
  { name: 'MySQL', category: 'Data' },
  { name: 'MongoDB', category: 'Data' },
  { name: 'GitHub', category: 'DevOps' },
  { name: 'Microsoft Azure', category: 'Cloud' },
  { name: 'Microsoft 365', category: 'Cloud' },
];

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  initials: string;
  gradient: string;
}

export const testimonials: TestimonialItem[] = [
  {
    name: 'David Mwangi',
    role: 'Operations Director',
    company: 'Blue Ridge Logistics',
    rating: 5,
    quote:
      'HM Technologies rebuilt our inventory system from the ground up. We cut stock discrepancies by 80% and saved countless hours of manual work. Genuinely world-class execution.',
    initials: 'DM',
    gradient: 'from-electric-500 to-electric-700',
  },
  {
    name: 'Amina Hassan',
    role: 'Founder & CEO',
    company: 'Savannah Retail Co.',
    rating: 5,
    quote:
      'Our e-commerce platform launched flawlessly and revenue doubled within three months. The team understood our vision immediately and delivered beyond expectations.',
    initials: 'AH',
    gradient: 'from-ember-500 to-ember-600',
  },
  {
    name: 'James Otieno',
    role: 'Principal',
    company: 'Highview Academy',
    rating: 5,
    quote:
      'The school management system transformed how we handle fees, grading, and parent communication. Reliable, intuitive, and backed by responsive support.',
    initials: 'JO',
    gradient: 'from-electric-600 to-navy-800',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const serviceOptions = [
  'Website Development',
  'Software & System Development',
  'Data Analytics & Business Intelligence',
  'Digital Marketing',
  'IT Support',
  'Business Automation',
  'Other',
];
