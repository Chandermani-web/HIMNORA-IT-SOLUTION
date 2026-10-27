import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { CircleCTA } from '../ui/CircleCTA';

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Blogs', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll hide/reveal
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out border-b border-black/[0.04] bg-[#f5f5f5]/85 backdrop-blur-md ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links (Essentials only) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: linkActive }) =>
                    `group relative py-2 text-sm font-semibold tracking-wide transition-colors ${
                      linkActive || isActive ? 'text-[#0a0a0a]' : 'text-[#6b6b6b] hover:text-[#0a0a0a]'
                    }`
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {item.name}
                    {/* Active dot */}
                    {(isActive || location.pathname === item.path) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" aria-hidden="true" />
                    )}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action: Circle CTA */}
          <div className="hidden md:flex items-center">
            <CircleCTA label="LET'S TALK" to="/contact" size="sm" />
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0a0a0a] transition-colors"
              aria-label="Open mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Black Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
        >
          {/* Header in Drawer */}
          <div className="flex items-center justify-between">
            <Logo variant="light" onClick={() => setIsMobileMenuOpen(false)} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Navigation Links */}
          <nav className="flex flex-col gap-6 my-auto py-8" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item, idx) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-2 border-b border-white/10"
                >
                  <span
                    className={`text-3xl sm:text-4xl font-light tracking-tight transition-colors ${
                      isActive ? 'text-white font-normal' : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-xs font-mono text-gray-500">0{idx + 1}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Drawer Footer CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <CircleCTA
              label="LET'S TALK"
              to="/contact"
              variant="light"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <span className="text-xs text-gray-400 tracking-wider">visionhuntitsolution@gmail.com</span>
          </div>
        </div>
      )}
    </>
  );
};
