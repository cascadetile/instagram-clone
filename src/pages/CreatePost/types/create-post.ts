import { IAction } from '../../../store/types/store';

export interface CreatePostProps {
  publish: (body: FormData) => void;
  caption: string;
  setCaption: (caption: string) => IAction;
}
