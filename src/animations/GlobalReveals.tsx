import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger, SplitText } from './register';
import { onAppReady, isAppReady } from './store';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * Applies the shared text-reveal language to every page:
 *  - <h2> headings: SplitText line-mask rise (keeps the bold / extralight word mix intact)
 *  - body paragraphs: soft fade + blur + rise, once
 * Anything inside [data-no-reveal] (e.g. the hero) manages its own animation.
 */
export function GlobalReveals() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const main = document.querySelector('main');
      if (!main) return;

      ctx = gsap.context(() => {
        main.querySelectorAll<HTMLElement>('h2').forEach((el) => {
          if (el.closest('[data-no-reveal]')) return;
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            linesClass: 'split-line',
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                ease: 'himnora',
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
              }),
          });
        });

        const paragraphs = Array.from(main.querySelectorAll<HTMLElement>('p')).filter(
          (p) => !p.closest('[data-no-reveal], form, footer')
        );
        paragraphs.forEach((p) => {
          gsap.from(p, {
            opacity: 0,
            y: 16,
            filter: 'blur(6px)',
            duration: 0.9,
            ease: 'himnora',
            clearProps: 'filter,transform,opacity',
            scrollTrigger: { trigger: p, start: 'top 90%', once: true },
          });
        });
      }, main);

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    };

    let off: (() => void) | null = null;
    const onRoute = () => {
      window.removeEventListener('himnora:route-ready', onRoute);
      setup();
    };

    if (!isAppReady()) {
      // first load: wait for the preloader to finish
      off = onAppReady(setup);
    } else {
      window.addEventListener('himnora:route-ready', onRoute);
      // safety net: if no transition announces the route (e.g. same-layout change)
      const t = window.setTimeout(onRoute, 1800);
      off = () => window.clearTimeout(t);
    }

    return () => {
      cancelled = true;
      off?.();
      window.removeEventListener('himnora:route-ready', onRoute);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
