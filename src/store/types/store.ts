import { ThunkAction } from 'redux-thunk';
import { IAuthStore } from './auth';
import { IProfileStore } from './profile';
import { IPreloaderStore } from './preloader';
import { ICreatePost } from './create-post';
import { ITakePhoto } from './take-photo';
import { IContextMenu } from './context-menu';

export interface IAction {
  type: string;
  body: unknown;
}

export interface StoreType {
  auth: IAuthStore;
  profile: IProfileStore;
  preloader: IPreloaderStore;
  createPost: ICreatePost;
  takePhoto: ITakePhoto;
  contextMenu: IContextMenu;
}

export type ThunkType = ThunkAction<Promise<void>, StoreType, unknown, IAction>;
