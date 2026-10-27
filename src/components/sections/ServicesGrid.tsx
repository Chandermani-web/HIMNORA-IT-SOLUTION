import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Globe, Search, Palette, TrendingUp, Share2, Cpu, Code2, ArrowUpRight, Plus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES } from '../../data/agencyData';
import { IMAGES } from '../../data/images';
import { CircleCTA } from '../ui/CircleCTA';
import { SmartImage } from '../ui/SmartImage';
import { live } from '../../animations/store';

const ICONS: Record<string, LucideIcon> = { Globe, Search, Palette, TrendingUp, Share2, Cpu };
const ease = [0.16, 1, 0.3, 1] as const;

export const ServicesGrid: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const activeImg = (active.imageKey && IMAGES[active.imageKey]) || IMAGES.funFactsThumb;

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header: bold / light / bold */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#0a0a0a] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
            Our Services
          </div>
          <h2 className="text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]">
            <span className="font-extrabold">Engineered</span>{' '}
            <span className="font-extralight">for measurable</span>{' '}
            <span className="font-extrabold">digital impact.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#6b6b6b] max-w-2xl leading-relaxed">
            From bespoke full-stack applications to high-converting SEO engines, we deliver end-to-end digital mastery.
          </p>
        </div>
        <div className="shrink-0 pb-2">
          <CircleCTA label="EXPLORE ALL SERVICES" to="/services" />
        </div>
      </div>

      {/* Interactive showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden rounded-[32px] bg-[#0a0a0a] text-white p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
      >
        <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-[#ff6a00]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 w-[28rem] h-[28rem] rounded-full bg-[#4f46e5]/25 blur-3xl" />

        {/* List */}
        <div className="relative lg:col-span-7 flex flex-col">
          {SERVICES.map((service) => {
            const isActive = service.id === activeId;
            const Icon = ICONS[service.iconName] ?? Code2;
            return (
              <div
                key={service.id}
                onMouseEnter={() => { setActiveId(service.id); live.hoveredServiceId = service.id; }}
                onMouseLeave={() => { live.hoveredServiceId = null; }}
                onFocus={() => setActiveId(service.id)}
                className={`group border-b border-white/10 last:border-b-0 transition-colors duration-500 rounded-2xl ${
                  isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  aria-expanded={isActive}
                  className="w-full flex items-center gap-4 sm:gap-6 text-left px-4 sm:px-6 py-5 sm:py-6"
                >
                  <span className={`font-mono text-sm w-8 shrink-0 transition-colors ${isActive ? 'text-[#ff6a00]' : 'text-gray-500'}`}>
                    {service.number}
                  </span>
                  <span
                    className={`flex-1 text-xl sm:text-3xl tracking-tight leading-tight transition-all duration-500 ${
                      isActive ? 'font-extrabold text-white' : 'font-extralight text-gray-400'
                    }`}
                  >
                    {service.title}
                  </span>
                  <span
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isActive ? 'bg-[#ff6a00] text-white rotate-0' : 'bg-white/10 text-white rotate-90'
                    }`}
                  >
                    {isActive ? <Icon className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-6 pl-[3.5rem] sm:pl-[5.25rem]">
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                          {service.shortDescription}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {service.deliverables.slice(0, 3).map((d) => (
                            <span key={d} className="text-[11px] font-medium tracking-wide border border-white/15 bg-white/5 text-gray-200 px-3 py-1.5 rounded-full">
                              {d}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/services/${service.id}`}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white hover:text-[#ff6a00] transition-colors"
                        >
                          Learn more <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Preview panel */}
        <div className="relative lg:col-span-5 min-h-[320px] lg:min-h-0">
          <div className="lg:sticky lg:top-28 h-[320px] sm:h-[420px] lg:h-[520px] rounded-[24px] overflow-hidden ring-1 ring-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={activeImg.src}
                  alt={activeImg.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-mono text-xs text-[#ff6a00]">{active.number} / 0{SERVICES.length}</span>
                  <p className="mt-2 text-2xl font-extrabold tracking-tight">{active.title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
