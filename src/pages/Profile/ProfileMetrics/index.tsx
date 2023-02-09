import React from 'react';
import { translate } from '../../../translate/translate-func';
import { InfoProps } from '../types';

import './style.scss';

export const ProfileMetrics: React.FC<InfoProps> = (props: InfoProps) => {
  const { info } = props;
  const { followers, following, postsCounter } = info;

  return (
    <ul className="profile__metrics">
      <li className="profile-metrics__item">
        <span className="profile-metrics__value"><b>{postsCounter}</b></span>
        <span className="profile-metrics__text">{translate('Publications')}</span>
      </li>
      <li className="profile-metrics__item">
        <span className="profile-metrics__value"><b>{followers}</b></span>
        <span className="profile-metrics__text">
          {translate('Followers')}
        </span>
      </li>
      <li className="profile-metrics__item">
        <span className="profile-metrics__value"><b>{following}</b></span>
        <span className="profile-metrics__text">{translate('Following')}</span>
      </li>
    </ul>
  );
};

export default ProfileMetrics;
