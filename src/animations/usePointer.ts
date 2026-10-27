import { useEffect } from 'react';
import { live } from './store';

/** Writes the pointer position into the shared live store (desktop only). */
export function usePointerTracking() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      live.pointer.px = e.clientX;
      live.pointer.py = e.clientY;
      live.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      live.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}
