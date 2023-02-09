import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home } from './pages/Home';
import { Registration } from './pages/Registration';
import { RegistrationEmail } from './components/RegistrationEmail';
import { RegistrationOTP } from './components/RegistrationOTP';
import { RegistrationNameAndPassword } from './components/RegistrationNameAndPassword';
import { RegistrationBirthday } from './components/RegistrationBirthday';
import { RegistrationUsername } from './components/RegistrationUsername';
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

export function App() {
  const pagePath = getPagePath();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const isMobile = useMediaQueries('isMobile');

  const user = {
    followers: 10000,
    following: 10000,
    posts: [],
    profilePicture: '',
    bio: 'hi there!',
    username: 'example',
    website: 'example.com',
    fullName: 'Mr. example',
  };

  if (!isAuthorized) {
    return (
      <div className="page page__login">
        <div className="page-body">
          <Routes>
            <Route path="*" element={<Authentification setIsAuthorized={setIsAuthorized} />} />
            <Route path="/registration" element={<Registration />}>
              <Route path="email" element={<RegistrationEmail setEmail={setEmail} />} />
              <Route path="otp" element={<RegistrationOTP email={email} setSession={setSession} />} />
              <Route path="name-and-password" element={<RegistrationNameAndPassword session={session} setPassword={setPassword} />} />
              <Route path="birthday" element={<RegistrationBirthday session={session} />} />
              <Route path="username" element={<RegistrationUsername session={session} password={password} email={email} setIsAuthorized={setIsAuthorized} />} />
            </Route>
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
          <Route path={Routers.PROFILE} element={<Profile user={user} />} />
          <Route path={Routers.EXPLORE} element={<Explore />} />
          <Route path={Routers.PROFILE_SETTINGS} element={<ProfileSettings user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
