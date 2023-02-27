/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getProfiles } from '../../api';
import { LoaderBlock } from '../../components/LoaderBlock';
import { UserSearch } from '../../components/UserSearch';
import { store } from '../../store/store';
import { translate } from '../../translate/translate-func';
import './style.scss';

export interface ISearchUser {
  id: number,
  username: string,
  name: string,
  profilePicture: string,
}

export interface IOutletContext {
  0: boolean,
  1: () => boolean,
  2: { value: string },
  3: boolean,
  4: () => boolean,
}

export const ExploreSearch: React.FC = () => {
  const value: IOutletContext = useOutletContext();
  const [
    changeValue, setChangeValue,
  ]:[boolean, React.Dispatch<React.SetStateAction<boolean>>] = useOutletContext();
  const [
    loading, setLoading,
  ]:[boolean, React.Dispatch<React.SetStateAction<boolean>>] = useOutletContext();
  const [users, setUsers] = useState([{
    id: 0, username: '', name: '', profilePicture: '',
  }]);

  const findUsers = (str: string, array: Array<ISearchUser>) => {
    return array
      .filter((user) => user.name.includes(str) || user.username.includes(str))
      .map((user) => ({ ...user, profilePicture: user.profilePicture || 'http://localhost:3000/static/media/ava-def.10691648d79aa2f92514.png' }));
  };

  document.documentElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setChangeValue(true);
      setLoading(true);
    }
  });

  useEffect(() => {
    if (changeValue) {
      (async () => {
        try {
          const res = await getProfiles(store.getState().auth.session);
          setUsers(findUsers(value[2].value, res.data.users));
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
    <div className="explore-search">
      {users[0]?.username ? users.map((user) => {
        return <UserSearch key={user.id} {...user} />;
      }) : <p data-active={loading} className="explore-search__text">{translate('Ничего не найдено')}</p>}
      {loading ? <LoaderBlock /> : ''}
    </div>
  );
};

export default ExploreSearch;
