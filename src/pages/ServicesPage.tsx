import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/agencyData';
import { IMAGES } from '../data/images';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ArrowCircleButton } from '../components/ui/ArrowCircleButton';
import { CircleCTA } from '../components/ui/CircleCTA';
import { SmartImage } from '../components/ui/SmartImage';
import { Check } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-16">
        <SectionHeader
          eyebrow="CAPABILITIES & PRACTICE AREAS"
          title="Engineered for high velocity and sustained market dominance."
          subtitle="Explore our six core disciplines. Each service is executed by senior product architects and engineers committed to zero technical debt."
        />
        <div className="pt-4">
          <CircleCTA label="START A COMMISSION" to="/contact" />
        </div>
      </div>

      {/* Alternating Services List:
          Odd (index 0, 2, 4): Content LEFT, Image RIGHT
          Even (index 1, 3, 5): Image LEFT, Content RIGHT
      */}
      <div className="space-y-12 sm:space-y-16">
        {SERVICES.map((service, index) => {
          // index 0 -> isImageRight = true (content left, image right)
          // index 1 -> isImageRight = false (image left, content right)
          const isImageRight = index % 2 === 0;
          const isFeaturedDark = index === 1 || index === 5; // select dark cards for high contrast aesthetic
          const imageAsset = (service.imageKey && IMAGES[service.imageKey]) || IMAGES.funFactsThumb;

          return (
            <div
              key={service.id}
              className={`rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border transition-all duration-300 editorial-card ${
                isFeaturedDark
                  ? 'bg-[#0a0a0a] text-white border-white/10 shadow-xl'
                  : 'bg-white text-[#0a0a0a] border-black/5 shadow-sm'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Content Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-between ${
                    isImageRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    {/* Top Eyebrow Row */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`font-mono text-sm font-bold ${
                          isFeaturedDark ? 'text-gray-400' : 'text-[#6b6b6b]'
                        }`}
                      >
                        {service.number}
                      </span>
                      <span
                        className={`text-xs uppercase font-mono tracking-widest ${
                          isFeaturedDark ? 'text-gray-400' : 'text-[#6b6b6b]'
                        }`}
                      >
                        CORE PRACTICE
                      </span>
                    </div>

                    {/* Service Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light tracking-tight leading-tight mb-4">
                      <Link to={`/services/${service.id}`} className="hover:underline">
                        {service.title}
                      </Link>
                    </h2>

                    {/* Full Description */}
                    <p
                      className={`text-sm sm:text-base leading-relaxed mb-6 ${
                        isFeaturedDark ? 'text-gray-300' : 'text-[#6b6b6b]'
                      }`}
                    >
                      {service.fullDescription}
                    </p>

                    {/* Key Deliverables */}
                    <div className="mb-6 pt-6 border-t border-current/10">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider block mb-3 ${
                          isFeaturedDark ? 'text-gray-400' : 'text-[#6b6b6b]'
                        }`}
                      >
                        Core Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.deliverables.slice(0, 4).map((item, idx) => (
                          <div
                            key={idx}
                            className={`text-xs sm:text-sm flex items-start gap-2.5 ${
                              isFeaturedDark ? 'text-gray-200' : 'text-[#0a0a0a]'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isFeaturedDark ? 'bg-white/10 text-white' : 'bg-black/5 text-[#0a0a0a]'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5" />
                            </span>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`text-[11px] font-mono px-3 py-1 rounded-md ${
                              isFeaturedDark
                                ? 'bg-white/10 text-white'
                                : 'bg-[#f5f5f5] text-[#0a0a0a]'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-current/10 flex items-center justify-between">
                    <CircleCTA
                      label="DISCUSS THIS SERVICE"
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      variant={isFeaturedDark ? 'light' : 'dark'}
                    />
                    <ArrowCircleButton
                      to={`/services/${service.id}`}
                      ariaLabel={`Deep dive into ${service.title}`}
                      variant={isFeaturedDark ? 'white' : 'black'}
                    />
                  </div>
                </div>

                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isImageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-lg border border-black/5 aspect-[16/11] group/img bg-[#121212]">
                    <SmartImage
                      src={imageAsset.src}
                      alt={imageAsset.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                      aspectRatio="16/11"
                    />

                    {/* Subtle aesthetic overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[11px] font-mono uppercase tracking-wider px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                      <span>{service.title}</span>
                      <span>HIMNORA PRACTICE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
