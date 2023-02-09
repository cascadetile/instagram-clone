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
import { translate } from '../../translate/translate-func';

interface INavigation {
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navigation: React.FC<INavigation> = ({ setIsAuthorized }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="sidenav">
      <Link className="sidenav__link" to="https://github.com/cascadetile/instagram-clone">
        <GitHubLogo />
        <p className="sidenav__link-text">{translate('Repository')}</p>
      </Link>
      <Link className="sidenav__link" to="/">
        <HomeLogo />
        <p className="sidenav__link-text">{translate('Home')}</p>
      </Link>
      <Link className="sidenav__link" to="/explore">
        <ExploreLogo />
        <p className="sidenav__link-text">{translate('Explore')}</p>
      </Link>
      <Link className="sidenav__link" to="/create-post">
        <CreatePostLogo />
        <p className="sidenav__link-text">{translate('Create_post')}</p>
      </Link>
      <Link className="sidenav__link" to="/messages">
        <MessagesLogo />
        <p className="sidenav__link-text">{translate('Messages')}</p>
      </Link>
      <Link className="sidenav__link" to="/profile">
        <ProfileLogo />
        <p className="sidenav__link-text">{translate('Profile')}</p>
      </Link>
      {openMenu ? <SettingsMenu setOpenMenu={setOpenMenu} setIsAuthorized={setIsAuthorized} /> : ''}
      <button className="sidenav__link-button" type="button" onClick={() => setOpenMenu(!openMenu)}>
        <SettingsLogo />
        <p className="sidenav__link-text">{translate('Settings')}</p>
      </button>
    </nav>
  );
};

export default Navigation;
