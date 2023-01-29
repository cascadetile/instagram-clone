/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import './style.css';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__left">Copyright © 2022 Vlad Yaschenkov </div>
      <div className="footer__right">All Rights Reserved.</div>
    </div>
  );
};

export default Footer;
