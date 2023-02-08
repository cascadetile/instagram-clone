import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authStore } from './auth-store';

export const store = createStore(combineReducers({
  auth: authStore,
}), applyMiddleware(thunk));
