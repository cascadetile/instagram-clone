/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import { HomeLogo } from '../../assets/HomeLogo';
import { ExploreLogo } from '../../assets/ExploreLogo';
import { CreatePostLogo } from '../../assets/CreatePostLogo';
import { MessagesLogo } from '../../assets/MessagesLogo';
import { ProfileLogo } from '../../assets/ProfileLogo';
import { SettingsLogo } from '../../assets/SettingsLogo';
import { GitHubLogo } from '../../assets/GitHubLogo';

export const Navigation: React.FC = () => {
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
      <SettingsLogo />
    </nav>
  );
};

export default Navigation;
