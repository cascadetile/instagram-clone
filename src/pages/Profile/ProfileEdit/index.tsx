import React from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from '../../../translate/translate-func';
import './style.scss';
import { IProfileNav } from '../types';
import { store } from '../../../store/store';

export const ProfileEdit: React.FC<Partial<IProfileNav>> = (props: Partial<IProfileNav>) => {
  const { navProps } = props;
  const addedClass = navProps?.addedClass;
  const username = navProps?.username;
  const isUser = username === store.getState().profile.myUsername;

  return (
    <div className={`profile__edit${` ${addedClass || ''}`}`}>
      <span className="profile-edit__nickname">{username}</span>
      {isUser ? <NavLink to="/profile-settings" className="profile-edit__btn">{translate('Edit_profile')}</NavLink> : <button type="button" className="profile__subscribe-btn">{translate('subscribe')}</button>}
    </div>
  );
};
