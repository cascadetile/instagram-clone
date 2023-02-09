import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import './style.scss';
import { ProfilePosts } from './ProfileControls';
import { ProfileHeader } from './ProfileHeader';
import { UserType } from './types';

export const Profile: React.FC<UserType> = (props: UserType) => {
  const { user, setIsAuthorized } = props;
  const {
    following, followers, posts, profilePicture, bio, username,
  } = user;

  const infoProps = {
    following,
    followers,
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
        <ProfileHeader username={username} setIsAuthorized={setIsAuthorized} />
        <ProfileInfo info={infoProps} user={userProps} />
        <ProfilePosts />
      </div>
      <Outlet />
    </div>
  );
};
