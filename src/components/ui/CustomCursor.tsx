import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const ringRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const targetRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is touch-based
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, select, textarea, [role="button"], .editorial-card, .group'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth eased animation for the ring
    const loop = () => {
      const ease = 0.2;
      ringRef.current.x += (targetRef.current.x - ringRef.current.x) * ease;
      ringRef.current.y += (targetRef.current.y - ringRef.current.y) * ease;

      setPosition({
        x: ringRef.current.x,
        y: ringRef.current.y,
      });

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 40px Outline ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isHovered ? 1.6 : 1
          })`,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border border-[#0a0a0a] transition-all duration-200 ${
            isHovered ? 'bg-[#0a0a0a]/10 border-[#0a0a0a]/80' : 'opacity-70'
          }`}
        />
      </div>

      {/* Center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 bg-[#0a0a0a] rounded-full transition-opacity duration-150"
        style={{
          transform: `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`,
          opacity: isHovered ? 0 : 0.9,
        }}
      />
    </>
  );
};
