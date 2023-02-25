export interface IProfileHeader {
  username: string,
}

export interface IPost {
  id: number,
  image: string,
  likes: number,
  caption: string,
}

export interface IPostsProps {
  posts: Array<IPost>,
  openPost: IPost,
}

export interface IProfileNav {
  navProps: {
    addedClass: string;
    username: string;
  }
}

export interface UserType {
  user: IProfile,
  setIsAuthorized?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IProfile {
  following: number;
  followers: number;
  posts: Array<IPost>;
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
