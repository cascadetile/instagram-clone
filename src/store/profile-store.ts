import { Dispatch } from 'redux';
import { UserType } from '../pages/Profile/types/profile';
import { IAction, StoreType } from './types/store';
import { translate } from '../translate/translate-func';
import { changeAvatar, getProfile, changeProfile } from '../api';
import { togglePreloaderAC } from './preloader-store';
import { Post } from '../pages/Profile/types/posts';

const SET_PROFILE = 'set_profile';
const SET_MY_USERNAME = 'set_my_username';
const SET_BIO = 'set_bio';
const SET_AVATAR = 'set_avatar';
const SET_USERNAME = 'set_username';
const SET_FULLNAME = 'set_fullname';

const initialState = {
  profile: {
    bio: '',
    username: '',
    website: '',
    posts: [] as Array<Post>,
    fullName: '',
    profilePicture: '',
    following: 0,
    followers: 0,
    fullname: '',
  },
  myUsername: '',
  username: '',
  bio: '',
};

export const profileStore = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_PROFILE: {
      const stateCopy = { ...state };

      stateCopy.profile = action.body as UserType;

      return stateCopy;
    }
    case SET_MY_USERNAME: {
      const stateCopy = { ...state };

      stateCopy.myUsername = action.body as string;

      return stateCopy;
    }
    case SET_AVATAR: {
      const stateCopy = { ...state };

      stateCopy.profile.profilePicture = action.body as string;

      return stateCopy;
    }
    case SET_BIO: {
      const stateCopy = { ...state };

      stateCopy.profile.bio = action.body as string;

      return stateCopy;
    }
    case SET_USERNAME: {
      const stateCopy = { ...state };

      stateCopy.profile.username = action.body as string;

      return stateCopy;
    }
    case SET_FULLNAME: {
      const stateCopy = { ...state };

      stateCopy.profile.fullname = action.body as string;
      stateCopy.profile.fullName = action.body as string;

      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export const setProfileAC = (profile: UserType) => ({
  type: SET_PROFILE,
  body: profile,
});

export const setMyUsernameAC = (myUsername: string) => ({
  type: SET_MY_USERNAME,
  body: myUsername,
});

export const setUsernameAC = (username: string) => ({
  type: SET_USERNAME,
  body: username,
});
export const setFullnameAC = (username: string) => ({
  type: SET_FULLNAME,
  body: username,
});

export const setBioAC = (bio: string) => ({
  type: SET_BIO,
  body: bio,
});

export const changeAvatarAC = (path: string) => ({
  type: SET_AVATAR,
  body: path,
});

export const getUserThunk = (
  username: string,
) => (dispatch: Dispatch<IAction>, getState: () => StoreType) => {
  const { auth } = getState();
  const { session } = auth;

  dispatch(togglePreloaderAC(true));

  getProfile(username, session).then((response) => {
    dispatch(setProfileAC(response.data.profile));
  }).catch(() => {
    throw new Error('User_upload_error');
  }).finally(() => {
    dispatch(togglePreloaderAC(false));
  });
};

export const changeAvatarThunk = (
  formData: FormData,
) => (dispatch: Dispatch<IAction>, getState: () => StoreType) => {
  const { auth } = getState();
  const { session } = auth;

  try {
    dispatch(togglePreloaderAC(true));
    changeAvatar(formData, session).then((response) => {
      dispatch(changeAvatarAC(response.data.url));
    });
  } catch {
    throw new Error('Upload_image_error');
  } finally {
    dispatch(togglePreloaderAC(false));
  }
};

export const updateUserSettingsThunk = (
  body: Partial<UserType>,
) => (dispatch: Dispatch<IAction>, getState: () => StoreType) => {
  const { auth } = getState();
  const { session } = auth;

  try {
    dispatch(togglePreloaderAC(true));
    changeProfile(body, session).then((response) => {
      dispatch(setProfileAC(response.data.profile));
    });
  } catch {
    throw new Error(translate('Update_profile_info_error'));
  } finally {
    dispatch(togglePreloaderAC(false));
  }
};
