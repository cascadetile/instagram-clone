import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProfileInfo from './Info/Profile-info';
import './style.scss';
import { ProfileEdit } from './Nav/Profile-edit';
import { ProfilePosts } from './Posts/Profile-posts';
import { translate } from '../../translate/translate-func';
import { ProfileHeader } from './Header/Profile-header';
import { UserType } from './types/profile';
import { getUserThunk } from '../../store/profile-store';
import { StoreType } from '../../store/types/store';

const Profile: React.FC<{
  getUser: (username: string) => void,
  profile: UserType
}> = (props) => {
  const { getUser, profile } = props;
  const { state } = useLocation();
  const { username } = state;

  const {
    followers,
    following,
    posts,
    bio,
    profilePicture,
  } = profile;

  const infoProps = {
    following,
    followers,
    postsCounter: posts?.length,
  };

  const userProps = {
    profilePicture,
    username,
    bio,
  };

  useEffect(() => {
    getUser(username);
  }, []);

  return (
    <div className="profile">
      <ProfileHeader username={username} />
      <ProfileInfo info={infoProps} user={userProps} />
      <p className="profile__description">{bio}</p>
      <span className="profile__add-post">
        <span className="profile-add__icon" />
        <p className="profile-add__text">{translate('Add')}</p>
      </span>
      <ProfileEdit />
      <ProfilePosts posts={posts} />
    </div>
  );
};

const MapStateToProps = (store: StoreType) => ({
  profile: store.profile.profile,
});

const MapDispatchToProps = {
  getUser: getUserThunk,
};

export const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(Profile);
