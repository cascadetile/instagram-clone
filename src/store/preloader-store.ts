import { IAction } from './types/store';

const initialState = {
  isLoading: false,
};

const TOGGLE_PRELOADER = 'set_preloader';

export const PreloaderStore = (state = initialState, action: IAction) => {
  switch (action.type) {
    case TOGGLE_PRELOADER: {
      const copyState = { ...state };

      copyState.isLoading = action.body as boolean;

      return copyState;
    }
    default: {
      return state;
    }
  }
};

export const togglePreloaderAC = (isLoading: boolean) => ({
  type: TOGGLE_PRELOADER,
  body: isLoading,
});
