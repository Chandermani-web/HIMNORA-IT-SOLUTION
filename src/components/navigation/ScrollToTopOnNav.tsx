import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTopNow } from '../../animations/useLenis';

export const ScrollToTopOnNav: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTopNow();
  }, [pathname]);

  return null;
};
