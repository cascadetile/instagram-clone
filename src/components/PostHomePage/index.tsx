/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { LikeIcon } from '../../assets/LikeIcon';
import Avatar from '../Avatar';

import './style.scss';

interface IPerson {
  name: string,
  profileImg: string,
}

interface IPost extends IPerson {
  images: Array<string>,
  likes: number,
  caption: string
}

export const Post: React.FC<IPost> = ({
  name, profileImg, images, likes, caption,
}) => {
  const avatar = {
    src: profileImg,
    size: 32,
  };

  return (
    <article className="insta-post">
      <div className="insta-post__wrapper">
        <div className="insta-post__header">
          {/* <img src={profileImg} alt="" /> */}
          <Avatar avatar={avatar} />
          {/* TODO: сделать ссылку на аккаунт человека */}
          <Link className="insta-post__profile-link" to="/profile">{name}</Link>
        </div>
        <div className="insta-post__images">
          {/* TODO: сделать из этого слайдер/карусель */}
          <img src={images[0]} alt="" />
        </div>
        <div className="insta-post__controls">
          {/* TODO: добавить кнопки */}
          <button className="insta-post__controls-like" type="button"><LikeIcon /></button>
        </div>
        <div className="insta-post__likes">
          <p className="insta-post__likes-text">
            {likes}
            <span>нравится</span>
          </p>
        </div>
        <div className="insta-post__caption">
          {/* TODO: сделать ссылку на аккаунт человека */}
          <Link className="insta-post__profile-link" to="/profile">{name}</Link>
          <pre className="insta-post__caption-text">{caption}</pre>
        </div>
        {/* TODO: добавить возможность оставлять комментарии */}
      </div>
    </article>
  );
};

export default Post;
