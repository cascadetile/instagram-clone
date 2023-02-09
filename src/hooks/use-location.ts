import { useLocation } from 'react-router-dom';

export const getPagePath = () => {
  const params = useLocation();

  return params.pathname;
};
