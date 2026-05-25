import { useEffect, useState } from 'react';

const BREAKPOINT_MOBILE = 767;
const BREAKPOINT_TABLET_MIN = 768;
const BREAKPOINT_TABLET_MAX = 1023;
const BREAKPOINT_DESKTOP = 1024;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINT_MOBILE}px)`);
}

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINT_TABLET_MIN}px) and (max-width: ${BREAKPOINT_TABLET_MAX}px)`,
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINT_DESKTOP}px)`);
}
