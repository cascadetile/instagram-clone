import { connect, useDispatch } from 'react-redux';
import React from 'react';
import { IPost } from '../../pages/Profile/types';
import { openPostAC } from '../../store/profile-store';
import './style.scss';
import { IAction } from '../../store/types/store';

export const PostItem: React.FC<{
  post: IPost;
  openPost: (postItem: IPost) => IAction;
}> = (props) => {
  const { post, openPost } = props;
  const dispatch = useDispatch();

  const showPostModal = (postItem: IPost) => {
    dispatch(openPost(postItem));
  };

  return (
    <button
      type="button"
      className="profile-post__item profile-page"
      onClick={() => showPostModal(post)}
    >
      {post.image ? (
        <img className="profile-post__img" src={post.image} alt="" />
      ) : (
        ''
      )}
    </button>
  );
};

const MapDispatchToProps = {
  openPost: openPostAC,
};

export const PostItemContainer = connect(() => ({}), MapDispatchToProps)(PostItem);
