/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Post } from '../../layouts/PostHomePage';
import './style.css';

// TODO: remove fakeUsers and change Post declaration
const fakeUser = {
  name: 'amina_s',
  profileImg: 'https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  images: ['https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80', 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', 'https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80'],
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
