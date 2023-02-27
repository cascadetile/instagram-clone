import React, { ChangeEvent, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { translate } from '../../translate/translate-func';
import { setInputImageRefAC, toggleIsOpenTakePhotoAC } from '../../store/take-photo-store';
import { toggleContextMenuAC } from '../../store/context-menu-store';
import { IAction, StoreType } from '../../store/types/store';

const UploadImageMenu: React.FC<{
  toggleTakePhoto:(isOpen: boolean) => IAction;
  photoRef: object;
  toggleContextMenu: typeof toggleContextMenuAC,
  setInputImageRef: typeof setInputImageRefAC
}> = (props) => {
  const dispatch = useDispatch();
  const {
    toggleTakePhoto, photoRef, toggleContextMenu, setInputImageRef,
  } = props;
  const input = useRef(null);

  const takePhoto = () => {
    dispatch(toggleTakePhoto(true));
  };

  const uploadImage = (event: ChangeEvent) => {
    const photoDom = (photoRef as unknown as { current: HTMLImageElement }).current!;

    if (photoDom) {
      const { files } = event.target as HTMLInputElement;

      if (files?.length) {
        photoDom.src = URL.createObjectURL(files[0]);
        toggleContextMenu(false);
        dispatch(setInputImageRef(input));
      }
    }
  };

  return (
    <li>
      <ul>
        <li onClick={takePhoto} className="create-menu__item no-label">
          {translate('Take_a_photo')}
        </li>
        <li className="create-menu__item">
          <label className="create-item__label" htmlFor="image">{translate('Upload_image')}</label>
          <input type="file" ref={input} className="create-menu__input" id="image" accept=".jpg,.png" onChange={uploadImage} />
        </li>
      </ul>
    </li>
  );
};

const MapStateToProps = (state: StoreType) => ({
  photoRef: state.takePhoto.photoRef,
});

const MapDispatchToProps = {
  toggleTakePhoto: toggleIsOpenTakePhotoAC,
  toggleContextMenu: toggleContextMenuAC,
  setInputImageRef: setInputImageRefAC,
};

export const UploadImageMenuContainer = connect(
  MapStateToProps,
  MapDispatchToProps,
)(UploadImageMenu);
