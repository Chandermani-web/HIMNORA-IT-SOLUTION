import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { AGENCY_INFO } from '../../data/agencyData';
import { IMAGES } from '../../data/images';
import { SmartImage } from '../ui/SmartImage';
import { RollingNumber } from '../../animations/RollingNumber';
import { CircleCTA } from '../ui/CircleCTA';

const ease = [0.16, 1, 0.3, 1] as const;

export const StatsBento: React.FC = () => {
  const { stats } = AGENCY_INFO;

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
        {/* LEFT: tall grayscale photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-5"
        >
          <div className="relative lg:sticky lg:top-28 h-[480px] sm:h-[620px] lg:h-[750px] rounded-[28px] overflow-hidden img-zoom-container shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
            <SmartImage
              src={IMAGES.funFactsMain.src}
              alt={IMAGES.funFactsMain.alt}
              className="w-full h-full object-cover grayscale contrast-110"
              aspectRatio="4/5"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <span className="backdrop-blur-md bg-white/15 border border-white/25 text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                Himnora Studio
              </span>
              <span className="w-10 h-10 rounded-full bg-white text-[#0a0a0a] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[#0a0a0a] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
            Fun Facts
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="text-[clamp(2rem,4.4vw,4rem)] leading-[1.1] tracking-[-0.03em] text-[#0a0a0a]"
          >
            <span className="font-extrabold">Consistently delivering</span>{' '}
            <span className="font-extralight">impactful results through a perfect blend of</span>{' '}
            <span className="font-extrabold">design and functionality.</span>
          </motion.h2>

          {/* Bento */}
          <div className="mt-10 lg:mt-auto pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Projects card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.05 }}
                className="editorial-card bg-white p-6 sm:p-8 flex items-center justify-between gap-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.18)] border border-black/5 min-h-[150px]"
              >
                <span className="text-lg sm:text-xl leading-snug text-[#555] max-w-[9ch] sm:max-w-[12ch]">
                  Successful projects completed
                </span>
                <div className="text-5xl sm:text-6xl font-normal tracking-tight text-[#0a0a0a] whitespace-nowrap">
                  <RollingNumber value={stats.projectsCompleted} />
                  <span className="text-[#d4d4d4]">+</span>
                </div>
              </motion.div>

              {/* Dark card with thumbnail */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.15 }}
                className="editorial-card relative flex-1 min-h-[300px] bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center gap-6 p-8 border border-white/5"
              >
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#ff6a00]/25 blur-3xl" />
                <div className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-[#4f46e5]/30 blur-3xl" />
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl rotate-[-4deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <SmartImage
                    src={IMAGES.funFactsThumb.src}
                    alt={IMAGES.funFactsThumb.alt}
                    className="w-full h-full object-cover"
                    aspectRatio="1/1"
                  />
                </div>
                <div className="relative text-center">
                  <p className="text-white text-base font-medium">Zero compromises on performance</p>
                  <p className="text-xs text-gray-400 mt-1 tracking-wide">Core Web Vitals &bull; 99+ Green</p>
                </div>
              </motion.div>
            </div>

            {/* Column 2: rating card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="editorial-card bg-white p-6 sm:p-8 flex flex-col shadow-[0_10px_40px_-20px_rgba(0,0,0,0.18)] border border-black/5"
            >
              <div className="flex items-center gap-1.5" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -40 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.09, type: 'spring', stiffness: 260, damping: 14 }}
                  >
                    <Star className="w-5 h-5 fill-[#ff6a00] text-[#ff6a00]" />
                  </motion.span>
                ))}
              </div>

              <div className="mt-4 text-[clamp(4rem,8vw,6.5rem)] leading-none font-normal tracking-[-0.05em] text-[#0a0a0a]">
                <RollingNumber value={stats.ratingScore} decimals={1} />
                <span>/5</span>
              </div>

              <hr className="my-8 border-black/10" />

              <p className="text-lg text-[#555] leading-relaxed">
                We offer end-to-end creative solutions that make brands unforgettable.
              </p>

              <div className="mt-auto pt-10">
                <CircleCTA label="HIRE US NOW" to="/contact" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
