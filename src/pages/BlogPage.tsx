import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/agencyData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { BlogGrid } from '../components/sections/BlogGrid';
import { CircleCTA } from '../components/ui/CircleCTA';

export const BlogPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader
          eyebrow="PERSPECTIVES & DISPATCHES"
          title="Architectural perspectives & design philosophy."
          subtitle="In-depth technical guides, SEO analysis, and editorial thinking from the engineering team at Himnora IT Solution."
          className="mb-0"
        />
        <div className="shrink-0 pb-2">
          <CircleCTA label="WORK WITH OUR TEAM" to="/contact" />
        </div>
      </div>

      {/* Blog Grid */}
      <BlogGrid />
    </div>
  );
};
