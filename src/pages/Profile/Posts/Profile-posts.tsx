import React from 'react';
import { connect } from 'react-redux';
import { IPostsProps } from '../types';
import { PostItemContainer } from '../../../layouts/PostProfilePage';
import './style.scss';
import { StoreType } from '../../../store/types/store';
import { ModalPost } from '../../../components/ModalPost/Modal-post';

const ProfilePosts: React.FC<IPostsProps> = (props: IPostsProps) => {
  const { posts, openPost } = props;

  const postsItems = posts.map((post) => <PostItemContainer key={post.id} post={post} />);

  return (
    <ul className="profile__posts">
      {postsItems}
      <ModalPost post={openPost} />
    </ul>
  );
};

const MapStateToProps = (state: StoreType) => ({
  openPost: state.profile.openPost,
});

export const ProfilePostsContainer = connect(MapStateToProps, {})(ProfilePosts);
