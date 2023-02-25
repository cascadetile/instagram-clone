import React, { useRef } from 'react';
import './style.scss';

export const TakePhoto: React.FC<{
  isOpen: boolean
}> = (props) => {
  const { isOpen } = props;

  const photo = useRef(null);
  const video = useRef(null);
  const canvas = useRef(null);

  const capture = () => {
    const photoDom = photo.current! as HTMLImageElement;
    const canvasDom = canvas.current! as HTMLCanvasElement;
    const videoDom = video.current! as HTMLVideoElement;

    if (canvasDom) {
      const context = canvasDom.getContext('2d');

      if (context) {
        context.drawImage(videoDom, 0, 0, 400, 300);

        if (photoDom) {
          photoDom.src = canvasDom.toDataURL('image/png');
        }
      }
    }
  };

  return (
    <div className={`post-photo ${isOpen ? 'open' : ''}`}>
      <video ref={video} src="" />
      <button className="post-video__capture" type="button" onClick={capture} />
      <img ref={photo} src="" alt="" />
      <span className="post-video__close" />
    </div>
  );
};
