/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UserType } from '../../pages/Profile/types';
import { Post } from '../PostHomePage';
import './style.scss';

export const ProfileExplore: React.FC<UserType> = ({ user }) => {
  const { posts, username, profilePicture } = user;

  return (
    <div className="profile-explore">
      {posts.map((post) => {
        return <Post username={username} profilePicture={profilePicture} {...post} />;
      })}
    </div>
  );
};

export default ProfileExplore;
