import React, { useRef, useState } from 'react';
import { translate } from '../../translate/translate-func';
import { TakePhoto } from '../TakePhoto/take-photo';

export const UploadImageMenu: React.FC<{}> = () => {
  const video = useRef(null);
  const [isPhoto, togglePhoto] = useState(false);

  const takePhoto = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        togglePhoto(!isPhoto);
        const videoDom = video.current! as HTMLVideoElement;

        if (videoDom) {
          videoDom.srcObject = stream;
          videoDom.play();
        }
      }).catch((error) => {
        alert(error.message);
      });
  };

  const uploadImage = () => {

  };

  return (
    <li>
      <ul>
        <li onClick={takePhoto} className="create-menu__item no-label">
          {translate('Take_a_photo')}
          <TakePhoto isOpen={isPhoto} />
        </li>
        <li className="create-menu__item">
          <label className="create-item__label" htmlFor="image">{translate('Upload_image')}</label>
          <input type="file" className="create-menu__input" id="image" onChange={uploadImage} />
        </li>
      </ul>
    </li>
  );
};
