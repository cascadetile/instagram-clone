import React, { useState } from 'react';
import './style.scss';

export const BurgerButton: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleBurger = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={`burger-btn ${isOpen ? 'open' : ''}`} onClick={toggleBurger}>
      <span className="burger-btn__row" />
    </div>
  );
};
