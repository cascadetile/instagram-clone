/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Avatar from '../../../components/Avatar';
import { InfoProps } from '../types';
import './style.scss';
// import { translate } from '../../../translate/translate-func';
import { ProfileEdit } from '../ProfileEdit';
import { ProfileMetrics } from '../ProfileMetrics';

export const ProfileInfo: React.FC<InfoProps> = (props) => {
  const { user } = props;
  const { profilePicture, username, bio } = user;

  const avatarProps = {
    src: profilePicture,
  };

  const profileEditProps = {
    addedClass: 'header',
    username,
  };

  return (
    <div className="profile__info">
      <Avatar avatar={avatarProps} />
      <div className="profile__info-wrapper">
        <ProfileEdit navProps={profileEditProps} />
        <ProfileMetrics {...props} />
        <p className="profile-metrics__bio">{bio}</p>
      </div>
      <ProfileMetrics {...props} />
    </div>
  );
};

export default ProfileInfo;
