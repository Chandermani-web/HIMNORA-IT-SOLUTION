import { useEffect, type RefObject } from 'react';
import { gsap } from './register';

/** Element drifts toward the pointer while it is near (desktop pointers only). */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.35, radius = 110) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + radius;
      qx(near ? dx * strength : 0);
      qy(near ? dy * strength : 0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'x,y' });
    };
  }, [ref, strength, radius]);
}
