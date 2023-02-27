import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Messages } from '../../pages/Messages';
import { CreatePostContainer } from '../../pages/CreatePost';
import { ProfileContainer } from '../../pages/Profile';
import { NavigationContainer } from '../Navigation';
import { ProfileSettingsContainer } from '../../pages/Settings';
import { Routers } from '../../router/routers';
import { getPagePath } from '../../hooks/use-location';
import { useMediaQueries } from '../../hooks/use-media-queries';
import { Page404 } from '../../pages/Page404';
import { ExplorePosts } from '../../pages/ExplorePosts';
import { ExploreSearch } from '../../pages/ExploreSearch';
import { Explore } from '../../pages/Explore';

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
          <Route path={Routers.CREATE_POST} element={<CreatePostContainer />} />
          <Route path={Routers.PROFILE} element={<ProfileContainer />} />
          <Route path={Routers.EXPLORE} element={<Explore />}>
            <Route path={Routers.EXPLORE} element={<ExplorePosts />} />
            <Route path={Routers.EXPLORE_SEARCH} element={<ExploreSearch />} />
          </Route>
          <Route path={Routers.PROFILE_SETTINGS} element={<ProfileSettingsContainer />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
};
