import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutBadgeSection } from '../components/sections/AboutBadgeSection';
import { PortfolioGridSection } from '../components/sections/PortfolioGridSection';
import { StatsBento } from '../components/sections/StatsBento';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { PricingSection } from '../components/sections/PricingSection';
import { BlogGrid } from '../components/sections/BlogGrid';
import { ContactSection } from '../components/sections/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 sm:gap-16">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. ABOUT COMPANY badge & editorial text */}
      <AboutBadgeSection />

      {/* 3. Portfolio grid (5 projects for 5 clients) */}
      <PortfolioGridSection limit={5} showAllLink={true} />

      {/* 4. FUN FACTS bento with count-up & orange stars */}
      <StatsBento />

      {/* 5. Services (6 categories as rounded cards with arrow) */}
      <ServicesGrid />

      {/* 6. Value Proposition (Talk CTA) + FAQ */}
      <PricingSection showPricingCards={false} />

      {/* 7. INSIGHTS Company blog & updates */}
      <BlogGrid />

      {/* 8. GET IN TOUCH black grain card */}
      <ContactSection />
    </div>
  );
};
