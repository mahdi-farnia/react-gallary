import React, { createContext, useState, useEffect, useCallback } from 'react';

interface ScrollProps {
  scrollY: number;
}

export const ScrollContext = createContext<ScrollProps>({
  scrollY: 0
});

const ScrollObserver: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollY, setScrollY] = useState<number>(window.scrollY);

  const handler = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handler);

    return () => document.removeEventListener('scroll', handler, { passive: true } as any);
  }, [handler]);

  return <ScrollContext.Provider value={{ scrollY }}>{children}</ScrollContext.Provider>;
};

export default ScrollObserver;
