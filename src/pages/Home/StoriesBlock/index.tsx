/* eslint-disable arrow-body-style */
import React from 'react';
import { CloseIcon } from '../../../assets/CloseIcon';
import { translate } from '../../../translate/translate-func';
import './style.scss';

type Stroies = {
  x: boolean,
  setX: React.Dispatch<React.SetStateAction<boolean>>,
};

export const StoriesGreetingBlock: React.FC<Stroies> = ({
  x,
  setX,
}) => {
  return (
    <div
      className="stories-block"
      data-open={x}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setX(false);
        }
      }}
    >
      <div className="storie-block">
        <CloseIcon name="close-icon" fn={() => setX(false)} />
        <h2>{translate('Привет!')}</h2>
        <h3>{translate('Добро пожаловать к нам на сайт :)')}</h3>
        <ul className="storie-block__team">
          <p className="storie-block__text">{translate('Команда разработчиков:')}</p>
          <li>
            <a className="storie-block__text-link" href="https://github.com/cascadetile">
              {translate('Темирлан')}
            </a>
          </li>
          <li>
            <a className="storie-block__text-link" href="https://github.com/sch-aa-vk">
              {translate('Амина')}
            </a>
          </li>
          <li>
            <a className="storie-block__text-link" href="https://github.com/nepo92">
              {translate('Александр')}
            </a>
          </li>
        </ul>
        <img className="storie-block__image" src="https://media.tenor.com/bXIzx6izXTQAAAAi/cute.gif" alt="" />
        <p className="storie-block__text-last">{translate('Будем очень рады если вам понравится наша работа))')}</p>
      </div>
    </div>
  );
};

export const StoriesAvailableBlock: React.FC<Stroies> = ({
  x,
  setX,
}) => {
  return (
    <div
      className="stories-block"
      data-open={x}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setX(false);
        }
      }}
    >
      <div className="storie-block available">
        <CloseIcon name="close-icon" fn={() => setX(false)} />
        <ul className="storie-block__team">
          <p className="storie-block__text-ul">{translate('Функции доступные на данный момент: ')}</p>
          <li className="storie-block__text-li">
            {translate('Регистрация и Авторизация')}
          </li>
          <li className="storie-block__text-li">
            {translate('Управление профилем')}
          </li>
          <li className="storie-block__text-li">
            {translate('Смена темы')}
          </li>
          <li className="storie-block__text-li">
            {translate('Поиск пользователей')}
          </li>
          <li className="storie-block__text-li">
            {translate('Просмотр публикаций')}
          </li>
          {/* TODO: заполнить после реализации */}
        </ul>
        <img className="storie-block__image-cat" src="https://media.tenor.com/zX4_xyECtR4AAAAC/mochi-cat-chibi-cat.gif" alt="" />
      </div>
    </div>
  );
};
