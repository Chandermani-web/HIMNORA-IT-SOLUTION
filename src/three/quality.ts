import type { QualityTier } from '../animations/store';

export const PARTICLES: Record<QualityTier, number> = { 0: 600, 1: 1200, 2: 2000 };
export const MAX_DPR: Record<QualityTier, number> = { 0: 1, 1: 1.5, 2: 2 };

export function initialTier(): QualityTier {
  if (typeof window === 'undefined') return 1;
  const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const small = window.innerWidth < 768;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak = (nav.deviceMemory ?? 8) < 4 || (navigator.hardwareConcurrency ?? 8) <= 4;
  if (coarse || small) return weak ? 0 : 1;
  return weak ? 1 : 2;
}

export function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function saveDataOn(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !!conn?.saveData;
}
