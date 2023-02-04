import React from 'react';
import { translate } from '../../../translate/translate-func';
import './style.scss';
import { IProfileNav } from './types/profile-nav';

export const ProfileEdit: React.FC<Partial<IProfileNav>> = (props: Partial<IProfileNav>) => {
  const { navProps } = props;
  const addedClass = navProps?.addedClass;
  const username = navProps?.username;

  return (
    <div className={`profile__edit${` ${addedClass || ''}`}`}>
      <span className="profile-edit__nickname">{username}</span>
      <button className="profile-edit__btn" type="button">{translate('Edit_profile')}</button>
      <span className="profile-edit__settings" />
    </div>
  );
};
