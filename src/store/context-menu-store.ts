import { IAction } from './types/store';

const initialState = {
  isOpen: false,
};

const TOGGLE_CONTEXT_MENU = 'toggle_context_menu';

export const contextMenuStore = (state = initialState, action: IAction) => {
  switch (action.type) {
    case TOGGLE_CONTEXT_MENU: {
      const stateCopy = { ...state };

      stateCopy.isOpen = action.body as boolean;

      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export const toggleContextMenuAC = (isOpen: boolean) => ({
  type: TOGGLE_CONTEXT_MENU,
  body: isOpen,
});
