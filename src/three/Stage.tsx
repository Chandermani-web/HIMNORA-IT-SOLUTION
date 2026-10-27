import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroEngine } from './engine';

interface Props {
  onFail: () => void;
}

/** Persistent fixed canvas. One renderer, one render loop (gsap.ticker). */
const Stage: React.FC<Props> = ({ onFail }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<HeroEngine | null>(null);
  const { pathname } = useLocation();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const engine = new HeroEngine(canvas, pathRef.current === '/', onFail);
      engineRef.current = engine;
      engine.start();
    } catch (err) {
      console.warn('3D scene unavailable, using static fallback.', err);
      onFail();
    }
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.setRouteVisible(pathname === '/');
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default Stage;
