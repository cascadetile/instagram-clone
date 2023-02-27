import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './style.scss';
import { ProfileHeader } from './ProfileHeader';
import { ProfileInfo } from './ProfileInfo';
import { getUserThunk } from '../../store/profile-store';
import { StoreType } from '../../store/types/store';
import { ProfileControls } from './ProfileControls';
import { ProfilePostsContainer } from './Posts/Profile-posts';
import { IProfile } from './types';

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

  let profilePicture = '';
  let bio = '';
  let followers = 0;
  let following = 0;
  let posts = [{
    id: 0, likes: 0, image: '', caption: '',
  }];

  if (profile) {
    profilePicture = profile.profilePicture;
    bio = profile.bio;
    followers = profile.followers;
    following = profile.following;
    posts = profile.posts;
  }

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
