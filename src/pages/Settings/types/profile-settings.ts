import { IProfile } from '../../Profile/types';

export interface IProfileSettings {
  bio: string;
  fullname: string;
  website: string;
  username: string;
  changeAvatar: (formdata: FormData) => void;
  profilePicture: string;
  updateProfile: (body: Partial<IProfile>) => void;
}

export interface IResponseProfileSettings {
  data: {
    url: string
  }
}
