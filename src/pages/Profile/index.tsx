import React from 'react';
import ProfileInfo from './ProfileInfo';
import './style.scss';
import { ProfileEdit } from './ProfileEdit';
import { ProfilePosts } from './ProfilePosts';
import { translate } from '../../translate/translate-func';
import { ProfileHeader } from './ProfileHeader';
import { UserType } from './types';

export const Profile: React.FC<UserType> = (props: UserType) => {
  const { user } = props;
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
