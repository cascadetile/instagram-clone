import { useLayoutEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage['app-theme'] ? localStorage['app-theme'] : 'light');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage['app-theme'] = theme;
  }, [theme]);

  return { theme, setTheme };
};
