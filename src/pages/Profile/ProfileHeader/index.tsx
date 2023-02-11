import React, { useState } from 'react';
import './style.scss';
import { IProfileHeader } from '../types';
import { SettingsLogo } from '../../../assets/SettingsLogo';
import { AddPersonIcon } from '../../../assets/AddPersonIcon';
import { SettignsMenuContainer } from '../../../components/SettingsMenu/index';

export const ProfileHeader: React.FC<IProfileHeader> = (props: IProfileHeader) => {
  const { username } = props;
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="profile-header">
      <button className="profile-header__settings" type="button" onClick={() => setOpenMenu(!openMenu)}>
        <SettingsLogo />
      </button>
      {openMenu ? <SettignsMenuContainer setOpenMenu={setOpenMenu} /> : ''}
      <div className="profile-header__username">
        <span className="profile-username__text">{username}</span>
        <span className="profile-username__icon" />
      </div>
      <AddPersonIcon />
    </div>
  );
};
