import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import ProfileInfo from './Info/Profile-info';
import './style.scss';
import { ProfilePosts } from './Posts/Profile-posts';
import { ProfileHeader } from './ProfileHeader';
import { UserType } from './types/profile';
import { getUserThunk } from '../../store/profile-store';
import { StoreType } from '../../store/types/store';

export const Profile: React.FC<{
  getUser: (username: string) => void,
  profile: UserType
}> = (props) => {
  const { state } = useLocation();
  const { username } = state;
  const { getUser, profile } = props;

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
      <div className="profile__wrapper">
        <ProfileHeader username={username} />
        <ProfileInfo info={infoProps} user={userProps} />
        <ProfilePosts />
        <Outlet />
      </div>
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
