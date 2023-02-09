import React from 'react';

export const BackArrow: React.FC = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 29.73a1 1 0 0 1-.71-.29L9.93 18.12a3 3 0 0 1 0-4.24L21.24 2.56A1 1 0 1 1 22.66 4L11.34 15.29a1 1 0 0 0 0 1.42L22.66 28a1 1 0 0 1 0 1.42 1 1 0 0 1-.66.31Z"
      style={{
        fill: '#231f20',
      }}
      data-name="arrow left"
    />
  </svg>
);

export default BackArrow;
