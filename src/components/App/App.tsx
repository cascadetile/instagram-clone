import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Messages } from '../../pages/Messages';
import { CreatePost } from '../../pages/CreatePost';
import { ProfileContainer } from '../../pages/Profile';
import { Explore } from '../../pages/Explore';
import { NavigationContainer } from '../Navigation';
import { ProfileSettingsContainer } from '../../pages/Settings';
import { Routers } from '../../router/routers';
import { getPagePath } from '../../hooks/use-location';
import { useMediaQueries } from '../../hooks/use-media-queries';
import { Page404 } from '../../pages/Page404';

export const App = () => {
  const isMobile = useMediaQueries('isMobile');
  const pagePath = getPagePath();

  const isProfileSettingsPage = isMobile && pagePath === Routers.PROFILE_SETTINGS ? 'overflowed' : '';

  return (
    <div className={`page ${isProfileSettingsPage}`}>
      <NavigationContainer />
      <div className="page-body">
        <Routes>
          <Route path={Routers.MAIN} element={<Home />} />
          <Route path={Routers.MESSAGES} element={<Messages />} />
          <Route path={Routers.CREATE_POST} element={<CreatePost />} />
          <Route path={Routers.PROFILE} element={<ProfileContainer />} />
          <Route path={Routers.EXPLORE} element={<Explore />} />
          <Route path={Routers.PROFILE_SETTINGS} element={<ProfileSettingsContainer />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
};
