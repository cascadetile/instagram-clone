import React from 'react';

import './style.scss';

interface IImageSlider {
  image: string
}

export const ImageSlider: React.FC<IImageSlider> = ({ image }) => (
  <div className="image-slider">
    <div className="image-slider__wrapper">
      <div className="image-slider__slide" style={{ backgroundImage: `url(${image})` }} />
    </div>
  </div>
);

export default ImageSlider;
