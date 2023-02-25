/* eslint-disable arrow-body-style */
import React from 'react';
import { IPostsProps } from '../../pages/Profile/types';
import { PostItemContainer } from '../PostProfilePage';

import './style.scss';

export const ProfilePublications: React.FC<IPostsProps> = ({ posts }) => {
  return (
    <div className="profile-publications">
      {posts.map((post) => {
        return <PostItemContainer post={post} />;
      })}
    </div>
  );
};

export default ProfilePublications;
