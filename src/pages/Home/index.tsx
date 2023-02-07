/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Post } from '../../components/PostHomePage';
import './style.css';

const fakeUser = {
  name: 'amina_s',
  profileImg: 'https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  images: ['https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'],
  likes: 22,
  caption: 'first post ever',
};

export const Home: React.FC = () => (
  <div className="home">
    <Post {...fakeUser} />
    <Post {...fakeUser} />
  </div>
);

export default Home;
