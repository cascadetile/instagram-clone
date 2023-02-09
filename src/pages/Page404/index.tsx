/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export const Page404: React.FC = () => {
  return (
    <div className="page-undefined">
      <h2 className="page-undefined__header">К сожалению, эта страница недоступна.</h2>
      <p className="page-undefined__text">
        Возможно, вы воспользовались недействительной ссылкой или страница была удалена.
        <Link className="page-undefined__link" to="/">Назад в Instagram.</Link>
      </p>
    </div>
  );
};

export default Page404;
