/**
 * Central image registry for Himnora IT Solution.
 * Real, curated high-resolution photography with verified HTTP 200 responses.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  attribution: string;
}

export const IMAGES: Record<string, ImageAsset> = {
  // Fun Facts section: tall 4:5 black-and-white photo of designer working on a laptop
  funFactsMain: {
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&q=80&auto=format&fit=crop',
    alt: 'Himnora senior designer prototyping user experience on laptop at a minimalist wooden desk',
    width: 1000,
    height: 1250,
    attribution: 'Unsplash - Verified editorial photo',
  },

  // Fun Facts bento card: square top-down flat lay with design tools, UI palette, and desk setup
  funFactsThumb: {
    src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&auto=format&fit=crop',
    alt: 'Top-down creative workspace with interface prototypes, color swatches, and design system elements',
    width: 800,
    height: 800,
    attribution: 'Unsplash - Verified flat-lay creative desk',
  },

  // Blog 1: Candid creative engineer in linen working at modern workstation in soft window light
  blog1: {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80&auto=format&fit=crop',
    alt: 'Editorial portrait of lead product architect discussing headless commerce and web architecture',
    width: 900,
    height: 1125,
    attribution: 'Unsplash - Editorial portrait in warm natural light',
  },

  // Blog 2: Creative director / team lead in bright studio
  blog2: {
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80&auto=format&fit=crop',
    alt: 'Creative director smiling in an open studio environment discussing design systems',
    width: 900,
    height: 1035,
    attribution: 'Unsplash - Bright studio portrait',
  },

  // Blog 3: Candid creative specialist working focused at laptop in warm sunlight
  blog3: {
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80&auto=format&fit=crop',
    alt: 'Senior tech strategist analyzing Core Web Vitals and real-time user metrics',
    width: 900,
    height: 1125,
    attribution: 'Unsplash - Focused tech workplace photo',
  },

  // About team: 16:9 multidisciplinary engineering & design team in modern studio
  aboutTeam: {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&auto=format&fit=crop',
    alt: 'Himnora multidisciplinary engineering, design, and SEO team collaborating in modern office',
    width: 1400,
    height: 788,
    attribution: 'Unsplash - Verified team collaboration photography',
  },

  // Portfolio work 1: FinTech & Global Payments Core
  work1: {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    alt: 'FinTech dashboard analytics mockup with dark UI aesthetics',
    width: 1200,
    height: 750,
    attribution: 'Unsplash - Clean data visualization interface',
  },

  // Portfolio work 2: Aurora Luxury E-Commerce
  work2: {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    alt: 'Luxury fashion e-commerce storefront browser mockup',
    width: 1200,
    height: 750,
    attribution: 'Unsplash - Digital platform mockup interface',
  },

  // Portfolio work 3: Nexus Enterprise AI Infrastructure
  work3: {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80&auto=format&fit=crop',
    alt: 'Enterprise AI node orchestration and cloud telemetry portal',
    width: 1200,
    height: 750,
    attribution: 'Unsplash - Sleek tech platform visual',
  },

  // Portfolio work 4: Kroma Health & Longevity MedTech
  work4: {
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80&auto=format&fit=crop',
    alt: 'Patient telemetry and personalized biomarker health app',
    width: 1200,
    height: 750,
    attribution: 'Unsplash - Clean responsive design layout',
  },

  // Portfolio work 5: Solaria Renewable Energy Telemetry
  work5: {
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80&auto=format&fit=crop',
    alt: 'Solar grid telemetry and smart IoT energy management platform',
    width: 1200,
    height: 750,
    attribution: 'Unsplash - Modern product UI layout',
  },

  // Portfolio work 6: Velocity Urban PropTech
  work6: {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop',
    alt: 'Interactive spatial real-estate architectural portal',
    width: 1200,
    height: 750,
    attribution: 'Unsplash - Collaborative design showcase',
  },

  // Service 1: Website Development
  serviceWeb: {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=80&auto=format&fit=crop',
    alt: 'Clean workspace displaying modern responsive code and web application architecture',
    width: 1000,
    height: 667,
    attribution: 'Unsplash - Web development setup',
  },

  // Service 2: SEO Optimization
  serviceSeo: {
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&q=80&auto=format&fit=crop',
    alt: 'SEO specialist reviewing organic search keyword analytics and crawl metrics',
    width: 1000,
    height: 667,
    attribution: 'Unsplash - SEO and search analytics',
  },

  // Service 3: UI/UX & Design Systems
  serviceDesign: {
    src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1000&q=80&auto=format&fit=crop',
    alt: 'Product designer architecting high-fidelity UI wireframes and interactive design tokens',
    width: 1000,
    height: 667,
    attribution: 'Unsplash - UI/UX design workflow',
  },

  // Service 4: Google Ads & Performance Marketing
  serviceAds: {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80&auto=format&fit=crop',
    alt: 'Performance marketing dashboard tracking conversion funnels and ROAS metrics',
    width: 1000,
    height: 667,
    attribution: 'Unsplash - Performance marketing analytics',
  },

  // Service 5: Social Media & Brand Growth
  serviceSocial: {
    src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&q=80&auto=format&fit=crop',
    alt: 'Editorial social media assets and creative brand content curation setup',
    width: 1000,
    height: 667,
    attribution: 'Unsplash - Brand and social media growth',
  },

  // Service 6: Custom Software & Cloud Engineering
  serviceCloud: {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80&auto=format&fit=crop',
    alt: 'Cloud server infrastructure and scalable microservices engineering dashboard',
    width: 1000,
    height: 667,
    attribution: 'Unsplash - Cloud computing and software engineering',
  },
};
