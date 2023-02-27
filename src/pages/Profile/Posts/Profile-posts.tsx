import React from 'react';
import { connect } from 'react-redux';
import { IPost, IPostsProps } from '../types';
import { StoreType } from '../../../store/types/store';
import { PostItemContainer } from '../../../layouts/PostProfilePage';
import './style.scss';

const ProfilePosts: React.FC<IPostsProps> = (props: IPostsProps) => {
  const { posts } = props;

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
