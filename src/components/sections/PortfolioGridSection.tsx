import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../../data/agencyData';
import { IMAGES } from '../../data/images';
import { PortfolioCard, BLUEPRINT_GRID, CornerMarks, useSpotTilt } from './PortfolioCard';
import { BrowserMockup } from '../ui/BrowserMockup';
import { CircleCTA } from '../ui/CircleCTA';
import { RollingNumber } from '../../animations/RollingNumber';

interface PortfolioGridSectionProps {
  limit?: number;
  showAllLink?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

const FeaturedCase: React.FC<{ study: (typeof CASE_STUDIES)[number] }> = ({ study }) => {
  const img = IMAGES[study.imageKey] || IMAGES.work1;
  const { ref, tiltRef, onMove, onLeave } = useSpotTilt<HTMLDivElement>();

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease }}
      className="group"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ backgroundColor: '#0a0a0a', backgroundImage: BLUEPRINT_GRID, backgroundSize: '40px 40px' }}
        className="relative overflow-hidden rounded-[32px] text-white p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(560px circle at var(--mx,50%) var(--my,50%), rgba(255,106,0,0.15), transparent 60%)' }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 w-[26rem] h-[26rem] rounded-full bg-[#ff6a00]/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-20 w-[26rem] h-[26rem] rounded-full bg-[#4f46e5]/20 blur-3xl" />
        <CornerMarks />

        {/* Left: story */}
        <div className="relative lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-sm text-[#ff6a00]">01</span>
            <span className="h-px w-10 bg-white/25" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-300">
              Featured &bull; {study.category}
            </span>
          </div>

          <Link
            to={`/portfolio/${study.slug}`}
            className="text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.05] tracking-[-0.03em] font-extralight"
          >
            <span className="font-extrabold">{study.title.split(' ').slice(0, 2).join(' ')}</span>{' '}
            {study.title.split(' ').slice(2).join(' ')}
          </Link>

          <p className="mt-6 text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg">{study.summary}</p>

          {/* results */}
          <dl className="mt-8 grid grid-cols-3 border-y border-white/10">
            {study.results.slice(0, 3).map((r, i) => (
              <div key={r.label} className={`py-5 ${i > 0 ? 'pl-4 sm:pl-5 border-l border-white/10' : 'pr-4'}`}>
                <dd className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{r.value}</dd>
                <dt className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 leading-snug">{r.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.techStack.slice(0, 5).map((t) => (
              <span key={t} className="text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-gray-300">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 pt-2">
            <CircleCTA label="READ CASE STUDY" to={`/portfolio/${study.slug}`} variant="light" />
          </div>
        </div>

        {/* Right: big mockup with dimension annotations */}
        <div className="relative lg:col-span-7 flex items-center">
          <div className="relative w-full">
            <div className="flex items-center justify-between mb-2 font-mono text-[10px] tracking-widest uppercase text-gray-500">
              <span>{study.client}</span>
              <span>FIG. 01 &mdash; {study.year}</span>
            </div>
            <div
              aria-hidden="true"
              className="h-1.5 mb-3 opacity-60"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 12px)' }}
            />
            <Link to={`/portfolio/${study.slug}`} tabIndex={-1} aria-hidden="true" className="block">
              <div ref={tiltRef} className="transition-transform duration-300 ease-out will-change-transform">
                <BrowserMockup imageSrc={img.src} imageAlt={img.alt} urlHost={`${study.slug}.himnora.com`} priority />
              </div>
            </Link>

            <Link
              to={`/portfolio/${study.slug}`}
              aria-label={`View ${study.title} case study`}
              className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 w-16 h-16 rounded-full bg-[#ff6a00] text-white flex items-center justify-center shadow-xl shadow-black/40 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"
            >
              <ArrowUpRight className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const PortfolioGridSection: React.FC<PortfolioGridSectionProps> = ({ limit = 4, showAllLink = true }) => {
  const studies = limit ? CASE_STUDIES.slice(0, limit) : CASE_STUDIES;
  const [featured, ...rest] = studies;

  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* faint blueprint grid behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 100% at 30% 0%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 100% at 30% 0%, #000 30%, transparent 75%)',
        }}
      />

      {/* Header */}
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14 sm:mb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#0a0a0a] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
            Selected Commissions
          </div>
          <h2 className="text-[clamp(2.4rem,5.8vw,5.4rem)] leading-[1.03] tracking-[-0.04em] text-[#0a0a0a]">
            <span className="font-extrabold">Case studies</span>{' '}
            <span className="font-extralight">in architectural</span>{' '}
            <span className="font-extrabold">precision.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#6b6b6b] max-w-2xl leading-relaxed">
            A selection of high-impact platforms engineered for performance, scale, and uncompromising aesthetic clarity.
          </p>
        </div>

        <div className="flex items-end gap-8 sm:gap-10 shrink-0">
          <div className="text-right" aria-label={`${studies.length} projects`}>
            <div
              className="text-[clamp(4rem,8vw,7rem)] leading-none font-extrabold tracking-[-0.05em] text-transparent"
              style={{ WebkitTextStroke: '1.5px #0a0a0a' }}
            >
              <RollingNumber value={studies.length} className="[&_span]:!text-transparent" />
            </div>
            <div className="mt-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#6b6b6b]">Projects shipped</div>
          </div>
          {showAllLink && (
            <div className="pb-1">
              <CircleCTA label="VIEW ALL WORK" to="/portfolio" />
            </div>
          )}
        </div>
      </div>

      {/* Featured + grid */}
      <div className="relative space-y-10 lg:space-y-14">
        {featured && <FeaturedCase study={featured} />}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 lg:gap-x-10">
            {rest.map((study, i) => (
              <div key={study.id} className={i % 2 === 1 ? 'md:mt-16' : ''}>
                <PortfolioCard study={study} index={i + 1} tone={i % 2 === 0 ? 'navy' : 'black'} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
