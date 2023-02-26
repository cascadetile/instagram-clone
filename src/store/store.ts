import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authStore } from './auth-store';
import { profileStore } from './profile-store';
import { preloaderStore } from './preloader-store';
import { createPostStore } from './create-post';

export const store = createStore(combineReducers({
  auth: authStore,
  profile: profileStore,
  preloader: preloaderStore,
  createPost: createPostStore,
}), applyMiddleware(thunk));

store.subscribe(() => {
  localStorage['instagram-store'] = JSON.stringify(store.getState());
});
