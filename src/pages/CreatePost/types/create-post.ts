import { IAction } from '../../../store/types/store';

export interface CreatePostProps {
  publish: (body: FormData) => void;
  caption: string;
  setCaption: (caption: string) => IAction;
  photoIsOpen: boolean;
  photoRef: object;
  isOpenContextMenu: boolean;
  toggleContextMenu: (body: boolean) => IAction;
  inputImageRef: object;
}
