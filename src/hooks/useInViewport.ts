import { RefObject, useEffect, useState } from 'react';

/**
 * Hook to detect when an element enters the viewport
 * Uses Intersection Observer for performance
 */
export const useInViewport = (ref: RefObject<HTMLElement>, rootMargin = '50px') => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          // Once in viewport, stop observing
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isInViewport;
};
