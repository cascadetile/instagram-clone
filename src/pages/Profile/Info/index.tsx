import React from 'react';
import Avatar from '../../../components/Avatar';

interface infoProps {
  followers: number,
  following: number,
  publications: number,
}

const ProfileInfo: React.FC = (props: { info: infoProps }) => {
  const { followers, following, publications } = props.info;

  return (
    <div className="profile__info">
      <Avatar />
      <ul className="profile__metrics">
        <li className="profile-metrics__item">
          <span className="profile-metrics__value">{publications}</span>
          <span className="profile-metrics__text">Публикации</span>
        </li>
        <li className="profile-metrics__item">
          <span className="profile-metrics__value">{followers}</span>
          <span className="profile-metrics__text">Подписчики</span>
        </li>
        <li className="profile-metrics__item">
          <span className="profile-metrics__value">{following}</span>
          <span className="profile-metrics__text">Подписки</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
