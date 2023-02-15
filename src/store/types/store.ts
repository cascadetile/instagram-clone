import { ThunkAction } from 'redux-thunk';
import { IAuthStore } from './auth';
import { IProfileStore } from './profile';
import { IPreloaderStore } from './preloader';

export interface IAction {
  type: string;
  body: unknown;
}

export interface StoreType {
  auth: IAuthStore;
  profile: IProfileStore;
  preloader: IPreloaderStore;
}

export type ThunkType = ThunkAction<Promise<void>, StoreType, unknown, IAction>;
