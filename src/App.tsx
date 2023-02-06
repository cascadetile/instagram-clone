import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home } from './pages/Home';
import { Registration } from './pages/Registration';
import RegistrationEmail from './components/RegistrationEmail';
import RegistrationOTP from './components/RegistrationOTP';
import RegistrationNameAndPassword from './components/RegistrationNameAndPassword';
import RegistrationBirthday from './components/RegistrationBirthday';
import RegistrationUsername from './components/RegistrationUsername';
import { Authentification } from './pages/Authentification';
import { Messages } from './pages/Messages';
import { CreatePost } from './pages/CreatePost';
import { Profile } from './pages/Profile';
import { Explore } from './pages/Explore';
import { Navigation } from './components/Navigation';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState('');

  return (
    <>
      <Navigation />
      <div className="page-body">
        <Routes>
          <Route path="/registration" element={<Registration />}>
            <Route path="email" element={<RegistrationEmail setEmail={setEmail} />} />
            <Route path="otp" element={<RegistrationOTP email={email} setSession={setSession} />} />
            <Route path="name-and-password" element={<RegistrationNameAndPassword session={session} setPassword={setPassword} />} />
            <Route path="birthday" element={<RegistrationBirthday session={session} />} />
            <Route path="username" element={<RegistrationUsername session={session} password={password} email={email} />} />
          </Route>
          <Route path="/authentification" element={<Authentification />} />
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
