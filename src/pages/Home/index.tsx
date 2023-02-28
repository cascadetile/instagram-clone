// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable arrow-body-style */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getProfile, getProfiles } from '../../api';
import LoaderBlock from '../../components/LoaderBlock';
import { IPostDetailes, Post } from '../../layouts/PostHomePage';
import { store } from '../../store/store';
import { translate } from '../../translate/translate-func';
import { ISearchUser } from '../ExploreSearch';
import { IPost } from '../Profile/types';
import { StoriesAvailableBlock, StoriesGreetingBlock } from './StoriesBlock';
import './style.scss';

export const Home: React.FC = () => {
  const [greetingModalOpen, setGreetingModalOpen] = useState(false);
  const [availableModalOpen, setAvailableModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const firstImg = 'https://www.svgrepo.com/show/438743/pet.svg';
  const secondImg = 'https://www.svgrepo.com/show/504427/google-play-games.svg';

  const [posts, setPosts] = useState([{
    likes: 0, image: '', caption: '', username: '', profilePicture: '',
  }]);

  useEffect(() => {
    (async () => {
      try {
        const data: Array<IPostDetailes> = [];
        await getProfiles(store.getState().auth.session)
          .then((res) => res.data.users)
          .then((res) => Array.from(res))
          .then((res) => res.forEach(async (user) => {
            const session = store.getState().auth.session;
            const r = await getProfile((user as ISearchUser).username, session);
            const { username, profilePicture, posts } = r.data.profile;
            (posts as Array<IPost>).forEach((post) => {
              const { image, likes, caption } = post;
              data.push({
                username: username,
                profilePicture: profilePicture,
                image: image,
                likes: likes,
                caption: caption,
              })
              setPosts(data);
            })
          }));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = `${availableModalOpen || greetingModalOpen ? "hidden" : "auto"}`;
  }, [availableModalOpen, greetingModalOpen]);

  return (
    <div className="home">
      <div className="home__stories">
        <div className="home__story">
          <button
            type="button"
            className="home__story-icon"
            style={{
              backgroundImage: `url(${firstImg})`,
            }}
            onClick={() => {
              setGreetingModalOpen(true);
            }}
          />
          <p className="home__story-text">{translate('Приветствие')}</p>
        </div>
        <div className="home__story">
          <button
            type="button"
            className="home__story-icon"
            style={{
              backgroundImage: `url(${secondImg})`,
            }}
            onClick={() => {
              setAvailableModalOpen(true);
            }}
          />
          <p className="home__story-text">{translate('Доступно')}</p>
        </div>
      </div>
      <StoriesGreetingBlock
        x={greetingModalOpen}
        setX={setGreetingModalOpen}
      />
      <StoriesAvailableBlock
        x={availableModalOpen}
        setX={setAvailableModalOpen}
      />
      <div className="posts__container">
        <h2 className="posts__container-header">{translate('Рекомендации')}</h2>
        {loading ? <LoaderBlock /> : posts.map((post, index) => {
          return <Post key={index} {...post} />;
        })}
      </div>
    </div>
  );
};

export default Home;
