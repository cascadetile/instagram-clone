/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridIcon } from '../../../assets/GridIcon';
import { SaveIcon } from '../../../assets/SaveIcon';
import { TaggedIcon } from '../../../assets/TaggedIcon';
import { TapeIcon } from '../../../assets/TapeIcon';
import { translate } from '../../../translate/translate-func';

import './style.scss';

export const ProfileControls: React.FC = () => {
  const [isGridOpen, setIsGridOpen] = useState(true);
  // const [isTapeOpen, setIsTapeOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('explore')) {
      setIsGridOpen(true);
      // setIsTapeOpen(false);
    } else {
      setIsGridOpen(false);
      // setIsTapeOpen(true);
    }
  }, [location]);

  const handleControlsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = e.currentTarget.className;
    if (name.includes('grid')) {
      setIsGridOpen(true);
      // setIsTapeOpen(false);
      navigate('/profile');
    } else {
      setIsGridOpen(false);
      // setIsTapeOpen(true);
      navigate('/profile/explore');
    }
  };

  return (
    <div className="profile-controls">
      <button className="profile-controls__button grid" type="button" disabled={isGridOpen} onClick={handleControlsClick}>
        <GridIcon />
        <p className="profile-controls__text">{translate('публикации')}</p>
      </button>
      <button className="profile-controls__button tape" type="button" disabled={false} style={{ cursor: 'auto' }}>
        <TapeIcon />
        <p className="profile-controls__text">{translate('лента')}</p>
      </button>
      <button className="profile-controls__button" type="button" disabled={false} style={{ cursor: 'auto' }}>
        <SaveIcon />
        <p className="profile-controls__text">{translate('сохраненное')}</p>
      </button>
      <button className="profile-controls__button" type="button" disabled={false} style={{ cursor: 'auto' }}>
        <TaggedIcon />
        <p className="profile-controls__text">{translate('отметки')}</p>
      </button>
    </div>
  );
};
