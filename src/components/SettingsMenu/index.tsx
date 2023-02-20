import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleIsAuthAC } from '../../store/auth-store';
import { IAction } from '../../store/types/store';
import { useTheme } from '../../hooks/use-theme';
import './style.scss';

export interface ISettingsMenu {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
  toggleIsAuth: (isAuth: boolean) => void,
}

export const SettingsMenu: React.FC<ISettingsMenu> = ({ setOpenMenu, toggleIsAuth }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    if (theme === 'light') {
      return setTheme('dark');
    }
    return setTheme('light');
  };

  return (
    <menu className="settings__menu">
      <ul className="settings__menu-list">
        <li className="settings__menu-item" onClick={handleThemeChange}>Switch Appearence</li>
        <li className="settings__menu-item">Switch Language</li>
        <li
          className="settings__menu-item"
          onClick={() => {
            toggleIsAuth(false);
            setTheme('light');
            navigate('/');
          }}
        >
          Log Out
        </li>
        <li className="settings__menu-item" onClick={() => setOpenMenu(false)}>Back</li>
      </ul>
    </menu>
  );
};

const MapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  toggleIsAuth: (isAuth: boolean) => dispatch(toggleIsAuthAC(isAuth)),
});

export const SettignsMenuContainer = connect(() => ({}), MapDispatchToProps)(SettingsMenu);
