import React, { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../../animations/register';
import { prefersReducedMotion } from '../../animations/useReducedMotion';

export const ScrollProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9990] h-[2px] w-full origin-left bg-[#ff6a00] pointer-events-none"
      style={{ transform: 'scaleX(0)' }}
    />
  );
};
