import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CircleCTA } from '../components/ui/CircleCTA';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
      <SectionHeader
        eyebrow="404 EXCEPTION"
        title="Page not found in our architecture."
        subtitle="The route you requested does not exist or may have been relocated during our platform upgrade."
        align="center"
      />

      <div className="bg-[#0a0a0a] text-white rounded-[24px] p-8 sm:p-12 max-w-xl mx-auto my-10 border border-white/5 shadow-xl">
        <span className="font-mono text-5xl sm:text-6xl font-light text-gray-400 block mb-4">
          404
        </span>
        <p className="text-sm text-gray-300 leading-relaxed mb-8">
          Looking for our practice areas or case studies? Navigate using our primary channels below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/services"
            className="text-xs font-semibold uppercase tracking-wider text-white underline underline-offset-4 hover:opacity-80"
          >
            All Services
          </Link>
          <span className="text-gray-600">&bull;</span>
          <Link
            to="/portfolio"
            className="text-xs font-semibold uppercase tracking-wider text-white underline underline-offset-4 hover:opacity-80"
          >
            Case Studies
          </Link>
          <span className="text-gray-600">&bull;</span>
          <Link
            to="/contact"
            className="text-xs font-semibold uppercase tracking-wider text-white underline underline-offset-4 hover:opacity-80"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      <div>
        <CircleCTA label="RETURN TO HOMEPAGE" to="/" />
      </div>
    </div>
  );
};
