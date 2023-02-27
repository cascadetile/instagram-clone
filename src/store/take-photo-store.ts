import { IAction } from './types/store';

const initialState = {
  isOpen: false,
  photoRef: {},
  inputImageRef: {},
};

const OPEN_PHOTO = 'open_photo';
const SET_PHOTO_REF = 'set_photo_ref';
const SET_INPUT_IMAGE_REF = 'set_input_image_ref';

export const takePhotoStore = (state = initialState, action: IAction) => {
  switch (action.type) {
    case OPEN_PHOTO: {
      const stateCopy = { ...state };

      stateCopy.isOpen = action.body as boolean;

      return stateCopy;
    }
    case SET_PHOTO_REF: {
      const stateCopy = { ...state };

      stateCopy.photoRef = action.body as object;

      return stateCopy;
    }
    case SET_INPUT_IMAGE_REF: {
      const stateCopy = { ...state };

      stateCopy.inputImageRef = action.body as object;

      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export const toggleIsOpenTakePhotoAC = (isOpen: boolean) => ({
  type: OPEN_PHOTO,
  body: isOpen,
});

export const setPhotoRefAC = (photoRef: object) => ({
  type: SET_PHOTO_REF,
  body: photoRef,
});

export const setInputImageRefAC = (inputImage: object) => ({
  type: SET_INPUT_IMAGE_REF,
  body: inputImage,
});
