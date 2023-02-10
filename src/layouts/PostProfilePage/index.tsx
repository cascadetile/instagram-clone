import React from 'react';
import { IPost } from '../../pages/Profile/types';
import './style.scss';

export const PostItem: React.FC<{ post: IPost }> = (props: { post: IPost }) => {
  const { post } = props;

  const showPost = (postItem: IPost) => {
    console.log(postItem);
  };

  return (
    <button
      type="button"
      className="profile-post__item"
      onClick={() => showPost(post)}
    >
      {post.images.length > 1 ? <span className="profile-post__multy" /> : ''}
      {post.images[0] ? (
        <img className="profile-post__img" src={post.images[0]} alt="" />
      ) : (
        ''
      )}
    </button>
  );
};
