import React from 'react';
import { IPost } from '../../pages/Profile/types';
import './style.scss';

export const ModalPost: React.FC<{ post: IPost }> = (props) => {
  const { post } = props;

  return (
    <div className={`post-modal ${post ? '' : 'closed'}`}>
      {post?.caption}
    </div>
  );
};
