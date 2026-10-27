/**
 * Tiny typed global store (no external state library).
 * Mutable "live" values are read by render loops; events notify React/GSAP code.
 */
export type QualityTier = 0 | 1 | 2; // 0 = low, 1 = mid, 2 = high

type Listener = () => void;

export const live = {
  pointer: { x: 0, y: 0, px: -9999, py: -9999 }, // normalized -1..1 and pixel
  scrollVelocity: 0,
  activeSection: 'hero',
  hoveredServiceId: null as string | null,
  quality: 2 as QualityTier,
};

const listeners = new Set<Listener>();
export const subscribe = (fn: Listener) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const emit = () => listeners.forEach((fn) => fn());

// ---- "app ready" gate (preloader finished) ----
let ready = false;
const readyCbs = new Set<() => void>();

export const isAppReady = () => ready;
export const setAppReady = () => {
  if (ready) return;
  ready = true;
  readyCbs.forEach((cb) => cb());
  readyCbs.clear();
};
export const onAppReady = (cb: () => void) => {
  if (ready) {
    cb();
    return () => {};
  }
  readyCbs.add(cb);
  return () => readyCbs.delete(cb);
};

// ---- "first 3D frame / scene settled" gate (used by the preloader) ----
let sceneReady = false;
const sceneCbs = new Set<() => void>();
export const setSceneReady = () => {
  if (sceneReady) return;
  sceneReady = true;
  sceneCbs.forEach((cb) => cb());
  sceneCbs.clear();
};
export const onSceneReady = (cb: () => void) => {
  if (sceneReady) {
    cb();
    return () => {};
  }
  sceneCbs.add(cb);
  return () => sceneCbs.delete(cb);
};
