import { Post } from './posts';

export interface UserType {
  user: {
    following: number;
    followers: number;
    posts: Array<Post>;
    profilePicture: string;
    bio: string,
    username: string;
    fullName: string;
    website: string;
  }
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
