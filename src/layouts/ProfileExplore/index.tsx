/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IPost } from '../../pages/Profile/types';
import { Post } from '../PostHomePage';
import './style.scss';

export const ProfileExplore: React.FC = () => {
  const { profile } = JSON.parse(localStorage['instagram-store']).profile;
  const { profilePicture, posts, username } = profile;

  return (
    <div className="profile-explore">
      {posts.map((post: IPost) => {
        return <Post key={post.id} username={username} profilePicture={profilePicture} {...post} />;
      })}
    </div>
  );
};

export default ProfileExplore;
