import { Post } from '../Posts/types/posts';

export interface UserType {
  user: {
    following: number;
    followers: number;
    posts: Array<Post>;
    profilePicture: string;
    bio: string,
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
