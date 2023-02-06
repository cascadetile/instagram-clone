/* eslint-disable arrow-body-style */
import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.css';

export const Registration: React.FC = () => {
  return (
    <div className="registration">
      <Outlet />
    </div>
  );
};

export default Registration;
