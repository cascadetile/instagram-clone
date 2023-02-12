import React, {
  ChangeEvent,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import { translate } from '../../translate/translate-func';
import Avatar from '../../components/Avatar/index';
import './settings.scss';
import { useMediaQueries } from '../../hooks/use-media-queries';
import { StoreType } from '../../store/types/store';
import {
  changeAvatarThunk, setBioAC, setUsernameAC, setFullnameAC, updateUserSettingsThunk, setWebsiteAC,
} from '../../store/profile-store';
import { IProfileSettings } from './types/profile-settings';

const ProfileSettings: React.FC<IProfileSettings> = (props) => {
  const {
    username,
    fullname,
    website,
    bio,
    changeAvatar,
    profilePicture,
    updateProfile,
  } = props;
  const isMobile = useMediaQueries('isMobile');
  const dispatch = useDispatch();

  const avatarProps = {
    src: profilePicture,
    size: 50,
  };

  const changeProfileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.nativeEvent.target as unknown as { files: FileList };

    const formData = new FormData();

    formData.append('image', files[0]);

    changeAvatar(formData);
  };

  const setFullname = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = (e.nativeEvent.target! as HTMLInputElement);
    dispatch(setFullnameAC(value));
  };

  const setUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = (e.nativeEvent.target! as HTMLInputElement);
    dispatch(setUsernameAC(value));
  };

  const setBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = (e.nativeEvent.target! as HTMLTextAreaElement);
    dispatch(setBioAC(value));
  };

  const setWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = (e.nativeEvent.target! as HTMLInputElement);
    dispatch(setWebsiteAC(value));
  };

  const saveSettings = () => {
    updateProfile({
      username,
      name: fullname,
      website,
      bio,
    });
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
          <li className="profile-edit__item avatar-item">
            <Avatar avatar={avatarProps} />
            <div className="profile-edit__desc">
              <p className="profile-edit__username">{username}</p>
              <input type="file" id="upload-img" onChange={changeProfileAvatar} accept=".png,.jpeg" />
              <label className="profile-edit__ava-change" htmlFor="upload-img">{translate('Сhange_photo')}</label>
            </div>
          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="name">{translate('Name')}</label>
            <div className="profile-edit__desc">
              <input value={fullname} onChange={setFullname} className="profile-edit__input" type="text" id="name" />
              <p className="profile-item__description">
                {translate('To_make_it_easier_for_people_to_find_your_account,_vicorate_the_name_that_contains_information_about_you,_your_first_and_last_name,_nickname_or_company_name')}
              </p>
            </div>

          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="username">{translate('User_name')}</label>
            <div className="profile-edit__desc">
              <input value={username} onChange={setUsername} className="profile-edit__input" type="text" id="username" />
              <p className="profile-item__description">
                {`${translate('In_most_cases,_you_will_have_14_days_to_change_your_username_back_to')} ${username}`}
              </p>
            </div>
          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="website">Website</label>
            <input value={website} onChange={setWebsite} className="profile-edit__input" type="text" id="website" />
          </li>
          <li className="profile-edit__item">
            <label className="profile-edit__label" htmlFor="bio">{translate('About_me')}</label>
            <textarea value={bio} onChange={setBio} className="profile-edit__input" id="bio" />
          </li>
        </ul>
        <button className="profile-edit__send-btn" onClick={saveSettings} type="button">{translate('Send')}</button>
      </div>
    </div>
  );
};

const MapStateToProps = (store: StoreType) => ({
  profile: store.profile.profile,
  bio: store.profile.profile.bio,
  website: store.profile.profile.website,
  fullname: store.profile.profile.fullname,
  username: store.profile.profile.username,
  profilePicture: store.profile.profile.profilePicture,
});

const MapDispatchToProps = {
  changeAvatar: changeAvatarThunk,
  updateProfile: updateUserSettingsThunk,
};

export const ProfileSettingsContainer = connect(
  MapStateToProps,
  MapDispatchToProps,
)(ProfileSettings);
