import { IAction } from './types/store';

const SET_TOKEN = 'set_token';
const CHECK_AUTH = 'check_auth';

const initialState = {
  isAuth: false,
  auth_token: '',
};

export const authStore = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_TOKEN: {
      const copyState = { ...state };

      copyState.auth_token = action.body as string;

      return copyState;
    }
    case CHECK_AUTH: {
      const copyState = { ...state };

      copyState.isAuth = action.body as boolean;

      return copyState;
    }
    default: {
      return false;
    }
  }
};

export const setTokenAC = (auth_token: string) => ({
  type: SET_TOKEN,
  body: auth_token,
});

export const checkAuthAC = (isAuth: boolean) => ({
  type: CHECK_AUTH,
  body: isAuth,
});
