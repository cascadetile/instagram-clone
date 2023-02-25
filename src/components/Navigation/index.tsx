import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
import { useTheme } from '../../hooks/use-theme';

interface INavigation {
  myUsername: string;
}

const Navigation: React.FC<INavigation> = ({ myUsername }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (localStorage['app-theme']) {
      setTheme(localStorage['app-theme']);
    } else {
      const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = isDarkTheme ? 'dark' : 'light';
      setTheme(defaultTheme);
      localStorage['app-theme'] = theme;
    }
  }, []);

  useEffect(() => {
    const address = window.location.pathname.slice(1);
    const activeLink = document.querySelector(`.sidenav__link-${address}`);
    activeLink!.setAttribute('data-active', 'true');
  }, []);

  const changeActiveLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const links = document.querySelectorAll('.sidenav__link');
    links.forEach((link) => {
      link.removeAttribute('data-active');
    });
    e.currentTarget.setAttribute('data-active', 'true');
  };

  return (
    <nav className="sidenav">
      <Link className="sidenav__link" to="https://github.com/cascadetile/instagram-clone">
        <GitHubLogo />
        <p className="sidenav__link-text">{translate('Repository')}</p>
      </Link>
      <Link className="sidenav__link sidenav__link-" data-active="false" to="/" onClick={changeActiveLink}>
        <HomeLogo />
        <p className="sidenav__link-text">{translate('Home')}</p>
      </Link>
      <Link className="sidenav__link sidenav__link-explore" data-active="false" to="/explore" onClick={changeActiveLink}>
        <ExploreLogo />
        <p className="sidenav__link-text">{translate('Explore')}</p>
      </Link>
      <Link className="sidenav__link sidenav__link-create-post" data-active="false" to="/create-post" onClick={changeActiveLink}>
        <CreatePostLogo />
        <p className="sidenav__link-text">{translate('Create_post')}</p>
      </Link>
      <Link className="sidenav__link sidenav__link-messages" data-active="false" to="/messages" onClick={changeActiveLink}>
        <MessagesLogo />
        <p className="sidenav__link-text">{translate('Messages')}</p>
      </Link>
      <Link className="sidenav__link sidenav__link-profile" data-active="false" to="/profile" onClick={changeActiveLink} state={{ username: myUsername }}>
        <ProfileLogo />
        <p className="sidenav__link-text">{translate('Profile')}</p>
      </Link>
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
