import React, { useEffect, useRef } from 'react';

/** Zero-WebGL, zero-motion stand-in: layered gradients + the SVG "H". */
export const StaticFallback: React.FC<{ visible: boolean }> = ({ visible }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const sp = Math.min(window.scrollY / window.innerHeight, 1.3);
      const fade = 1 - Math.min(Math.max((sp - 0.35) / 0.6, 0), 1);
      ref.current.style.opacity = visible ? String(fade) : '0';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  return (
    <div ref={ref} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 78% 45%, rgba(255,106,0,0.14), transparent 70%), radial-gradient(45% 45% at 15% 85%, rgba(10,16,48,0.08), transparent 70%)',
        }}
      />
      <svg
        viewBox="0 0 32 32"
        className="absolute hidden md:block right-[6%] top-1/2 -translate-y-1/2 w-[34vw] max-w-[460px] opacity-[0.92]"
        fill="none"
      >
        <rect x="8" y="6" width="5" height="20" rx="1" fill="#0a0a0a" />
        <rect x="19" y="6" width="5" height="20" rx="1" fill="#0a0a0a" />
        <rect x="8" y="14" width="16" height="4" rx="1" fill="#0a0a0a" />
        <circle cx="26" cy="5.5" r="1.8" fill="#ff6a00" />
      </svg>
    </div>
  );
};
