import React from 'react';
import { connect } from 'react-redux';
import { IPost } from '../types';
import { StoreType } from '../../../store/types/store';
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

const MapStateToProps = (state: StoreType) => ({
  openPost: state.profile.openPost,
});

export const ProfilePostsContainer = connect(MapStateToProps, {})(ProfilePosts);
