const SET_TOKEN = 'set_token';
const ENABLE_AUTH = 'enable_auth';
const DISABLE_AUTH = 'disable_auth';

const initialState = {
  isAuth: localStorage['instagram-store'] ? JSON.parse(localStorage['instagram-store']).auth.isAuth : false,
  session: localStorage['instagram-store'] ? JSON.parse(localStorage['instagram-store']).auth.session : '',
};

export const authStore = (state = initialState, action: { type: string, body: unknown }) => {
  switch (action.type) {
    case SET_TOKEN: {
      const copyState = { ...state };

      copyState.session = action.body as string;

      return copyState;
    }
    case ENABLE_AUTH:
    case DISABLE_AUTH: {
      const copyState = { ...state };

      copyState.isAuth = action.body as boolean;

      return copyState;
    }
    default: {
      return state;
    }
  }
};

export const setTokenAC = (session: string) => ({
  type: SET_TOKEN,
  body: session,
});

export const toggleIsAuthAC = (isAuth: boolean) => ({
  type: ENABLE_AUTH,
  body: isAuth,
});
