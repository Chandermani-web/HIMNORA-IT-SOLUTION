import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from './register';
import { live } from './store';
import { prefersReducedMotion } from './useReducedMotion';

interface Props {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
  /** seconds for one full loop at rest */
  duration?: number;
}

/** Infinite ribbon. Direction follows scroll direction, speed + skew follow scroll velocity. */
export const MarqueeLoop: React.FC<Props> = ({
  items,
  className = '',
  itemClassName = '',
  separator = <span className="text-[#ff6a00]">&#10022;</span>,
  duration = 32,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const loop = gsap.to(track, { xPercent: -50, duration, ease: 'none', repeat: -1 });
    let dir = 1;
    let ts = 1;
    let skew = 0;

    const tick = () => {
      const v = live.scrollVelocity;
      if (Math.abs(v) > 0.05) dir = v > 0 ? 1 : -1;
      const targetTs = dir * (1 + Math.min(Math.abs(v), 60) / 12);
      ts += (targetTs - ts) * 0.08;
      loop.timeScale(ts);
      const targetSkew = gsap.utils.clamp(-6, 6, v * 0.15);
      skew += (targetSkew - skew) * 0.1;
      gsap.set(track, { skewX: -skew });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      loop.kill();
      gsap.set(track, { clearProps: 'all' });
    };
  }, [duration, items]);

  const row = (suffix: string) =>
    items.map((item, i) => (
      <React.Fragment key={`${suffix}-${i}`}>
        <span className={`whitespace-nowrap ${itemClassName}`}>{item}</span>
        <span aria-hidden="true" className="mx-6 sm:mx-10 inline-flex items-center">
          {separator}
        </span>
      </React.Fragment>
    ));

  return (
    <div className={`overflow-hidden ${className}`} aria-label={items.join(', ')} role="group">
      <div ref={trackRef} className="flex w-max items-center" aria-hidden="true">
        <div className="flex items-center">{row('a')}</div>
        <div className="flex items-center">{row('b')}</div>
      </div>
    </div>
  );
};
