import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setSceneReady } from '../../animations/store';
import { useReducedMotion } from '../../animations/useReducedMotion';
import { hasWebGL, saveDataOn } from '../../three/quality';
import { StaticFallback } from '../../three/fallbacks';

// The whole three.js module is a separate chunk, fetched while the preloader plays.
const Stage = React.lazy(() => import('../../three/Stage'));

export const SceneHost: React.FC = () => {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const [failed, setFailed] = useState(false);
  const eligible = useMemo(() => hasWebGL() && !saveDataOn(), []);
  const useFallback = reduced || failed || !eligible;

  // Never let the preloader wait on a scene that will not render
  useEffect(() => {
    if (useFallback) setSceneReady();
  }, [useFallback]);

  if (useFallback) return <StaticFallback visible={pathname === '/'} />;

  return (
    <Suspense fallback={null}>
      <Stage onFail={() => setFailed(true)} />
    </Suspense>
  );
};
