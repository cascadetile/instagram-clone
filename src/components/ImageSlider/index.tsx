import React, { useEffect, useState } from 'react';

import './style.scss';

interface IImageSlider {
  image: string
}

export const ImageSlider: React.FC<IImageSlider> = ({ image }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [leftArrowDisable, setLeftArrowDisable] = useState(true);
  const [rightArrowDisable, setRightArrowDisable] = useState(true);
  const [width, setWidth] = useState(468);

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setWidth(window.innerWidth - 10);
    } else {
      setWidth(468);
    }
  });

  useEffect(() => {
    if (currentSlide === 0) {
      setLeftArrowDisable(true);
    } else {
      setLeftArrowDisable(false);
    }
  }, [leftArrowDisable, currentSlide]);

  useEffect(() => {
    if (currentSlide <= image.length - 1) {
      setRightArrowDisable(true);
    } else {
      setRightArrowDisable(false);
    }
  }, [rightArrowDisable, currentSlide]);

  const handleRightClick = () => {
    if (currentSlide > image.length - 1) {
      setCurrentSlide(image.length - 1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleLeftClick = () => {
    if (currentSlide < 0) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="image-slider">
      <button className="button-arrow button-arrow__left" type="button" onClick={handleLeftClick} disabled={leftArrowDisable}>
        <p className="button-arrow__text button-arrow__text-left">&#8249;</p>
      </button>
      <div className="image-slider__wrapper" style={{ transform: `translateX(-${currentSlide * width}px)` }}>
        <div className="image-slider__slide" style={{ backgroundImage: `url(${image})` }} />
      </div>
      <button className="button-arrow button-arrow__right" type="button" onClick={handleRightClick} disabled={rightArrowDisable}>
        <p className="button-arrow__text button-arrow__text-right">&#8250;</p>
      </button>
      <ul className="image-slider__dots">
        <li className="image-slider__dot" key={Math.random()} />
      </ul>
    </div>
  );
};

export default ImageSlider;
