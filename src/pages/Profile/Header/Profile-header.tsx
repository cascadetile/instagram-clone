import React from 'react';
import './profile-header.scss';
import { IProfileHeader } from '../types/prodile-header';

export const ProfileHeader: React.FC<IProfileHeader> = (props: IProfileHeader) => {
  const { username } = props;

  return (
    <div className="profile-header">
      <div className="profile-header__username">
        <span className="profile-username__text">{username}</span>
        <span className="profile-username__icon" />
      </div>
      <div className="profile-header__nav">
        <span className="profile-header__add-btn" />
      </div>
    </div>
  );
};
