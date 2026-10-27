import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../../animations/register';
import { setAppReady, onSceneReady } from '../../animations/store';
import { prefersReducedMotion } from '../../animations/useReducedMotion';
import { stopScroll, startScroll } from '../../animations/useLenis';

const SESSION_KEY = 'himnora_loaded';

const alreadyLoaded = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

export const Preloader: React.FC = () => {
  const [skip] = useState(() => alreadyLoaded() || prefersReducedMotion());
  const [done, setDone] = useState(skip);

  const wrapRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const fillRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    if (skip) {
      setAppReady();
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    stopScroll();

    const counter = { v: 0 };
    const writeCounter = () => {
      if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
    };

    const ctx = gsap.context(() => {
      gsap.set(orangeRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(blackRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(fillRef.current, { opacity: 0 });
      gsap.set(dotRef.current, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(wordRef.current, { letterSpacing: '0.6em', opacity: 0 });

      // 1) logo draw → fill → dot pop, word tightens, counter climbs to 90
      const intro = gsap.timeline();
      intro
        .fromTo(strokeRef.current, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power3.inOut' }, 0)
        .to(fillRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.0)
        .to(dotRef.current, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.6)' }, 1.25)
        .to(wordRef.current, { letterSpacing: '0.05em', opacity: 1, duration: 1.4, ease: 'himnora' }, 0.4)
        .to(counter, { v: 90, duration: 2.2, ease: 'power2.out', onUpdate: writeCounter }, 0);

      // 2) wait for: min time + fonts + first 3D frame (capped)
      const minTime = new Promise<void>((r) => gsap.delayedCall(2.4, r));
      const fonts = document.fonts?.ready ?? Promise.resolve();
      const scene = new Promise<void>((r) => {
        onSceneReady(r);
        gsap.delayedCall(4.5, r); // never block forever
      });

      Promise.all([minTime, fonts, scene]).then(() => {
        gsap
          .timeline({
            onComplete: () => {
              try {
                sessionStorage.setItem(SESSION_KEY, '1');
              } catch {
                /* ignore */
              }
              document.documentElement.style.overflow = '';
              startScroll();
              setDone(true);
            },
          })
          .to(counter, { v: 100, duration: 0.35, ease: 'power1.out', onUpdate: writeCounter })
          // two-layer curtain: black lifts, then orange lifts
          .add(() => setAppReady(), '+=0.1')
          .to(blackRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'power3.inOut' }, '<')
          .to(orangeRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'power3.inOut' }, '-=0.72');
      });
    }, wrapRef);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = '';
      startScroll();
    };
  }, [skip]);

  if (done) return null;

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[10000]" role="status" aria-label="Loading Himnora IT Solution">
      <div ref={orangeRef} className="absolute inset-0 bg-[#ff6a00]" />
      <div ref={blackRef} className="absolute inset-0 bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-24 h-24" fill="none" aria-hidden="true">
          <g ref={fillRef}>
            <rect x="9" y="8" width="2.4" height="16" fill="#fff" />
            <rect x="20.6" y="8" width="2.4" height="16" fill="#fff" />
            <rect x="9" y="15" width="14" height="2.2" fill="#fff" />
          </g>
          <path
            ref={strokeRef}
            d="M10.2 8 V24 M21.8 8 V24 M10.2 16 H21.8"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinecap="square"
          />
          <circle ref={dotRef} cx="25.5" cy="7" r="1.9" fill="#ff6a00" />
        </svg>
        <div ref={wordRef} className="mt-8 text-xl sm:text-2xl font-extrabold uppercase">
          HIMNORA
        </div>
        <span
          ref={counterRef}
          className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 font-mono text-5xl sm:text-7xl font-extralight tabular-nums text-white/90"
          aria-hidden="true"
        >
          000
        </span>
      </div>
    </div>
  );
};
