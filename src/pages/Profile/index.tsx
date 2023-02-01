import React from 'react';
import ProfileInfo from './Info/index';
import './style.css';

interface UserType {
  following: number,
  followers: number,
  posts: Array<unknown>
}

const Profile: React.FC = (props: UserType) => {
  const { following, followers, posts } = props;

  const infoProps = {
    following,
    followers,
    publications: posts.length,
  };

  return (
    <div className="profile">
      <ProfileInfo info={infoProps} />
    </div>
  );
};
export default Profile;
