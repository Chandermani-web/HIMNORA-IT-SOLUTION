import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/agencyData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PortfolioCard } from '../components/sections/PortfolioCard';
import { CircleCTA } from '../components/ui/CircleCTA';

export const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(CASE_STUDIES.map((c) => c.category)))];

  const filteredStudies =
    selectedCategory === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader
          eyebrow="SELECTED CASE STUDIES"
          title="Digital platforms engineered for scale and aesthetic distinction."
          subtitle="Explore our portfolio of bespoke web applications, headless commerce systems, and cloud platforms."
          className="mb-0"
        />
        <div className="shrink-0 pb-2">
          <CircleCTA label="START YOUR PROJECT" to="/contact" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-12 border-b border-black/5 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              selectedCategory === cat
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-white text-[#6b6b6b] hover:text-[#0a0a0a] border border-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2-Column Grid of Black Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredStudies.map((study, idx) => (
          <PortfolioCard
            key={study.id}
            study={study}
            priority={idx < 2}
            index={idx}
            tone={idx % 3 === 1 ? "navy" : "black"}
          />
        ))}
      </div>
    </div>
  );
};
