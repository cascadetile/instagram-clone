import React from 'react';
import { Post } from '../types';
import './style.scss';

export const PostItem: React.FC<{ post: Post }> = (props: { post: Post }) => {
  const { post } = props;

  const showPost = (postItem: Post) => {
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
