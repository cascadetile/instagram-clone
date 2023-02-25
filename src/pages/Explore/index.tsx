/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api';
import { SearchLoopIcon } from '../../assets/SearchLoopIcon';
import { PostExplorePage } from '../../layouts/PostExplorePage';
import { store } from '../../store/store';
import { translate } from '../../translate/translate-func';
import './style.scss';

export interface IPostsData {
  id: number,
  imageUrl: string,
}

export const Explore: React.FC = () => {
  const [posts, setPosts] = useState([{ id: 0, imageUrl: '' }]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      getPosts(store.getState().auth.session)
        .then((res) => setPosts(res.data.posts))
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  return (
    <div className="explore">
      <div className="explore__search">
        <input className="explore__search-input" type="text" placeholder={translate('Поиск')} />
        <SearchLoopIcon name="search-loop" fn={() => 2} />
      </div>
      <div className="explore__posts">
        {posts.length > 1 ? posts.map((post) => {
          return <PostExplorePage key={post.id} url={post.imageUrl} />;
        }) : <div className="explore__posts-loader" />}
      </div>
    </div>
  );
};

export default Explore;
