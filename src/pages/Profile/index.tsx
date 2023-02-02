import React from 'react';
import ProfileInfo from './Info/index';
import './profile.scss';
import { ProfileEdit } from './nav';
import { ProfilePosts } from './posts';
import Ava from '../../assets/img/7.jpeg';
import Post1 from '../../assets/img/1.jpg';
import Post2 from '../../assets/img/2.jpeg';
import Post3 from '../../assets/img/3.jpeg';
import Post4 from '../../assets/img/4.jpg';
import Post5 from '../../assets/img/5.webp';
import Post6 from '../../assets/img/6.webp';

export const Profile: React.FC = () => {
  const user = {
    followers: 10000,
    following: 10000,
    posts: [
      { id: 1, images: [Post1, Post2] },
      { id: 20, images: [Post2] },
      { id: 2, images: [Post3] },
      { id: 4, images: [Post4] },
      { id: 3, images: [Post5] },
      { id: 5, images: [Post6] },
    ],
    profilePicture: Ava,
    bio: 'hi there!',
  };

  const {
    following, followers, posts, profilePicture, bio,
  } = user;

  const infoProps = {
    following,
    followers,
    postsCounter: posts.length,
  };

  const userProps = {
    profilePicture,
  };

  return (
    <div className="profile">
      <ProfileInfo info={infoProps} user={userProps} />
      <p className="profile__description">{bio}</p>
      <ProfileEdit />
      <ProfilePosts posts={posts} />
    </div>
  );
};
