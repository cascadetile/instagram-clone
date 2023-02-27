import React from 'react';

export interface ICloseIcon {
  name: string,
  fn: () => void,
}

export const CloseIcon: React.FC<ICloseIcon> = ({ name, fn }) => (
  <svg
    className={name}
    onClick={fn}
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m16 8-8 8m0-8 8 8"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
