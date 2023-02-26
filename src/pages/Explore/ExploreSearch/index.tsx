/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfiles } from '../../../api';
import { SearchLoopIcon } from '../../../assets/SearchLoopIcon';
import { UserSearch } from '../../../components/UserSearch';
import { store } from '../../../store/store';
import { translate } from '../../../translate/translate-func';
import './style.scss';

export interface ISearchUser {
  id: number,
  username: string,
  name: string,
  profilePicture: string,
}

export const ExploreSearch: React.FC = () => {
  const [changeValue, setChangeValue] = useState(false);
  const [activeInput, setActiveInput] = useState(true);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([{
    id: 0, username: '', name: '', profilePicture: '',
  }]);
  const navigate = useNavigate();

  const findUsers = (str: string, array: Array<ISearchUser>) => {
    if (!str.length) {
      return [{
        id: 0, username: '', name: '', profilePicture: '',
      }];
    }
    return array
      .filter((user) => user.name.includes(str) || user.username.includes(str))
      .map((user) => ({ ...user, profilePicture: user.profilePicture || 'http://localhost:3000/static/media/ava-def.10691648d79aa2f92514.png' }));
  };

  const handleInputChange = () => {
    const input = document.querySelector('.explore__search-input') as HTMLInputElement;
    input!.addEventListener('change', (e) => {
      setUsers([{
        id: 0, username: '', name: '', profilePicture: '',
      }]);
      setChangeValue(true);
      setLoading(true);
    });
    document.documentElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setUsers([{
          id: 0, username: '', name: '', profilePicture: '',
        }]);
        setChangeValue(true);
        setLoading(true);
      }
    });
  };

  useEffect(() => {
    handleInputChange();
  });

  useEffect(() => {
    if (changeValue) {
      (async () => {
        try {
          const res = await getProfiles(store.getState().auth.session);
          setUsers(findUsers(value, res.data.users));
        } catch (error) {
          console.log(error);
        } finally {
          setChangeValue(false);
          setLoading(false);
        }
      })();
    }
  }, [changeValue]);

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
            }
          }
        />
        <SearchLoopIcon name="search-loop" fn={() => 2} />
        {activeInput ? <button className="explore__search-button" type="button" onClick={() => { navigate('/explore'); setActiveInput(false); }}>{translate('Отмена')}</button> : ''}
      </div>
      <div className="explore-search">
        {users[0]?.username ? users.map((user) => {
          return <UserSearch key={user.id} {...user} />;
        }) : <p data-active={loading} className="explore-search__text">{translate('Ничего не найдено')}</p>}
        <div data-active={loading} className="explore__posts-loader" />
      </div>
    </div>
  );
};

export default ExploreSearch;
