import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './style.scss';

import { connect } from 'react-redux';
import { HomeLogo } from '../../assets/HomeLogo';
import { ExploreLogo } from '../../assets/ExploreLogo';
import { CreatePostLogo } from '../../assets/CreatePostLogo';
import { MessagesLogo } from '../../assets/MessagesLogo';
import { ProfileLogo } from '../../assets/ProfileLogo';
import { SettingsLogo } from '../../assets/SettingsLogo';
import { GitHubLogo } from '../../assets/GitHubLogo';
import { SettignsMenuContainer } from '../SettingsMenu';
import { translate } from '../../translate/translate-func';
import { StoreType } from '../../store/types/store';

interface INavigation {
  myUsername: string;
}

const Navigation: React.FC<INavigation> = ({ myUsername }) => {
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
      <NavLink className="sidenav__link" to="/profile" state={{ username: myUsername }}>
        <ProfileLogo />
        <p className="sidenav__link-text">{translate('Profile')}</p>
      </NavLink>
      {openMenu ? <SettignsMenuContainer setOpenMenu={setOpenMenu} /> : ''}
      <button className="sidenav__link-button" type="button" onClick={() => setOpenMenu(!openMenu)}>
        <SettingsLogo />
        <p className="sidenav__link-text">{translate('Settings')}</p>
      </button>
    </nav>
  );
};

const mapStateToProps = (store: StoreType) => ({
  myUsername: store.profile.myUsername,
});

export const NavigationContainer = connect(mapStateToProps, {})(Navigation);
