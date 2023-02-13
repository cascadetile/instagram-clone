import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/use-theme';
import './style.scss';

export interface ISettingsMenu {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsMenu: React.FC<ISettingsMenu> = ({ setOpenMenu, setIsAuthorized }) => {
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
            setIsAuthorized(false);
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

export default SettingsMenu;
