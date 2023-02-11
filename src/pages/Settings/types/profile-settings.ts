import { UserType } from '../../Profile/types/profile';

export interface IProfileSettings {
  bio: string;
  fullname: string;
  website: string;
  username: string;
  changeAvatar: (formdata: FormData) => void;
  profilePicture: string;
  updateProfile: (body: Partial<UserType>) => void;
}

export interface IResponseProfileSettings {
  data: {
    url: string
  }
}
