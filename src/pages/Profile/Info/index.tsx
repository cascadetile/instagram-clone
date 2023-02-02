import React from 'react';
import Avatar from '../../../components/Avatar';
import { InfoProps } from '../types/profile';
import './profile-info.scss';
import { translate } from '../../../translate/translate-func';

const ProfileInfo: React.FC<InfoProps> = (props: InfoProps) => {
  const { info, user } = props;
  const { followers, following, postsCounter } = info;
  const { profilePicture } = user;

  const avatarProps = {
    src: profilePicture,
    size: 80,
  };

  return (
    <div className="profile__info">
      <Avatar avatar={avatarProps} />
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
    </div>
  );
};

export default ProfileInfo;
