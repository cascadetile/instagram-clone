import React from 'react';
import './style.scss';

export const ContextMenu: React.FC<{ isOpen: boolean, menu: React.FC }> = (props) => {
  const { isOpen, menu: Menu } = props;

  return (
    <ul className={`context-menu ${isOpen ? 'open' : ''}`}>
      <Menu />
    </ul>
  );
};
