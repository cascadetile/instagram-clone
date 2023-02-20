/* eslint-disable arrow-body-style */
import React from 'react';
import { SearchLoopIcon } from '../../assets/SearchLoopIcon';
import { translate } from '../../translate/translate-func';
import './style.scss';

export const Explore: React.FC = () => {
  return (
    <div className="explore">
      <div className="explore__search">
        <input className="explore__search-input" type="text" placeholder={translate('Поиск')} />
        <SearchLoopIcon name="search-loop" fn={() => 2} />
      </div>
      <div className="explore__posts" />
    </div>
  );
};

export default Explore;
