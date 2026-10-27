import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../animations/register';
import { prefersReducedMotion } from '../../animations/useReducedMotion';
import { startScroll, stopScroll, scrollToTopNow } from '../../animations/useLenis';

const TITLES: Record<string, string> = {
  '/': 'Home',
  '/services': 'Services',
  '/portfolio': 'Portfolio',
  '/work': 'Portfolio',
  '/about': 'About',
  '/process': 'Process',
  '/pricing': 'Pricing',
  '/quote': 'Get a Quote',
  '/blog': 'Insights',
  '/insights': 'Insights',
  '/contact': 'Contact',
  '/privacy': 'Privacy',
  '/terms': 'Terms',
};

const titleFor = (pathname: string) => {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith('/services/')) return 'Service';
  if (pathname.startsWith('/portfolio/') || pathname.startsWith('/case-study/')) return 'Case Study';
  if (pathname.startsWith('/blog/')) return 'Article';
  return 'Himnora';
};

const COVER = 'inset(0% 0% 0% 0%)';
const BELOW = 'inset(100% 0% 0% 0%)';
const ABOVE = 'inset(0% 0% 100% 0%)';

/** Double-curtain route transitions (orange → black), also covers back/forward. */
export const PageTransition: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navType = useNavigationType();

  const wrapRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const busy = useRef(false);
  const pendingExit = useRef(false);
  const firstRun = useRef(true);

  const announceRouteReady = () => {
    // two frames later so the new route has mounted and listeners are attached
    requestAnimationFrame(() =>
      requestAnimationFrame(() => window.dispatchEvent(new Event('himnora:route-ready')))
    );
  };

  const exit = () => {
    scrollToTopNow();
    ScrollTrigger.refresh();
    announceRouteReady();
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(wrapRef.current, { pointerEvents: 'none' });
          startScroll();
          busy.current = false;
          ScrollTrigger.refresh();
        },
      })
      .to(blackRef.current, { clipPath: ABOVE, duration: 0.7, ease: 'power3.inOut' }, 0.15)
      .to(orangeRef.current, { clipPath: ABOVE, duration: 0.7, ease: 'power3.inOut' }, 0.3);
  };

  // Intercept internal link clicks (capture phase, before React Router sees them)
  useEffect(() => {
    const run = (path: string, pathname: string) => {
      if (busy.current) return;
      if (prefersReducedMotion()) {
        navigate(path);
        return;
      }
      busy.current = true;
      stopScroll();
      gsap.set(wrapRef.current, { pointerEvents: 'auto' });
      if (labelRef.current) labelRef.current.textContent = '';

      gsap
        .timeline({
          onComplete: () => {
            pendingExit.current = true;
            navigate(path);
          },
        })
        .fromTo(orangeRef.current, { clipPath: BELOW }, { clipPath: COVER, duration: 0.7, ease: 'power3.inOut' }, 0)
        .fromTo(blackRef.current, { clipPath: BELOW }, { clipPath: COVER, duration: 0.7, ease: 'power3.inOut' }, 0.12)
        .to(
          labelRef.current,
          { duration: 0.6, scrambleText: { text: titleFor(pathname), chars: 'upperCase', speed: 0.6 } },
          0.5
        );
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      e.preventDefault();
      e.stopPropagation();
      run(url.pathname + url.search + url.hash, url.pathname);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  // After the route actually changed
  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (pendingExit.current) {
      pendingExit.current = false;
      exit();
    } else if (navType === 'POP' && !prefersReducedMotion()) {
      // browser back/forward: cover instantly, then reveal
      busy.current = true;
      gsap.set(wrapRef.current, { pointerEvents: 'auto' });
      gsap.set([orangeRef.current, blackRef.current], { clipPath: COVER });
      if (labelRef.current) labelRef.current.textContent = titleFor(location.pathname).toUpperCase();
      exit();
    } else {
      scrollToTopNow();
      announceRouteReady();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      <div ref={orangeRef} className="absolute inset-0 bg-[#ff6a00]" style={{ clipPath: BELOW }} />
      <div
        ref={blackRef}
        className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center"
        style={{ clipPath: BELOW }}
      >
        <div
          ref={labelRef}
          className="text-white font-extrabold uppercase tracking-tight text-[clamp(2.5rem,9vw,8rem)]"
        />
      </div>
    </div>
  );
};
