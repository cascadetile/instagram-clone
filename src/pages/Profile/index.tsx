import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import './style.scss';
import { ProfileHeader } from './ProfileHeader';
import { ProfileInfo } from './ProfileInfo';
import { getUserThunk } from '../../store/profile-store';
import { StoreType } from '../../store/types/store';
import { IProfile } from './types';
import { ProfileControls } from './ProfileControls';
import { ProfilePostsContainer } from './Posts/Profile-posts';

export const Profile: React.FC<{
  getUser: (username: string) => Promise<unknown>;
  profile: IProfile;
}> = (props) => {
  const { state } = useLocation();
  const { username } = state;
  const { getUser, profile } = props;

  useEffect(() => {
    getUser(username);
  }, []);

  const {
    profilePicture, bio, followers, following, posts,
  } = profile;

  const infoProps = {
    followers,
    following,
    postsCounter: posts.length,
  };

  const userProps = {
    profilePicture,
    username,
    bio,
  };

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <ProfileHeader username={username} />
        <ProfileInfo info={infoProps} user={userProps} />
        <ProfileControls />
        <ProfilePostsContainer posts={posts} />
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

export const ProfileContainer = connect(
  MapStateToProps,
  MapDispatchToProps,
)(Profile);
