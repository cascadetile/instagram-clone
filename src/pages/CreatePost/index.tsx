import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../translate/translate-func';
import './style.css';
import { publishPostThunk } from '../../store/profile-store';
import { IPost } from '../Profile/types';

const CreatePost: React.FC<{ publish: (body: Partial<IPost>) => void }> = (
  props,
) => {
  const { publish } = props;
  const video = useRef(null);
  const canvas = useRef(null);
  const photo = useRef(null);

  const takePhoto = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        const videoDom = video.current! as HTMLVideoElement;

        if (videoDom) {
          videoDom.srcObject = stream;
          videoDom.play();
        }
      });
  };

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

  const publishPost = async () => {
    const photoDom = photo.current! as HTMLImageElement;

    const request = await fetch(photoDom.src);
    const blob = await request.blob();

    const file = new File([blob], 'caption', { type: 'image/png' });
    const dt = new DataTransfer();
    dt.items.add(file);
    const image = dt.files[0];

    const formData = new FormData();
    formData.append('caption', image);

    // publish(formData);
  };

  return (
    <div className="create-post">
      <div>
        <div>
          <button type="button" onClick={takePhoto}>
            {translate('Take_a_photo')}
          </button>
          <video ref={video} src="" />
          <canvas ref={canvas} />
          <button type="button" onClick={capture}>
            {translate('Capture')}
          </button>
          <img ref={photo} src="" alt="" />
        </div>
        <div>
          <label htmlFor="image">{translate('Upload_image')}</label>
          <input type="hidden" id="image" />
        </div>
      </div>
      <div>
        <textarea
          name="post"
          id="post"
          placeholder={translate('Description')}
        />
      </div>
      <button type="button" onClick={publishPost}>
        {translate('Publish')}
      </button>
    </div>
  );
};

const MapDispatchToProps = () => ({
  publish: publishPostThunk,
});

export const CreatePostContainer = connect(
  () => ({}),
  MapDispatchToProps,
)(CreatePost);
