/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridIcon } from '../../../assets/GridIcon';
import { SaveIcon } from '../../../assets/SaveIcon';
import { TaggedIcon } from '../../../assets/TaggedIcon';
import { TapeIcon } from '../../../assets/TapeIcon';
import { translate } from '../../../translate/translate-func';

import './style.scss';

export const ProfilePosts: React.FC = () => {
  const [isGridOpen, setIsGridOpen] = useState(true);
  const [isTapeOpen, setIsTapeOpen] = useState(false);
  const navigate = useNavigate();

  const handleControlsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = e.currentTarget.className;
    if (name.includes('grid')) {
      setIsGridOpen(true);
      setIsTapeOpen(false);
      navigate('/profile');
    } else {
      setIsGridOpen(false);
      setIsTapeOpen(true);
      navigate('/profile/explore');
    }
  };

  return (
    <div className="profile-controls">
      <button className="profile-controls__button grid" type="button" disabled={isGridOpen} onClick={(e) => handleControlsClick(e)}>
        <GridIcon />
        <p className="profile-controls__text">{translate('публикации')}</p>
      </button>
      <button className="profile-controls__button tape" type="button" disabled={isTapeOpen} onClick={(e) => handleControlsClick(e)}>
        <TapeIcon />
        <p className="profile-controls__text">{translate('лента')}</p>
      </button>
      <button className="profile-controls__button" type="button" disabled={false}>
        <SaveIcon />
        <p className="profile-controls__text">{translate('сохраненное')}</p>
      </button>
      <button className="profile-controls__button" type="button" disabled={false}>
        <TaggedIcon />
        <p className="profile-controls__text">{translate('отметки')}</p>
      </button>
    </div>
  );
};
