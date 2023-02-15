import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authStore } from './auth-store';
import { profileStore } from './profile-store';
import { PreloaderStore } from './preloader-store';

export const store = createStore(combineReducers({
  auth: authStore,
  profile: profileStore,
  preloader: PreloaderStore,
}), applyMiddleware(thunk));
