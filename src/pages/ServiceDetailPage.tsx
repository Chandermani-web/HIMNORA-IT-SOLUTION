import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES, CASE_STUDIES } from '../data/agencyData';
import { ArrowCircleButton } from '../components/ui/ArrowCircleButton';
import { CircleCTA } from '../components/ui/CircleCTA';
import { Check, ArrowLeft } from 'lucide-react';
import { ContactSection } from '../components/sections/ContactSection';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedCaseStudy = CASE_STUDIES.find(
    (cs) => cs.slug === service.featuredProjectSlug
  ) || CASE_STUDIES[0];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-4xl mb-16">
        <div className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-[#6b6b6b] mb-4">
          <span className="font-mono">{service.number}</span>
          <span>&bull;</span>
          <span>DISCIPLINE SPECIFICATION</span>
        </div>

        <h1 className="headline-editorial font-light tracking-tight text-[#0a0a0a] mb-6">
          {service.title}
        </h1>

        <p className="text-xl sm:text-2xl font-light text-[#6b6b6b] leading-relaxed">
          {service.fullDescription}
        </p>

        <div className="mt-8">
          <CircleCTA label="INQUIRE ABOUT THIS SERVICE" to={`/contact?service=${encodeURIComponent(service.title)}`} />
        </div>
      </div>

      {/* Deliverables & Technology Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
        {/* Deliverables: White rounded card */}
        <div className="lg:col-span-7 bg-white rounded-[24px] p-8 sm:p-12 border border-black/5 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#6b6b6b] block mb-4">
            CORE DELIVERABLES & PHASES
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#0a0a0a] mb-8">
            What you receive upon commission
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#f9f9f9] border border-black/5 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#0a0a0a] leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Standards: Black rounded card */}
        <div className="lg:col-span-5 bg-[#0a0a0a] text-white rounded-[24px] p-8 sm:p-12 border border-white/5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 block mb-4">
              ARCHITECTURAL FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-6">
              Modern Tech Stack
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
              We build strictly with type-safe, proven, production-grade tools and zero bloat.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 text-white text-xs font-mono tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8">
            <span className="text-xs font-mono text-gray-400 block mb-1">BENCHMARK SLA</span>
            <span className="text-sm font-light text-white">100% Core Web Vitals Pass Guarantee</span>
          </div>
        </div>
      </div>

      {/* Featured Case Study Cross-link */}
      {relatedCaseStudy && (
        <div className="mb-20 bg-white rounded-[24px] p-8 sm:p-12 border border-black/5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6b6b6b] block mb-2">
                PROVEN EXECUTION EXAMPLE
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#0a0a0a]">
                {relatedCaseStudy.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6b6b6b] mt-2 max-w-xl">
                {relatedCaseStudy.summary}
              </p>
            </div>
            <div className="shrink-0">
              <CircleCTA
                label="READ CASE STUDY"
                to={`/portfolio/${relatedCaseStudy.slug}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Embedded Contact Form */}
      <ContactSection initialService={service.title} />
    </div>
  );
};
