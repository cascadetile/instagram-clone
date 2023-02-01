/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';

export const CreatePostLogo: React.FC = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#000" strokeWidth={1.5}>
        <path d="M2 8a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8Z" />
        <path d="M12 7.757v8.486M16.25 12H7.765" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default CreatePostLogo;
