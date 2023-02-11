import { Post } from './posts';

export interface UserType {
  following: number;
  followers: number;
  posts: Array<Post>;
  profilePicture: string;
  bio: string,
  username: string;
  fullName: string;
  website: string;
  fullname: string;
  name: string;
}

export interface InfoProps {
  info: {
    followers: number;
    following: number;
    postsCounter: number;
  },
  user: {
    profilePicture: string;
    username: string;
    bio: string;
  }
}

export interface IProfile {
  setUser: (profile: UserType) => void
}
