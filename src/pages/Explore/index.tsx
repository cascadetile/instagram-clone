import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SearchLoopIcon } from '../../assets/SearchLoopIcon';
import { translate } from '../../translate/translate-func';
import './style.scss';

export const Explore: React.FC = () => {
  const [activeInput, setActiveInput] = useState(false);
  const [changeValue, setChangeValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('search')) {
      setActiveInput(true);
    }
  }, [location]);

  return (
    <div className="explore">
      <div className="explore__search">
        <input
          className="explore__search-input"
          type="text"
          placeholder={translate('Поиск')}
          data-active={!activeInput}
          onClick={
            () => {
              navigate('/explore/search');
              setActiveInput(true);
            }
          }
          onChange={
            (e) => {
              setValue(e.target.value);
              setChangeValue(true);
              setLoading(true);
            }
          }
        />
        <SearchLoopIcon name="search-loop" fn={() => 2} />
        {activeInput ? <button className="explore__search-button" type="button" onClick={() => { navigate('/explore'); setActiveInput(false); }}>{translate('Отмена')}</button> : ''}
      </div>
      <Outlet context={[loading, setLoading, { value }, changeValue, setChangeValue]} />
    </div>
  );
};

export default Explore;
