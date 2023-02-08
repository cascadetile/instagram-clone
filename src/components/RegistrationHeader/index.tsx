/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import { BackArrow } from '../../assets/BackArrow';

import './style.scss';

interface IRegistarationHeader {
  link: string
}

export const RegistarationHeader: React.FC<IRegistarationHeader> = ({ link }) => {
  return (
    <header className="registration-header">
      <Link className="registration-header__link" to={link}><BackArrow /></Link>
      <h2 className="registration-header__text">регистрация</h2>
    </header>
  );
};

export default RegistarationHeader;
