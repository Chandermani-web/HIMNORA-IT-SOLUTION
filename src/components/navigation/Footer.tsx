import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { CircleCTA } from '../ui/CircleCTA';
import { AGENCY_INFO, SERVICES } from '../../data/agencyData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full m-0 p-0 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-8">
        {/* Top banner / callout */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 mb-3 block">
              READY TO SCALE?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Let&apos;s build an extraordinary digital presence together.
            </h2>
          </div>
          <div className="shrink-0">
            <CircleCTA label="HIRE US NOW" to="/contact" variant="light" />
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mt-4">
              Himnora IT Solution is a high-precision digital design and engineering studio. We turn complex digital challenges into elegant, high-converting platforms.
            </p>
            <div className="pt-2 text-xs text-gray-400 font-mono">
              <p>Email: <a href={`mailto:${AGENCY_INFO.email}`} className="text-white hover:underline">{AGENCY_INFO.email}</a></p>
              <p className="mt-1">Phone: <a href="tel:+918607653657" className="text-white hover:underline">{AGENCY_INFO.phone}</a></p>
            </div>
          </div>

          {/* Quick Links (Includes secondary routes kept from old navbar) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Company</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">All Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio & Work</Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-white transition-colors">Our Process</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
              Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`} className="hover:text-white transition-colors line-clamp-1">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/quote" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 mt-2">
                  <span>Request Custom Quote &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Office & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
              Studio & Press
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {AGENCY_INFO.address.line1}<br />
              {AGENCY_INFO.address.line2}<br />
              {AGENCY_INFO.address.city}, {AGENCY_INFO.address.state}
            </p>
            <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
              <div>
                <Link to="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Blog & Insights
                </Link>
              </div>
              <div>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            &copy; 2026 Himnora IT Solution. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {AGENCY_INFO.socials.map((soc) => (
              <a
                key={soc.platform}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {soc.platform}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
