import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from './register';
import { live } from './store';
import { prefersReducedMotion } from './useReducedMotion';

let instance: Lenis | null = null;
export const getLenis = () => instance;

/** Smooth scroll synced with ScrollTrigger. Disabled for reduced motion. */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    instance = lenis;

    const onScroll = () => {
      live.scrollVelocity = lenis.velocity;
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      instance = null;
    };
  }, []);
}

export const stopScroll = () => getLenis()?.stop();
export const startScroll = () => getLenis()?.start();
export const scrollToTopNow = () => {
  const l = getLenis();
  if (l) l.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
};
