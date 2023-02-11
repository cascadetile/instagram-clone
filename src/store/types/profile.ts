import { UserType } from '../../pages/Profile/types/profile';

export interface IProfileStore {
  myUsername: string;
  username: string;
  profile: UserType
}
