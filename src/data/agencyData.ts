/**
 * Core business and content data for Himnora IT Solution.
 */

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  techStack: string[];
  featuredProjectSlug?: string;
  iconName: string;
  imageKey?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  techStack: string[];
  imageKey: string;
  featured: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  popular?: boolean;
  features: string[];
  timeline: string;
  targetAudience: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  imageKey: string;
  content: string[];
}

export interface AgencyInfo {
  name: string;
  shortName: string;
  fullName: string;
  tagline: string;
  subtext: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socials: {
    platform: string;
    url: string;
  }[];
  stats: {
    projectsCompleted: number;
    clientsServed: number;
    satisfactionRate: number;
    ratingScore: number;
    ratingMax: number;
    yearsExperience: number;
    awardsWon: number;
  };
}

export const AGENCY_INFO: AgencyInfo = {
  name: 'Himnora',
  shortName: 'Himnora',
  fullName: 'Himnora IT Solution',
  tagline: 'WE CRAFT DIGITAL EXPERIENCES THAT DEFINE BRANDS & ACCELERATE GROWTH',
  subtext:
    'A high-precision digital design and software engineering studio creating world-class websites, scalable cloud platforms, and conversion-focused digital systems.',
  email: 'visionhuntitsolution@gmail.com',
  phone: '+91 86076 53657',
  address: {
    line1: 'Cyber City Innovation Hub',
    line2: 'Tower B, Level 7, DLF Phase 2',
    city: 'Gurugram',
    state: 'Haryana',
    zip: '122002',
    country: 'India',
  },
  socials: [
    { platform: 'Twitter / X', url: 'https://twitter.com/himnora' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/himnora' },
    { platform: 'GitHub', url: 'https://github.com/himnora' },
    { platform: 'Dribbble', url: 'https://dribbble.com/himnora' },
  ],
  stats: {
    projectsCompleted: 5,
    clientsServed: 5,
    satisfactionRate: 100,
    ratingScore: 5.0,
    ratingMax: 5.0,
    yearsExperience: 3,
    awardsWon: 2,
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Website Development',
    shortDescription:
      'High-velocity, accessible, and responsive web applications engineered with modern frameworks, headless CMS, and ultra-fast edge delivery.',
    fullDescription:
      'We architect robust, scalable, and ultra-responsive digital web solutions tailored to modern enterprises. From bespoke React & Next.js architectures to headless e-commerce and interactive web portals, our codebases adhere to stringent performance standards and Core Web Vitals excellence.',
    deliverables: [
      'Custom React & Next.js Development',
      'Headless CMS (Sanity, Strapi, Contentful)',
      'High-Conversion E-Commerce Stores',
      'API Integration & Edge Serverless Functions',
      'Cross-Browser & Device Fluid Responsiveness',
      'Sub-Second Page Load Optimization',
    ],
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel / Cloudflare'],
    featuredProjectSlug: 'aurora-luxury',
    iconName: 'Globe',
    imageKey: 'serviceWeb',
  },
  {
    id: 'seo-optimization',
    number: '02',
    title: 'Search Engine Optimization (SEO)',
    shortDescription:
      'Technical SEO, deep semantic schema architecture, programmatic landing systems, and content strategies that dominate high-intent search queries.',
    fullDescription:
      'Search visibility is an engineering discipline. Himnora IT Solution combines deep technical audit remediation, structured JSON-LD data graphs, Core Web Vitals performance tuning, and programmatic keyword indexing to systematically capture organic market share.',
    deliverables: [
      'Technical SEO Audit & Infrastructure Remediation',
      'Structured Data & Schema.org Knowledge Graphs',
      'Core Web Vitals & Performance Engineering',
      'Keyword Velocity & High-Intent Gap Analysis',
      'Programmatic SEO Architecture',
      'Local & Global Search Authority Scaling',
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'Semrush', 'Schema.org', 'Screaming Frog', 'Edge Prerendering'],
    featuredProjectSlug: 'velocity-proptech',
    iconName: 'Search',
    imageKey: 'serviceSeo',
  },
  {
    id: 'ui-ux-design',
    number: '03',
    title: 'UI/UX & Design Systems',
    shortDescription:
      'Distinctive, editorial user interfaces, multi-platform design tokens, interactive micro-animations, and conversion-tested user journeys.',
    fullDescription:
      'Great design is effortless clarity married to bold emotional resonance. We build holistic brand identity systems, interactive prototypes, and unified design token architectures in Figma that translate effortlessly into crisp production code.',
    deliverables: [
      'Multi-Platform Design Systems & Tokens',
      'Interactive Prototyping & Motion Choreography',
      'UX Journey Mapping & Information Architecture',
      'Accessibility (WCAG 2.2 AA) Compliance Audits',
      'User Testing & Usability Telemetry Analysis',
      'Editorial Web Aesthetics & Typography Design',
    ],
    techStack: ['Figma', 'Tokens Studio', 'Motion / Framer Motion', 'Tailwind CSS', 'Storybook'],
    featuredProjectSlug: 'kroma-health',
    iconName: 'Palette',
    imageKey: 'serviceDesign',
  },
  {
    id: 'google-ads-performance',
    number: '04',
    title: 'Google Ads & Performance Marketing',
    shortDescription:
      'Laser-targeted PPC campaigns, full-funnel attribution tracking, dynamic landing page testing, and conversion-rate optimization.',
    fullDescription:
      'We turn advertising spend into predictable compounding customer acquisition. Through rigorous conversion tracking, negative keyword filtering, algorithmic bidding setups, and hyper-targeted landing experiences, our campaigns maximize ROAS across search, display, and performance max channels.',
    deliverables: [
      'Search & Performance Max Campaign Setup',
      'Server-Side Conversions API & GA4 Attribution',
      'High-Converting Landing Page A/B Testing',
      'Audience Retargeting & Intent Segmentation',
      'Continuous Bid Optimization & ROAS Tracking',
      'Actionable Real-Time Executive Dashboards',
    ],
    techStack: ['Google Ads', 'Google Tag Manager', 'GA4 Server-Side', 'Meta Ads', 'Looker Studio'],
    featuredProjectSlug: 'fintech-core',
    iconName: 'TrendingUp',
    imageKey: 'serviceAds',
  },
  {
    id: 'social-media-marketing',
    number: '05',
    title: 'Social Media & Brand Growth',
    shortDescription:
      'Curated editorial storytelling, multi-channel narrative campaigns, and authentic community engagement that builds long-term brand equity.',
    fullDescription:
      'Modern brands need more than noise; they require consistent aesthetic prestige and compelling editorial narrative. We formulate content strategies, craft cinematic micro-assets, and execute targeted distribution strategies across LinkedIn, X, Instagram, and emerging platforms.',
    deliverables: [
      'Editorial Brand Narrative & Voice Positioning',
      'High-Impact Motion Graphics & Creative Assets',
      'Multi-Channel Content Calendars & Execution',
      'Executive Thought-Leadership Ghostwriting',
      'Community Growth & Engagement Management',
      'Monthly Brand Sentiment & Growth Analytics',
    ],
    techStack: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Notion', 'Buffer / Sprout Social'],
    featuredProjectSlug: 'aurora-luxury',
    iconName: 'Share2',
    imageKey: 'serviceSocial',
  },
  {
    id: 'custom-software-cloud',
    number: '06',
    title: 'Custom Software & Cloud Engineering',
    shortDescription:
      'Resilient backend services, microservices, cloud orchestration on AWS/GCP, and custom internal business workflow automation tools.',
    fullDescription:
      'When off-the-shelf software falls short, Himnora IT Solution builds proprietary web platforms, relational database systems, real-time telemetry dashboards, and cloud-native serverless pipelines designed for zero downtime and uncompromised security.',
    deliverables: [
      'Custom SaaS & Web Platform Development',
      'Cloud Architecture (AWS, Google Cloud, Docker)',
      'PostgreSQL, Redis & Relational Database Design',
      'Real-Time WebSockets & Event Streaming',
      'Enterprise Authentication & Role-Based Security',
      'Automated CI/CD Delivery Pipelines',
    ],
    techStack: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Google Cloud'],
    featuredProjectSlug: 'nexus-ai-cloud',
    iconName: 'Cpu',
    imageKey: 'serviceCloud',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    slug: 'fintech-core',
    title: 'FinTech Core Banking & Global Payment Orchestration',
    client: 'Apex Financial Technologies',
    category: 'FinTech Platform',
    year: '2025',
    summary:
      'Architected a next-generation banking terminal and real-time ledger visualization system processing over $40M in daily transaction volume with sub-50ms latency.',
    challenge:
      'Legacy monolith suffered from high latency, frequent database connection bottlenecks during market opening spikes, and an outdated user interface with high customer support churn.',
    solution:
      'Himnora IT Solution redesigned the platform into a micro-frontend architecture with real-time WebSocket feeds, decoupled caching layers using Redis, and a sleek dark-mode operational dashboard.',
    results: [
      { label: 'Transaction Throughput', value: '+340%' },
      { label: 'Latency Reduction', value: '68%' },
      { label: 'System Uptime', value: '99.99%' },
    ],
    techStack: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    imageKey: 'work1',
    featured: true,
    testimonial: {
      quote:
        'Himnora transformed our mission-critical banking portal into the fastest, most reliable interface our institutional traders have ever experienced.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'Apex Financial Technologies',
    },
  },
  {
    id: 'cs-2',
    slug: 'aurora-luxury',
    title: 'Aurora Atelier Global E-Commerce & Editorial Showcase',
    client: 'Aurora Maison Paris',
    category: 'Luxury E-Commerce',
    year: '2025',
    summary:
      'Bespoke headless e-commerce flagship combining high-fashion editorial imagery, fluid page transitions, and sub-second checkout speeds across 18 countries.',
    challenge:
      'The client needed a digital flagship that captured the prestige of haute couture while delivering instantaneous mobile performance and frictionless multi-currency checkout.',
    solution:
      'Engineered a headless storefront with custom motion design, edge-cached localized currencies, and an interactive 3D fabric customizer that elevated conversion rates.',
    results: [
      { label: 'Mobile Conversion Rate', value: '+62%' },
      { label: 'Average Order Value', value: '+38%' },
      { label: 'Core Web Vitals Score', value: '100/100' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shopify Storefront API', 'Motion'],
    imageKey: 'work2',
    featured: true,
    testimonial: {
      quote:
        'The aesthetic standards and engineering precision Himnora brought to Aurora were extraordinary. Our international sales surpassed all quarterly projections.',
      author: 'Élodie Laurent',
      role: 'VP of Digital Experience',
      company: 'Aurora Maison Paris',
    },
  },
  {
    id: 'cs-3',
    slug: 'nexus-ai-cloud',
    title: 'Nexus Enterprise Cloud & AI Model Orchestration',
    client: 'Nexus Systems Inc.',
    category: 'Cloud Engineering',
    year: '2025',
    summary:
      'Unified enterprise telemetry dashboard allowing engineering leaders to provision GPU clusters, monitor LLM inference pipelines, and optimize infrastructure costs.',
    challenge:
      'Complex fragmented tooling caused cloud cost waste and delayed incident response across multi-region Kubernetes clusters.',
    solution:
      'Built a centralized reactive command center featuring interactive cluster topology maps, instant alerts, and automated autoscaling triggers with role-based governance.',
    results: [
      { label: 'Cloud Cost Reduction', value: '$1.2M/yr' },
      { label: 'Incident Triage Time', value: '-74%' },
      { label: 'Developer Adoption', value: '94%' },
    ],
    techStack: ['React', 'TypeScript', 'Go', 'GraphQL', 'Tailwind CSS', 'Kubernetes', 'AWS'],
    imageKey: 'work3',
    featured: true,
    testimonial: {
      quote:
        'Himnora IT Solution delivered an enterprise console that turned an overwhelming web of cloud services into an intuitive, razor-sharp dashboard.',
      author: 'Dr. Aris Thorne',
      role: 'Head of Infrastructure',
      company: 'Nexus Systems Inc.',
    },
  },
  {
    id: 'cs-4',
    slug: 'kroma-health',
    title: 'Kroma Longevity & Precision Biometrics Portal',
    client: 'Kroma Health Genomics',
    category: 'MedTech & UX',
    year: '2024',
    summary:
      'HIPAA-compliant patient portal visualizing DNA sequencing, biological age metrics, and personalized wellness protocols with highest privacy safeguards.',
    challenge:
      'Complex genetic and blood test telemetry was incomprehensible to everyday patients, creating high friction and abandonment during clinical follow-ups.',
    solution:
      'Developed an empathetic, beautifully structured patient interface with interactive metric sliders, accessible color contrast, and encrypted medical records storage.',
    results: [
      { label: 'Patient Engagement', value: '+140%' },
      { label: 'Follow-Up Adherence', value: '88%' },
      { label: 'Accessibility Score', value: 'WCAG AA' },
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'D3.js Charts'],
    imageKey: 'work4',
    featured: true,
    testimonial: {
      quote:
        'Our clinical team and patients love the clarity of the Kroma portal. Himnora made sophisticated health metrics understandable and beautifully actionable.',
      author: 'Dr. Rachel Sterling',
      role: 'Founder & Chief Medical Officer',
      company: 'Kroma Health Genomics',
    },
  },
  {
    id: 'cs-5',
    slug: 'velocity-proptech',
    title: 'Velocity Commercial Real Estate & Spatial 3D Tours',
    client: 'Velocity Urban Properties',
    category: 'PropTech & SEO',
    year: '2025',
    summary:
      'High-end commercial real estate investment portal featuring interactive architectural floorplans, programmatic regional SEO pages, and virtual walkthroughs.',
    challenge:
      'Low organic visibility for prime commercial lease queries and slow portfolio loading speeds leading to lost international investor inquiries.',
    solution:
      'Built a programmatic SEO architecture generating 800+ localized high-intent pages combined with optimized WebGL architectural renderings and instant lead routing.',
    results: [
      { label: 'Organic Search Traffic', value: '+420%' },
      { label: 'Qualified Investor Inquiries', value: '+215%' },
      { label: 'Average Session Duration', value: '5m 12s' },
    ],
    techStack: ['React', 'TypeScript', 'Next.js', 'Three.js', 'Tailwind CSS', 'Schema.org'],
    imageKey: 'work6',
    featured: true,
    testimonial: {
      quote:
        'Himnora IT Solution delivered an organic traffic explosion. Their technical SEO knowledge combined with breathtaking design is unmatched.',
      author: 'David Chen',
      role: 'Managing Partner',
      company: 'Velocity Urban Properties',
    },
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Growth Launchpad',
    price: 'Rs. 45,000',
    billingPeriod: 'per project',
    description: 'Ideal for emerging businesses seeking a bespoke, high-converting digital presence built right from day one.',
    timeline: '2 - 3 Weeks Delivery',
    targetAudience: 'Startups & Specialized Businesses',
    features: [
      'Custom 5-8 Page High-Performance Website',
      'Fluid Mobile-First Responsive Architecture',
      'Foundational Technical SEO & Structured Data',
      'Google Analytics 4 & Tag Manager Setup',
      'Contact Form & Lead Capture Integrations',
      'Sub-Second Page Load Guarantee',
      '30 Days Post-Launch Dedicated Support',
    ],
  },
  {
    id: 'professional',
    name: 'Scale & Authority',
    price: 'Rs. 95,000',
    billingPeriod: 'per project',
    popular: true,
    description:
      'Our flagship offering for growing brands needing comprehensive design systems, advanced SEO, and custom functionality.',
    timeline: '4 - 6 Weeks Delivery',
    targetAudience: 'Scaling Companies & Regional Leaders',
    features: [
      'Comprehensive Bespoke Web Application (Up to 15 Pages)',
      'Complete Multi-Platform Design System in Figma',
      'Deep Technical SEO & Schema Knowledge Graph',
      'Headless CMS or Database Integration',
      'Interactive Micro-Animations & Custom Mockups',
      'Conversion Rate Optimization (CRO) Engineering',
      'Speed Audit & Core Web Vitals 95+ Score',
      '90 Days Priority Support & SLA',
    ],
  },
  {
    id: 'enterprise',
    name: 'Custom Enterprise',
    price: 'Rs. 2,50,000+',
    billingPeriod: 'custom scope',
    description:
      'Full-spectrum engineering, custom software platforms, multi-region cloud architecture, and ongoing growth partnership.',
    timeline: '8 - 12 Weeks Delivery',
    targetAudience: 'Enterprises & High-Growth Tech Ventures',
    features: [
      'End-to-End Bespoke Software & Cloud Architecture',
      'Dedicated Engineering Lead & Design Director',
      'Programmatic SEO Engine & Global Localization',
      'Custom APIs, Microservices & Database Systems',
      'Role-Based Access Control (RBAC) & Security Hardening',
      'Multi-Region Cloud Deployment (AWS / GCP / Cloudflare)',
      'Quarterly Performance & Growth Strategy Sprints',
      '24/7 Dedicated Support SLA & Infrastructure Monitoring',
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What sets Himnora IT Solution apart from typical agencies?',
    answer:
      'We combine editorial visual aesthetics with rigorous software engineering. Unlike template shops that use bloated WordPress themes, we build custom, performant React and Next.js platforms from scratch with clean TypeScript code, obsessive Core Web Vitals optimization, and real business conversion metrics.',
  },
  {
    id: 'faq-2',
    category: 'Process',
    question: 'How does your collaborative project process work?',
    answer:
      'Our process consists of 6 structured phases: Discovery & Research, UX Architecture, High-Fidelity UI Design in Figma, Clean Modular Engineering, Quality Assurance & Technical SEO Verification, and final Deployment. You have direct access to our tech leads throughout.',
  },
  {
    id: 'faq-3',
    category: 'Timeline',
    question: 'How long does a typical project take from kick-off to launch?',
    answer:
      'A Growth Launchpad website typically takes 2 to 3 weeks. A comprehensive Scale & Authority platform with custom CMS and animations takes 4 to 6 weeks. Enterprise systems with complex integrations are scoped over 8 to 12 weeks with weekly milestone deliverables.',
  },
  {
    id: 'faq-4',
    category: 'SEO',
    question: 'Do you guarantee technical SEO and fast page speeds?',
    answer:
      'Yes. Every single web application engineered by Himnora IT Solution is built to pass Google Core Web Vitals with green scores (LCP under 1.5s, CLS 0, INP under 100ms). We implement semantic HTML5, valid JSON-LD Schema.org structured data, and responsive modern image formats.',
  },
  {
    id: 'faq-5',
    category: 'Ownership',
    question: 'Who owns the intellectual property and code after completion?',
    answer:
      'You do. Upon final payment, 100% of the intellectual property, design assets, Figma files, and Git code repositories are transferred entirely to your organization with zero vendor lock-in or recurring proprietary licensing fees.',
  },
  {
    id: 'faq-6',
    category: 'Support',
    question: 'What happens after our website or platform goes live?',
    answer:
      'All our packages include complimentary post-launch support (30 to 90 days depending on the tier) covering bug fixes, browser updates, and team training. We also offer monthly maintenance and continuous optimization retainers.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'future-of-headless-commerce',
    title: 'The Architecture of Modern Headless Commerce in 2026',
    excerpt:
      'Why top-tier luxury and high-volume retail brands are abandoning legacy monolithic storefronts in favor of edge-rendered, modular commerce platforms.',
    category: 'Engineering & E-Commerce',
    publishedDate: 'March 14, 2026',
    readTime: '6 min read',
    author: {
      name: 'Aiden Sharma',
      role: 'Principal Solutions Architect',
    },
    imageKey: 'blog1',
    content: [
      'The traditional monolithic e-commerce stack—where database, presentation layer, and checkout logic are coupled tightly into a single framework—is rapidly reaching its limits for brands competing in competitive digital markets.',
      'Headless commerce decouples the customer-facing frontend from backend business logic. By rendering pages at the global edge and communicating via high-speed GraphQL and REST APIs, storefronts achieve instant navigation, personalized localized catalogs, and unparalleled security.',
      'At Himnora IT Solution, our headless architectures have demonstrated average page load improvements of 70% and direct mobile conversion surges exceeding 50%. The future belongs to modular, edge-native infrastructure.',
    ],
  },
  {
    id: 'blog-2',
    slug: 'mastering-core-web-vitals-2026',
    title: 'Mastering Core Web Vitals: An Engineering Blueprint for Organic Dominance',
    excerpt:
      'A deep dive into Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) for modern web applications.',
    category: 'Technical SEO',
    publishedDate: 'February 28, 2026',
    readTime: '8 min read',
    author: {
      name: 'Maya Sengupta',
      role: 'Head of Technical SEO & Performance',
    },
    imageKey: 'blog2',
    content: [
      'Search engine algorithms have permanently elevated user experience from an afterthought to a primary ranking factor. Google Core Web Vitals directly dictate search position, especially in competitive enterprise verticals.',
      'With the deprecation of FID in favor of INP (Interaction to Next Paint), every JavaScript micro-task, reflow, and un-optimized event handler directly penalizes your domain authority. Our engineering team approaches performance holistically—from code-splitting to zero-shift typography font metrics.',
      'When your platform loads under 1 second and provides instant tactile feedback, search engines reward you with higher crawling frequency, lower bounce rates, and dominant top-tier rankings.',
    ],
  },
  {
    id: 'blog-3',
    slug: 'designing-for-spatial-and-ai-interfaces',
    title: 'Editorial Restraint: Why Minimalist Agency Design Wins High-Value Clients',
    excerpt:
      'How purposeful whitespace, bold typographic scales, and black-card contrast command higher enterprise trust than cluttered animations.',
    category: 'UI/UX & Design Philosophy',
    publishedDate: 'February 10, 2026',
    readTime: '5 min read',
    author: {
      name: 'Kabir Verma',
      role: 'Creative Design Director',
    },
    imageKey: 'blog3',
    content: [
      'When every website uses generic gradient bubbles and template components, intentional editorial restraint becomes your greatest competitive differentiator.',
      'High-net-worth clients and enterprise buyers make purchasing decisions based on perceived competence, clarity, and authority. Large grotesque headlines, generous 24px card geometries, warm monochrome palettes, and disciplined hover transitions communicate confidence.',
      'At Himnora IT Solution, we design interfaces that respect the viewer’s intelligence. We remove decorative noise so that the client’s core value proposition speaks with unmistakable clarity.',
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Deep Audit',
    description:
      'We dissect your business goals, target audience personas, competitive benchmarks, and current technical infrastructure to uncover high-leverage growth opportunities.',
  },
  {
    step: '02',
    title: 'UX Strategy & Architecture',
    description:
      'We craft intuitive information architectures, conversion-focused wireframes, and content hierarchies that guide visitors seamlessly toward engagement.',
  },
  {
    step: '03',
    title: 'High-Fidelity Editorial UI',
    description:
      'Our designers produce bespoke design tokens, typography systems, and interactive Figma prototypes with pixel-perfect attention to visual prestige.',
  },
  {
    step: '04',
    title: 'Full-Stack Modern Engineering',
    description:
      'We bring designs to life with clean TypeScript, React/Next.js components, fluid motion physics, and resilient backend integrations.',
  },
  {
    step: '05',
    title: 'QA, Speed & Technical SEO',
    description:
      'Rigorous cross-browser testing, accessibility compliance checks (WCAG AA), Core Web Vitals audits, and schema markup verification ensure zero defects.',
  },
  {
    step: '06',
    title: 'Deployment & Continuous Growth',
    description:
      'We deploy to high-speed global CDNs, configure real-time analytics dashboards, and provide hands-on post-launch support to guarantee sustained momentum.',
  },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote:
      'Himnora IT Solution rebuilt our entire enterprise web presence in 5 weeks. Our organic pipeline doubled in 60 days, and our investors were blown away by the design caliber.',
    author: 'Siddharth Rao',
    role: 'CEO & Co-Founder',
    company: 'Quantis Cloud Solutions',
    rating: 5,
  },
  {
    id: 't-2',
    quote:
      'The speed, attention to detail, and technical mastery of Himnora are unmatched. They are not just an agency—they are a high-caliber extension of our product team.',
    author: 'Elena Rostova',
    role: 'Head of Brand Experience',
    company: 'Veloce Mobility Group',
    rating: 5,
  },
  {
    id: 't-3',
    quote:
      'From SEO architecture to bespoke React components, Himnora executed flawlessly. Our conversion rates climbed 45% within three weeks of going live.',
    author: 'Vikram Singhania',
    role: 'Managing Director',
    company: 'Heritage Capital Partners',
    rating: 5,
  },
];
