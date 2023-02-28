/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../api';
import { store } from '../../store/store';
import { ProfilePostsContainer } from '../Profile/Posts/Profile-posts';
import { ProfileControls } from '../Profile/ProfileControls';
import { ProfileInfo } from '../Profile/ProfileInfo';
import './style.scss';

export const Profiles: React.FC = () => {
  const fakeProfile = {
    bio: '',
    followers: 0,
    following: 0,
    fullname: '',
    profilePicture: '',
    username: '',
    website: '',
    posts: [{
      id: 0, likes: 0, image: '', caption: '',
    }],
  };
  const [profile, setProfile] = useState(fakeProfile);
  const { profileId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile(profileId!, store.getState().auth.session);
        setProfile(res.data.profile);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const {
    posts, followers, following, profilePicture, username, bio,
  } = profile;

  const infoProps = {
    followers,
    following,
    postsCounter: posts.length,
  };

  const userProps = {
    profilePicture,
    username,
    bio,
  };
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <ProfileInfo info={infoProps} user={userProps} />
        <ProfileControls />
        <ProfilePostsContainer posts={posts} />
      </div>
    </div>
  );
};

export default Profiles;
