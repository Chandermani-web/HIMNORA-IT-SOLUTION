import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CASE_STUDIES } from '../data/agencyData';
import { IMAGES } from '../data/images';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { BrowserMockup } from '../components/ui/BrowserMockup';
import { CircleCTA } from '../components/ui/CircleCTA';
import { ContactSection } from '../components/sections/ContactSection';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === slug);

  if (currentIndex === -1) {
    return <Navigate to="/portfolio" replace />;
  }

  const study = CASE_STUDIES[currentIndex];
  const nextStudy = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];
  const imageAsset = IMAGES[study.imageKey] || IMAGES.work1;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Back button */}
      <div className="mb-8">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Work</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="max-w-4xl mb-12">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#6b6b6b] mb-4">
          <span>{study.category}</span>
          <span>&bull;</span>
          <span>CLIENT: {study.client}</span>
          <span>&bull;</span>
          <span>YEAR: {study.year}</span>
        </div>

        <h1 className="headline-editorial font-light tracking-tight text-[#0a0a0a] mb-6">
          {study.title}
        </h1>

        <p className="text-xl sm:text-2xl font-light text-[#6b6b6b] leading-relaxed">
          {study.summary}
        </p>
      </div>

      {/* Large Featured Browser Mockup */}
      <div className="mb-16">
        <BrowserMockup
          imageSrc={imageAsset.src}
          imageAlt={imageAsset.alt}
          urlHost={`${study.slug}.himnora.com`}
          priority={true}
        />
        <div className="flex items-center justify-between py-3 px-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#0a0a0a]">
          <span>HIMNORA IT SOLUTION ARCHITECTURE</span>
          <span className="font-mono text-[#6b6b6b]">{study.year}</span>
        </div>
      </div>

      {/* Quantitative Results Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {study.results.map((res, i) => (
          <div
            key={i}
            className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm text-center editorial-card"
          >
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a] mb-2">
              {res.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">
              {res.label}
            </div>
          </div>
        ))}
      </div>

      {/* The Challenge & The Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-black/5 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6b6b6b] block mb-4">
            THE CHALLENGE
          </span>
          <h2 className="text-2xl font-light text-[#0a0a0a] mb-4">
            System friction and market headwinds
          </h2>
          <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed">
            {study.challenge}
          </p>
        </div>

        <div className="bg-[#0a0a0a] text-white rounded-[24px] p-8 sm:p-12 border border-white/5 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 block mb-4">
            THE HIMNORA SOLUTION
          </span>
          <h2 className="text-2xl font-light text-white mb-4">
            Engineered elegance & edge performance
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {study.solution}
          </p>
        </div>
      </div>

      {/* Tech Stack & Testimonial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
        {/* Tech Stack Badges */}
        <div className="lg:col-span-5 bg-white rounded-[24px] p-8 sm:p-10 border border-black/5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6b6b6b] block mb-4">
              DEPLOYED STACK
            </span>
            <h3 className="text-2xl font-light text-[#0a0a0a] mb-6">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-[#f5f5f5] text-[#0a0a0a] text-xs font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-black/5">
            <span className="text-xs text-[#6b6b6b]">Production Quality: 100% Type-Safe TypeScript</span>
          </div>
        </div>

        {/* Client Testimonial */}
        {study.testimonial && (
          <div className="lg:col-span-7 bg-[#0a0a0a] text-white rounded-[24px] p-8 sm:p-12 border border-white/5 shadow-sm flex flex-col justify-between">
            <Quote className="w-10 h-10 text-gray-500 mb-6" />
            <blockquote className="text-xl sm:text-2xl font-light text-white leading-relaxed mb-8">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-white">{study.testimonial.author}</div>
                <div className="text-xs text-gray-400">
                  {study.testimonial.role}, {study.testimonial.company}
                </div>
              </div>
              <span className="text-xs font-mono uppercase text-gray-400">Verified Client</span>
            </div>
          </div>
        )}
      </div>

      {/* Next Case Study Navigation */}
      <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-black/5 shadow-sm mb-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b6b6b] block mb-2">
            NEXT CASE STUDY
          </span>
          <h3 className="text-2xl font-light text-[#0a0a0a]">{nextStudy.title}</h3>
          <span className="text-xs text-[#6b6b6b] font-mono mt-1 block">{nextStudy.category}</span>
        </div>
        <div className="shrink-0">
          <CircleCTA
            label="NEXT PROJECT"
            to={`/portfolio/${nextStudy.slug}`}
          />
        </div>
      </div>

      {/* Inquiry Form */}
      <ContactSection />
    </div>
  );
};
