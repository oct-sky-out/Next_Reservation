import { useEffect } from 'react';

type IntersectionObserverConstructType = {
  rootElement: Element | null;
  targetElement: Element | null;
  onIntersection: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: string;
};

const useIntersectionObserver = ({
  rootElement,
  targetElement,
  onIntersection,
  threshold = 0,
  rootMargin = '0px',
}: IntersectionObserverConstructType) => {
  useEffect(() => {
    if (!rootElement) return;
    if (!targetElement) return;

    const observer = new IntersectionObserver(onIntersection, {
      root: rootElement,
      threshold,
      rootMargin,
    });
    observer.observe(targetElement);

    return () => observer.unobserve(targetElement); // * cleanUp
  }, [rootElement, targetElement, onIntersection, threshold, rootMargin]);
};

export default useIntersectionObserver;
