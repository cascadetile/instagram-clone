import React from 'react';
import Avatar from '../../../components/Avatar';
import { InfoProps } from '../types';
import './style.scss';
import { translate } from '../../../translate/translate-func';
import { ProfileEdit } from '../ProfileEdit';

const ProfileInfo: React.FC<InfoProps> = (props: InfoProps) => {
  const { info, user } = props;
  const { followers, following, postsCounter } = info;
  const { profilePicture, username, bio } = user;

  const avatarProps = {
    src: profilePicture,
    size: 80,
  };

  const profileEditProps = {
    addedClass: 'header',
    username,
  };

  return (
    <div className="profile__info">
      <Avatar avatar={avatarProps} />
      <div>
        <ProfileEdit navProps={profileEditProps} />
        <ul className="profile__metrics">
          <li className="profile-metrics__item">
            <span className="profile-metrics__value">{postsCounter}</span>
            <span className="profile-metrics__text">{translate('Publications')}</span>
          </li>
          <li className="profile-metrics__item">
            <span className="profile-metrics__value">{followers}</span>
            <span className="profile-metrics__text">
              {translate('Followers')}
            </span>
          </li>
          <li className="profile-metrics__item">
            <span className="profile-metrics__value">{following}</span>
            <span className="profile-metrics__text">{translate('Following')}</span>
          </li>
        </ul>
        <p className="profile-metrics__bio">{bio}</p>
      </div>

    </div>
  );
};

export default ProfileInfo;
