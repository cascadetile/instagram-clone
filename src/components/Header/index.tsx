/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import './style.css';
import { Logo } from '../../assets/Logo';
import { ToggleWithText } from '../ToggleWithText';

export const Header: React.FC = () => {
  const onToggleClick = (value: boolean) => {
    console.log(value);
  };

  return (
    <div className="header">
      <div>
        <Logo />
      </div>
      <div className="header__menu">
        <div className="header__menu-item header__menu-item--selected">
          <a href="#home" className="header__menu-item-link">Home</a>
        </div>
        <div className="header__menu-item">
          <a href="#aboutme" className="header__menu-item-link">About me</a>
        </div>
        <div className="header__menu-item">
          <a href="#works" className="header__menu-item-link">Works</a>
        </div>
        <div className="header__menu-item">
          <a href="#contacts" className="header__menu-item-link">Contacts</a>
        </div>
      </div>
      <ToggleWithText label="My resume" toggled={false} onClick={onToggleClick} />
    </div>
  );
};

export default Header;
