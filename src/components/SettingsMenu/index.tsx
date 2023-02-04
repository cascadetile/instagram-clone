import React from 'react';
import './style.scss';

export interface ISettingsMenu {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsMenu: React.FC<ISettingsMenu> = ({ setOpenMenu }) => (
  <menu className="settings__menu">
    <ul className="settings__menu-list">
      <li className="settings__menu-item">Switch Appearence</li>
      <li className="settings__menu-item">Switch Language</li>
      <li className="settings__menu-item">Log Out</li>
      <li className="settings__menu-item" onClick={() => { setOpenMenu(false); }}>Back</li>
    </ul>
  </menu>
);

export default SettingsMenu;
