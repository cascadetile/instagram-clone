import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import './style.scss';
import { toggleIsOpenTakePhotoAC, setPhotoRefAC } from '../../store/take-photo-store';

const TakePhoto: React.FC<{
  isOpen: boolean,
  togglePhoto: typeof toggleIsOpenTakePhotoAC,
  setPhotoRef: typeof setPhotoRefAC,
}> = (props) => {
  const { isOpen, togglePhoto, setPhotoRef } = props;
  const dispatch = useDispatch();

  const photo = useRef(null);
  const video = useRef(null);
  const canvas = useRef(null);
  const [streamVideo, setVideoStream] = useState(null as unknown as MediaStream);

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          setVideoStream(stream);
          const videoDom = video.current! as HTMLVideoElement;

          if (videoDom) {
            videoDom.srcObject = stream;
            videoDom.play();
          }
        }).catch((error) => {
          alert(error.message);
        });
    } else {
      setPhotoRef(photo);
    }
  }, [isOpen]);

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

  const closeVideo = () => {
    togglePhoto(false);
    dispatch(setPhotoRef(photo));
  };

  useEffect(() => {
    if (!isOpen && streamVideo) {
      streamVideo.getTracks().forEach((track) => {
        if (track.readyState === 'live') {
          track.stop();
        }
      });
    }
  }, [isOpen]);

  return (
    <div className={`post-photo ${isOpen ? 'open' : ''}`}>
      <video className="post-photo__video" ref={video} src="" />
      <canvas className="post-photo__canvas" ref={canvas} />
      <button className="post-video__capture" type="button" onClick={capture} />
      <img className="post-video__photo" ref={photo} src="" alt="" />
      <span onClick={closeVideo} className="post-video__close">
        <span className="post-video__wrapper" />
      </span>
    </div>
  );
};

const MapDispatchToProps = {
  togglePhoto: toggleIsOpenTakePhotoAC,
  setPhotoRef: setPhotoRefAC,
};

export const TakePhotoContainer = connect(() => ({}), MapDispatchToProps)(TakePhoto);
