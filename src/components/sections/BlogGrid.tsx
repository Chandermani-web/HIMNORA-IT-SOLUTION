import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/agencyData';
import { IMAGES } from '../../data/images';
import { SectionHeader } from '../ui/SectionHeader';
import { ArrowCircleButton } from '../ui/ArrowCircleButton';
import { SmartImage } from '../ui/SmartImage';
import { CircleCTA } from '../ui/CircleCTA';

export const BlogGrid: React.FC = () => {
  const post1 = BLOG_POSTS[0];
  const post2 = BLOG_POSTS[1];
  const post3 = BLOG_POSTS[2];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader
          eyebrow="INSIGHTS"
          title="Company blog & updates"
          subtitle="Architectural perspectives, performance blueprints, and editorial design thinking from our senior team."
          className="mb-0"
        />
        <div className="shrink-0 pb-2">
          <CircleCTA label="VIEW ALL INSIGHTS" to="/blog" />
        </div>
      </div>

      {/* 3-Column Masonry Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* Column 1: Black Text Card (category + date + headline) */}
        {post1 && (
          <div className="bg-[#0a0a0a] text-white rounded-[24px] p-8 flex flex-col justify-between border border-white/5 shadow-sm editorial-card group min-h-[440px]">
            <div>
              {/* Category & Date */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-8 uppercase tracking-wider">
                <span>{post1.category}</span>
                <span>{post1.publishedDate}</span>
              </div>

              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-gray-200 transition-colors leading-snug">
                <Link to={`/blog/${post1.slug}`}>
                  {post1.title}
                </Link>
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                {post1.excerpt}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">By {post1.author.name}</span>
              <ArrowCircleButton
                to={`/blog/${post1.slug}`}
                ariaLabel={`Read article ${post1.title}`}
                variant="white"
              />
            </div>
          </div>
        )}

        {/* Column 2: Full-bleed rounded photo card with overlaid editorial info */}
        {post2 && (
          <div className="relative rounded-[24px] overflow-hidden editorial-card group min-h-[440px] flex flex-col justify-end p-8 border border-black/5 bg-[#141414]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <SmartImage
                src={IMAGES.blog2.src}
                alt={IMAGES.blog2.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 text-white">
              <div className="inline-block text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white mb-3">
                {post2.category}
              </div>

              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-4 leading-snug">
                <Link to={`/blog/${post2.slug}`} className="hover:underline">
                  {post2.title}
                </Link>
              </h3>

              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-gray-300">
                <span className="font-mono">{post2.publishedDate}</span>
                <ArrowCircleButton
                  to={`/blog/${post2.slug}`}
                  ariaLabel={`Read article ${post2.title}`}
                  variant="white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Column 3: White text card under a photo */}
        {post3 && (
          <div className="bg-white rounded-[24px] overflow-hidden border border-black/5 shadow-sm editorial-card group flex flex-col justify-between">
            {/* Top Photo */}
            <div className="h-52 w-full overflow-hidden">
              <SmartImage
                src={IMAGES.blog3.src}
                alt={IMAGES.blog3.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Bottom Content */}
            <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#6b6b6b] mb-3 uppercase tracking-wider">
                  <span>{post3.category}</span>
                  <span>{post3.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[#0a0a0a] group-hover:text-black mb-3 leading-snug">
                  <Link to={`/blog/${post3.slug}`}>
                    {post3.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed line-clamp-2">
                  {post3.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-6">
                <span className="text-xs text-[#6b6b6b] font-mono">By {post3.author.name}</span>
                <ArrowCircleButton
                  to={`/blog/${post3.slug}`}
                  ariaLabel={`Read article ${post3.title}`}
                  variant="black"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
