import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Registaration } from './pages/Registration';
import { Authentification } from './pages/Authentification';
import { Messages } from './pages/Messages';
import { CreatePost } from './pages/CreatePost';
import { Profile } from './pages/Profile';
import { Explore } from './pages/Explore';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/registration" element={<Registaration />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
