/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api';
import { LoaderBlock } from '../../components/LoaderBlock';
import { PostExplorePage } from '../../layouts/PostExplorePage';
import { store } from '../../store/store';
import './style.scss';

export const ExplorePosts: React.FC = () => {
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
    <div className="explore__posts">
      {posts.length > 1 ? posts.map((post) => {
        return <PostExplorePage key={post.id} {...post} />;
      }) : <LoaderBlock />}
    </div>
  );
};

export default ExplorePosts;
