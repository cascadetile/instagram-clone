/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { translate } from '../../translate/translate-func';
import { StoriesAvailableBlock, StoriesGreetingBlock } from './StoriesBlock';
import './style.scss';

export const Home: React.FC = () => {
  const [greetingModalOpen, setGreetingModalOpen] = useState(false);
  const [availableModalOpen, setAvailableModalOpen] = useState(false);
  const firstImg = 'https://www.svgrepo.com/show/438743/pet.svg';
  const secondImg = 'https://www.svgrepo.com/show/504427/google-play-games.svg';

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
    </div>
  );
};

export default Home;
