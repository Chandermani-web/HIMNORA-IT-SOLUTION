import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudy } from '../../data/agencyData';
import { IMAGES } from '../../data/images';
import { BrowserMockup } from '../ui/BrowserMockup';

interface PortfolioCardProps {
  study: CaseStudy;
  priority?: boolean;
  /** zero-based position, used for the "01" index and entrance delay */
  index?: number;
  tone?: 'black' | 'navy';
}

const ease = [0.16, 1, 0.3, 1] as const;

/** Pointer spotlight + subtle 3D tilt of the mockup. Desktop pointers only. */
export function useSpotTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !fine()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    if (tiltRef.current) {
      tiltRef.current.style.transform = `perspective(1100px) rotateY(${(x - 0.5) * 7}deg) rotateX(${(0.5 - y) * 6}deg) translateZ(0)`;
    }
  };
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg)';
  };
  return { ref, tiltRef, onMove, onLeave };
}

export const BLUEPRINT_GRID =
  'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)';

/** four crop-mark brackets in the card corners */
export const CornerMarks: React.FC<{ className?: string }> = ({ className = 'text-white/25' }) => (
  <>
    {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map(
      (pos) => (
        <span key={pos} aria-hidden="true" className={`pointer-events-none absolute w-3.5 h-3.5 ${pos} ${className}`} />
      )
    )}
  </>
);

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ study, priority = false, index = 0, tone = 'black' }) => {
  const imageAsset = IMAGES[study.imageKey] || IMAGES.work1;
  const { ref, tiltRef, onMove, onLeave } = useSpotTilt<HTMLDivElement>();
  const bg = tone === 'navy' ? '#0a1030' : '#0a0a0a';
  const lead = study.results[0];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease, delay: (index % 2) * 0.12 }}
      className="group flex flex-col"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ backgroundColor: bg, backgroundImage: BLUEPRINT_GRID, backgroundSize: '36px 36px' }}
        className="relative overflow-hidden rounded-[28px] text-white p-6 sm:p-8 flex flex-col border border-white/10 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-1.5"
      >
        {/* pointer spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(255,106,0,0.16), transparent 60%)' }}
        />
        <CornerMarks />

        {/* meta row */}
        <div className="relative flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-[#ff6a00]">{num}</span>
            <span className="h-px w-8 bg-white/25" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-300">{study.category}</span>
          </div>
          <span className="font-mono text-xs text-gray-400">{study.year}</span>
        </div>

        {/* title + arrow */}
        <div className="relative flex items-start justify-between gap-4">
          <Link
            to={`/portfolio/${study.slug}`}
            className="text-2xl sm:text-[1.9rem] leading-[1.1] tracking-[-0.02em] font-extralight hover:text-white transition-colors line-clamp-3"
          >
            <span className="font-extrabold">{study.title.split(' ').slice(0, 2).join(' ')}</span>{' '}
            {study.title.split(' ').slice(2).join(' ')}
          </Link>
          <Link
            to={`/portfolio/${study.slug}`}
            aria-label={`View ${study.title} case study`}
            className="shrink-0 w-12 h-12 rounded-full bg-white text-[#0a0a0a] flex items-center justify-center transition-all duration-500 group-hover:bg-[#ff6a00] group-hover:text-white group-hover:rotate-45"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        {/* mockup with ruler + floating metric */}
        <div className="relative mt-8">
          <div className="flex items-center justify-between mb-2 font-mono text-[10px] tracking-widest uppercase text-gray-500">
            <span>{study.client}</span>
            <span>16 : 10</span>
          </div>
          <div
            aria-hidden="true"
            className="h-1.5 mb-3 opacity-60"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 12px)' }}
          />
          <Link to={`/portfolio/${study.slug}`} tabIndex={-1} aria-hidden="true" className="block">
            <div ref={tiltRef} className="transition-transform duration-300 ease-out will-change-transform">
              <BrowserMockup
                imageSrc={imageAsset.src}
                imageAlt={imageAsset.alt}
                urlHost={`${study.slug}.himnora.com`}
                priority={priority}
              />
            </div>
          </Link>

          {lead && (
            <div className="absolute -bottom-5 left-4 sm:left-6 rounded-2xl bg-[#ff6a00] text-white px-4 py-3 shadow-xl shadow-black/40 rotate-[-2deg] transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">{lead.value}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/85">{lead.label}</div>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="relative mt-12 pt-5 border-t border-white/10 flex flex-wrap gap-2">
          {study.techStack.slice(0, 4).map((t) => (
            <span key={t} className="text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-gray-300">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* caption bar */}
      <div className="flex items-center justify-between py-3 px-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#0a0a0a]">
        <span>HIMNORA IT SOLUTION</span>
        <span className="font-mono text-[#6b6b6b]">FIG. {num}</span>
      </div>
    </motion.article>
  );
};
