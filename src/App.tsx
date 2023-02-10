import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home } from './pages/Home';
import { Registration } from './pages/Registration';
import { RegistrationEmail } from './layouts/RegistrationEmail';
import { RegistrationOTP } from './layouts/RegistrationOTP';
import { RegistrationNameAndPassword } from './layouts/RegistrationNameAndPassword';
import { RegistrationBirthday } from './layouts/RegistrationBirthday';
import { RegistrationUsername } from './layouts/RegistrationUsername';
import { Authentification } from './pages/Authentification';
import { Messages } from './pages/Messages';
import { CreatePost } from './pages/CreatePost';
import { Profile } from './pages/Profile';
import { Explore } from './pages/Explore';
import { Navigation } from './components/Navigation';
import { ProfileSettings } from './pages/Settings';
import { Routers } from './router/routers';
import { getPagePath } from './hooks/use-location';
import { useMediaQueries } from './hooks/use-media-queries';
import { Page404 } from './pages/Page404';
import { ProfileExplore } from './layouts/ProfileExplore';

export function App() {
  const pagePath = getPagePath();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState('');
  // TODO: change sessionStorage settings
  const valueAuthorized = sessionStorage.getItem('authorized') ? JSON.parse(sessionStorage.getItem('authorized')!) : false;
  const [isAuthorized, setIsAuthorized] = useState(valueAuthorized);
  sessionStorage.setItem('authorized', JSON.stringify(isAuthorized));
  const isMobile = useMediaQueries('isMobile');

  const user = {
    followers: 10000,
    following: 10000,
    posts: [
      {
        id: 0,
        images: ['https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80', 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', 'https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'],
        likes: 22,
        caption: '',
      },
    ],
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegCgK5aWTTuv_K5TPd10DcJxphcBTBct6R170EamgcCOcYs7LGKVy7ybRc-MCwOcHljg&usqp=CAU',
    bio: 'hi there!',
    username: 'example',
    website: 'example.com',
    fullName: 'Mr. example',
  };

  if (!isAuthorized) {
    return (
      <div className="page page__login">
        <div className="page-body page-body__login">
          <Routes>
            <Route path="/" element={<Authentification setIsAuthorized={setIsAuthorized} />} />
            <Route path="/registration" element={<Registration />}>
              <Route path="email" element={<RegistrationEmail setEmail={setEmail} />} />
              <Route path="otp" element={<RegistrationOTP email={email} setSession={setSession} />} />
              <Route path="name-and-password" element={<RegistrationNameAndPassword session={session} setPassword={setPassword} />} />
              <Route path="birthday" element={<RegistrationBirthday session={session} />} />
              <Route path="username" element={<RegistrationUsername session={session} password={password} email={email} setIsAuthorized={setIsAuthorized} />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    );
  }

  const isProfileSettingsPage = isMobile && pagePath === Routers.PROFILE_SETTINGS ? 'overflowed' : '';

  return (
    <div className={`page ${isProfileSettingsPage}`}>
      <Navigation setIsAuthorized={setIsAuthorized} />
      <div className="page-body">
        <Routes>
          <Route path={Routers.MAIN} element={<Home />} />
          <Route path={Routers.MESSAGES} element={<Messages />} />
          <Route path={Routers.CREATE_POST} element={<CreatePost />} />
          <Route
            path={Routers.PROFILE}
            element={<Profile user={user} setIsAuthorized={setIsAuthorized} />}
          >
            <Route path={`${Routers.PROFILE}/explore`} element={<ProfileExplore user={user} setIsAuthorized={setIsAuthorized} />} />
          </Route>
          <Route path={Routers.EXPLORE} element={<Explore />} />
          <Route
            path={Routers.PROFILE_SETTINGS}
            element={<ProfileSettings user={user} setIsAuthorized={setIsAuthorized} />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
