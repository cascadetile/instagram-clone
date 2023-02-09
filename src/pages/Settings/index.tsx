import React from 'react';
import { translate } from '../../translate/translate-func';
import Avatar from '../../components/Avatar/index';
import { UserType } from '../Profile/types/profile';
import './settings.scss';
import { useMediaQueries } from '../../hooks/use-media-queries';

export const ProfileSettings: React.FC<UserType> = (props: UserType) => {
  const { user } = props;
  const {
    username, fullName, website, bio,
  } = user;
  const isMobile = useMediaQueries('isMobile');

  const avatarProps = {
    src: user.profilePicture,
    size: 50,
  };

  return (
    <div className="profile-edit">
      {isMobile ? (
        <div className="profile-edit__nav">
          <span className="profile-edit__back-btn" />
          <h1 className="profile-edit__title">{translate('Profile_editing')}</h1>
        </div>
      ) : ''}
      <div className="profile-edit__body">
        <ul className="profile-edit__info">
          <li className="profile-edit__item avatar">
            <Avatar avatar={avatarProps} />
            <div className="profile-edit__desc">
              <p className="profile-edit__username">{username}</p>
              <input type="file" id="upload-img" />
              <label className="profile-edit__ava-change" htmlFor="upload-img">{translate('Сhange_photo')}</label>
            </div>
          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="name">{translate('Name')}</label>
            <div className="profile-edit__desc">
              <input value={fullName} onChange={() => {}} className="profile-edit__input" type="text" id="name" />
              <p className="profile-item__description">
                {translate('To_make_it_easier_for_people_to_find_your_account,_vicorate_the_name_that_contains_information_about_you,_your_first_and_last_name,_nickname_or_company_name')}
              </p>
            </div>

          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="username">{translate('User_name')}</label>
            <div className="profile-edit__desc">
              <input value={username} onChange={() => {}} className="profile-edit__input" type="text" id="username" />
              <p className="profile-item__description">
                {`${translate('In_most_cases,_you_will_have_14_days_to_change_your_username_back_to')} ${username}`}
              </p>
            </div>
          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="website">{translate('Site')}</label>
            <div className="profile-edit__desc">
              <input value={website} onChange={() => {}} className="profile-edit__input" type="text" id="website" />
              <p className="profile-item__description">
                {translate('Links_can_only_be_changed_in_the_mobile_version')}
              </p>
            </div>
          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="bio">{translate('About_me')}</label>
            <textarea value={bio} onChange={() => {}} className="profile-edit__input" id="bio" />
          </li>
        </ul>
        <button className="profile-edit__send-btn" onClick={() => {}} type="button">{translate('Send')}</button>
      </div>
    </div>
  );
};
