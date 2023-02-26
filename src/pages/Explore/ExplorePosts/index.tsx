/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../../api';
import { SearchLoopIcon } from '../../../assets/SearchLoopIcon';
import { PostExplorePage } from '../../../layouts/PostExplorePage';
import { store } from '../../../store/store';
import { translate } from '../../../translate/translate-func';
import './style.scss';

export const ExplorePosts: React.FC = () => {
  const [posts, setPosts] = useState([{ id: 0, imageUrl: '' }]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetching) {
      getPosts(store.getState().auth.session)
        .then((res) => setPosts(res.data.posts))
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  return (
    <div className="explore">
      <div className="explore__search explore-search__wrapper">
        <input
          className="explore__search-input"
          type="text"
          placeholder={translate('Поиск')}
          onClick={
            () => {
              navigate('/explore/search');
            }
          }
        />
        <SearchLoopIcon name="search-loop" fn={() => 2} />
      </div>
      <div className="explore__posts">
        {posts.length > 1 ? posts.map((post) => {
          return <PostExplorePage key={post.id} {...post} />;
        }) : <div className="explore__posts-loader" />}
      </div>
    </div>
  );
};

export default ExplorePosts;
