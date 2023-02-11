import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { toggleIsAuthAC } from '../../store/auth-store';
import { IAction } from '../../store/types/store';
import './style.scss';

export interface ISettingsMenu {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
  toggleIsAuth: (isAuth: boolean) => void,
}

const SettingsMenu: React.FC<ISettingsMenu> = ({ setOpenMenu, toggleIsAuth }) => (
  <menu className="settings__menu">
    <ul className="settings__menu-list">
      <li className="settings__menu-item">Switch Appearence</li>
      <li className="settings__menu-item">Switch Language</li>
      <li className="settings__menu-item" onClick={() => toggleIsAuth(false)}>Log Out</li>
      <li className="settings__menu-item" onClick={() => setOpenMenu(false)}>Back</li>
    </ul>
  </menu>
);

const MapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  toggleIsAuth: (isAuth: boolean) => dispatch(toggleIsAuthAC(isAuth)),
});

export const SettignsMenuContainer = connect(() => ({}), MapDispatchToProps)(SettingsMenu);
