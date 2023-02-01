import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import { HomeLogo } from '../../assets/HomeLogo';
import { ExploreLogo } from '../../assets/ExploreLogo';
import { CreatePostLogo } from '../../assets/CreatePostLogo';
import { MessagesLogo } from '../../assets/MessagesLogo';
import { ProfileLogo } from '../../assets/ProfileLogo';
import { SettingsLogo } from '../../assets/SettingsLogo';
import { GitHubLogo } from '../../assets/GitHubLogo';
import { SettingsMenu } from '../SettingsMenu';

export const Navigation: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="sidenav">
      <Link className="sidenav__link" to="https://github.com/cascadetile/instagram-clone">
        <GitHubLogo />
        <p className="sidenav__link-text">Repository</p>
      </Link>
      <Link className="sidenav__link" to="/">
        <HomeLogo />
        <p className="sidenav__link-text">Home</p>
      </Link>
      <Link className="sidenav__link" to="/explore">
        <ExploreLogo />
        <p className="sidenav__link-text">Explore</p>
      </Link>
      <Link className="sidenav__link" to="/create-post">
        <CreatePostLogo />
        <p className="sidenav__link-text">Create Post</p>
      </Link>
      <Link className="sidenav__link" to="/messages">
        <MessagesLogo />
        <p className="sidenav__link-text">Messages</p>
      </Link>
      <Link className="sidenav__link" to="/profile">
        <ProfileLogo />
        <p className="sidenav__link-text">Profile</p>
      </Link>
      {openMenu ? <SettingsMenu setOpenMenu={setOpenMenu} /> : <></>}
      <button className="sidenav__link-button" type="button" onClick={() => setOpenMenu(!openMenu)}>
        <SettingsLogo />
        <p className="sidenav__link-text">Settings</p>
      </button>
    </nav>
  );
};

export default Navigation;
