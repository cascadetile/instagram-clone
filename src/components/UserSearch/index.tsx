/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export interface ISearchUser {
  username: string,
  name: string,
  profilePicture: string,
}

export const UserSearch: React.FC<ISearchUser> = ({
  username, name, profilePicture,
}) => {
  return (
    <Link to={`/profile/${username}`} className="user-search">
      <div className="user-search__pic" style={{ backgroundImage: `url(${profilePicture})` }} />
      <div className="user-search__text">
        <p>{username}</p>
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default UserSearch;
