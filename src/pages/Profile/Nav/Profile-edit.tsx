import React from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from '../../../translate/translate-func';
import './profile-edit.scss';
import { IProfileNav } from '../types/profile-nav';

export const ProfileEdit: React.FC<Partial<IProfileNav>> = (props: Partial<IProfileNav>) => {
  const { navProps } = props;
  const addedClass = navProps?.addedClass;
  const username = navProps?.username;

  return (
    <div className={`profile__edit${` ${addedClass || ''}`}`}>
      <span className="profile-edit__nickname">{username}</span>
      <NavLink to="/profile-settings" className="profile-edit__btn">{translate('Edit_profile')}</NavLink>
    </div>
  );
};
