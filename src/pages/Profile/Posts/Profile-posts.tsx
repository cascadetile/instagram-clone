import React from 'react';
import { IPost } from '../types';
import { PostItemContainer } from '../../../layouts/PostProfilePage';
import './style.scss';

export const ProfilePosts: React.FC = () => {
  const { profile } = JSON.parse(localStorage['instagram-store']).profile;
  const { posts } = profile;
  const postsItems = posts.map((post: IPost) => <PostItemContainer key={post.id} post={post} />);

  return (
    <ul className="profile__posts">
      {postsItems}
    </ul>
  );
};

export default ProfilePosts;
