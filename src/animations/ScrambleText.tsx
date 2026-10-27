import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from './register';
import { onAppReady } from './store';
import { prefersReducedMotion } from './useReducedMotion';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

/** Decodes the text with ScrambleTextPlugin once the app is ready. SR users always get the final text. */
export const ScrambleText: React.FC<Props> = ({ text, className, delay = 0.2 }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const el = ref.current;
    el.textContent = '';
    let tween: gsap.core.Tween | undefined;

    const off = onAppReady(() => {
      tween = gsap.to(el, {
        duration: 1.6,
        delay,
        scrambleText: { text, chars: 'upperCase', speed: 0.6 },
      });
    });

    return () => {
      off();
      tween?.kill();
      el.textContent = text;
    };
  }, [text, delay]);

  return (
    <span className={className} aria-label={text}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
};
