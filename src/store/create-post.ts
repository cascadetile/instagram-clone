import { IAction } from './types/store';

const initialState = {
  caption: '',
};

const CHANGE_CAPTION = 'change_caption';

export const createPostStore = (state = initialState, action: IAction) => {
  switch (action.type) {
    case CHANGE_CAPTION: {
      const stateCopy = { ...state };

      stateCopy.caption = action.body as string;

      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export const changeCaptionAC = (caption: string) => ({
  type: CHANGE_CAPTION,
  body: caption,
});
