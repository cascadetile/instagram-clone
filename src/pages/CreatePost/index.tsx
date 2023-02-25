import React, { ChangeEvent, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { translate } from '../../translate/translate-func';
import './style.scss';
import { publishPostThunk } from '../../store/profile-store';
import { StoreType } from '../../store/types/store';
import { CreatePostProps } from './types/create-post';
import { changeCaptionAC } from '../../store/create-post';
import { ContextMenu } from '../../components/ContextMenu/context-menu';
import { UploadImageMenu } from '../../components/UploadImage/upload-image';

const CreatePost: React.FC<CreatePostProps> = (
  props,
) => {
  const { publish, caption, setCaption } = props;

  const photo = useRef(null);

  const dispatch = useDispatch();
  const [isOpen, toggleShowPictureMenu] = useState(false);

  const showMenu = () => {
    toggleShowPictureMenu(!isOpen);
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
    formData.append('image', image);
    formData.append('caption', caption);

    publish(formData);
  };

  const changeCaption = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.nativeEvent.target as HTMLTextAreaElement;
    dispatch(setCaption(value));
  };

  return (
    <div className="create-post">
      <div className="create-post__image">
        <textarea
          name="post"
          id="post"
          value={caption}
          onChange={changeCaption}
          placeholder={translate('Description')}
          className="create-post__textarea"
        />
        <span
          className="create-image__btn"
          onClick={showMenu}
        >
          <span className="create-btn__wrapper">
            <ContextMenu isOpen={isOpen} menu={UploadImageMenu} />
          </span>
        </span>
      </div>
      <button type="button" onClick={publishPost}>
        {translate('Publish')}
      </button>
    </div>
  );
};

const MapStateToProps = (state: StoreType) => ({
  caption: state.createPost.caption,
});

const MapDispatchToProps = {
  publish: publishPostThunk,
  setCaption: changeCaptionAC,
};

export const CreatePostContainer = connect(
  MapStateToProps,
  MapDispatchToProps,
)(CreatePost);
