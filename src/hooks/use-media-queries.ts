import { useState, useEffect } from 'react';
import variables from '../assets/scss/_variables.scss';

const getCurrentSize = (tablet: string, desktop: string, param: string) => {
  const mobileSize = parseInt(tablet, 10) + 1;
  const desktopSize = parseInt(desktop, 10) + 1;

  const isMobile = param === 'isMobile' ? `(max-width: ${mobileSize}px)` : '';
  const isTablet = param === 'isTablet' ? `(min-width: ${tablet}) and (max-width: ${desktopSize}px)` : '';
  const isDesktop = param === 'isDesktop' ? `(min-width: ${desktop})` : '';

  return isMobile || isTablet || isDesktop;
};

export const useMediaQueries = (param: string) => {
  const { tablet, desktop } = variables;

  const media = getCurrentSize(tablet, desktop, param);

  const [change, setChange] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(media);

    const initialMatch = query.matches;

    if (initialMatch) {
      setChange(true);
    } else {
      setChange(false);
    }

    const test = (e: { matches: boolean }) => {
      if (e.matches) {
        setChange(true);
      } else {
        setChange(false);
      }
    };

    query.addListener(test);

    return () => {
      query.removeListener(test);
    };
  }, [param]);

  return change;
};
