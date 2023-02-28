/* eslint-disable */
import React, {
  ChangeEvent, useEffect, useState, useRef,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import { translate } from '../../translate/translate-func';
import './style.scss';
import { publishPostThunk } from '../../store/profile-store';
import { StoreType } from '../../store/types/store';
import { CreatePostProps } from './types/create-post';
import { changeCaptionAC } from '../../store/create-post';
import { ContextMenu } from '../../components/ContextMenu/context-menu';
import { UploadImageMenuContainer } from '../../components/UploadImage/upload-image';
import { TakePhotoContainer } from '../../components/TakePhoto/take-photo';
import { toggleContextMenuAC } from '../../store/context-menu-store';

const CreatePost: React.FC<CreatePostProps> = (
  props,
) => {
  const {
    publish,
    caption,
    setCaption,
    photoIsOpen,
    photoRef,
    isOpenContextMenu,
    toggleContextMenu,
    inputImageRef,
  } = props;

  const dispatch = useDispatch();
  const textarea = useRef(null);
  const [isOpen, toggleShowPictureMenu] = useState(isOpenContextMenu);
  const [photoOpened, togglePhotoOpened] = useState(photoIsOpen);

  const photoRefDom = (photoRef as unknown as { current: HTMLElement });

  useEffect(() => {
    togglePhotoOpened(photoIsOpen);
  }, [photoIsOpen]);

  useEffect(() => {
    toggleShowPictureMenu(isOpenContextMenu);
  }, [isOpenContextMenu]);

  const showMenu = () => {
    dispatch(toggleContextMenu(!isOpen));
  };

  const publishPost = async () => {
    const photoDom = photoRefDom.current! as HTMLImageElement;
    const input = (inputImageRef as unknown as { current: HTMLElement }).current;

    const request = await fetch(photoDom.src);
    const blob = await request.blob();

    const file = new File([blob], 'caption', { type: 'image/png' });
    const dt = new DataTransfer();
    dt.items.add(file);
    const image = dt.files[0];

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    await publish(formData);

    if (textarea.current && photoRefDom.current) {
      dispatch(setCaption(''));
      (photoRefDom.current as HTMLImageElement).src = '';

      if (input) {
        (input as unknown as HTMLInputElement).value = '';
      }
    }
    setIsUploaded(false);
  };

  const changeCaption = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.nativeEvent.target as HTMLTextAreaElement;
    dispatch(setCaption(value));
  };

  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    const photoDom = photoRefDom.current! as HTMLImageElement;
    const url = photoDom?.src;
    if(window.location.href !== url) {
      setIsUploaded(true);
    }
  });

  return (
    <div className="create-post">
      <div className="create-post__uploaded">
      <p>{isUploaded ? translate('изображение успешно загружено') : translate('загрузите изображение')}</p>
      </div>
      <div className="create-post__image">
        <textarea
          ref={textarea}
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
            <ContextMenu isOpen={isOpen} menu={UploadImageMenuContainer} />
          </span>
        </span>
      </div>
      <button className="create-post__publish" type="button" onClick={publishPost}>
        {translate('Publish')}
      </button>
      <TakePhotoContainer isOpen={photoOpened} />
    </div>
  );
};

const MapStateToProps = (state: StoreType) => ({
  caption: state.createPost.caption,
  photoIsOpen: state.takePhoto.isOpen,
  photoRef: state.takePhoto.photoRef,
  isOpenContextMenu: state.contextMenu.isOpen,
  inputImageRef: state.takePhoto.inputImageRef,
});

const MapDispatchToProps = {
  publish: publishPostThunk,
  setCaption: changeCaptionAC,
  toggleContextMenu: toggleContextMenuAC,
};

export const CreatePostContainer = connect(
  MapStateToProps,
  MapDispatchToProps,
)(CreatePost);
