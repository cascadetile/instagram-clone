import React from 'react';
import { IPost } from '../types';
import { PostItemContainer } from '../../../layouts/PostProfilePage';
import './style.scss';
import { ModalPost } from '../../../components/ModalPost/Modal-post';

export const ProfilePosts: React.FC = () => {
  const { profile } = JSON.parse(localStorage['instagram-store']).profile;
  const { openPost, posts } = profile;
  const postsItems = posts.map((post: IPost) => <PostItemContainer key={post.id} post={post} />);

  return (
    <ul className="profile__posts">
      {postsItems}
      <ModalPost post={openPost} />
    </ul>
  );
};

export default ProfilePosts;
