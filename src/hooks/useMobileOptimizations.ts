import { useEffect } from 'react';
import { useIsMobile } from './use-mobile';

/**
 * Hook for applying mobile-specific optimizations
 */
export const useMobileOptimizations = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      // Add touch device class for CSS targeting
      document.body.classList.add('touch-device');
      
      // Prevent overscroll bounce on iOS
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.classList.remove('touch-device');
      document.body.style.overscrollBehavior = 'auto';
    }

    return () => {
      document.body.classList.remove('touch-device');
      document.body.style.overscrollBehavior = 'auto';
    };
  }, [isMobile]);

  return { isMobile };
};
