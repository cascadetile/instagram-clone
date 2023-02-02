import React from 'react';
import './style.scss';

export const ProfileEdit: React.FC = () => {
  return (
    <div className="profile__edit">
      <button className="profile-edit__btn" type="button">Редактировать профиль</button>
      <span className="profile-edit__add-btn" />
    </div>
  );
};
