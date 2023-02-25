import { IPost, IProfile } from '../../pages/Profile/types';

export interface IProfileStore {
  myUsername: string;
  username: string;
  profile: IProfile;
  openPost: IPost;
}
