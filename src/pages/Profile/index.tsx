import React from 'react';
import ProfileInfo from './Info/Profile-info';
import './style.scss';
import { ProfileEdit } from './Nav/Profile-edit';
import { ProfilePosts } from './Posts/Profile-posts';
import { translate } from '../../translate/translate-func';
import { ProfileHeader } from './Header/Profile-header';

export const Profile: React.FC = () => {
  const user = {
    followers: 10000,
    following: 10000,
    posts: [],
    profilePicture: '',
    bio: 'hi there!',
    username: 'example',
  };

  const {
    following, followers, posts, profilePicture, bio, username,
  } = user;

  const infoProps = {
    following,
    followers,
    postsCounter: posts.length,
  };

  const userProps = {
    profilePicture,
    username,
    bio,
  };

  return (
    <div className="profile">
      <ProfileHeader username={username} />
      <ProfileInfo info={infoProps} user={userProps} />
      <p className="profile__description">{bio}</p>
      <span className="profile__add-post">
        <span className="profile-add__icon" />
        <p className="profile-add__text">{translate('Add')}</p>
      </span>
      <ProfileEdit />
      <ProfilePosts posts={posts} />
    </div>
  );
};
