import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from './register';
import { prefersReducedMotion } from './useReducedMotion';

interface Props {
  value: number;
  decimals?: number;
  className?: string;
}

const ROWS = Array.from({ length: 20 }, (_, i) => i % 10);

/** Odometer-style number: each digit is a masked vertical strip that rolls into place. */
export const RollingNumber: React.FC<Props> = ({ value, decimals = 0, className = '' }) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const text = value.toFixed(decimals);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const strips = Array.from(root.querySelectorAll<HTMLElement>('[data-strip]'));
    const finalY = (el: HTMLElement) => -(10 + Number(el.dataset.digit)) * 5;

    if (prefersReducedMotion()) {
      strips.forEach((s) => gsap.set(s, { yPercent: finalY(s) }));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(strips, { yPercent: 0 });
      gsap.to(strips, {
        yPercent: (_i, el) => finalY(el as HTMLElement),
        duration: 2.3,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: 'top 88%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [text]);

  return (
    <span
      ref={rootRef}
      className={`inline-flex items-baseline tabular-nums ${className}`}
      aria-label={text}
      role="text"
    >
      {text.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom" style={{ height: '1em', lineHeight: 1 }}>
            <span data-strip data-digit={ch} className="flex flex-col will-change-transform">
              {ROWS.map((d, r) => (
                <span key={r} className="block" style={{ height: '1em', lineHeight: 1 }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden="true" style={{ lineHeight: 1 }}>
            {ch}
          </span>
        )
      )}
    </span>
  );
};
