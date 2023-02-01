import React from 'react';
import './style.scss';

export interface ISettingsMenu {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsMenu: React.FC<ISettingsMenu> = () => {
  return (
    <menu className="settings__menu">
      <ul className="settings__menu-list">
        <li className="settings__menu-item">Switch Appearence</li>
        <li className="settings__menu-item">Switch Language</li>
        <li className="settings__menu-item">Log Out</li>
      </ul>
    </menu>
  );
};

export default SettingsMenu;
