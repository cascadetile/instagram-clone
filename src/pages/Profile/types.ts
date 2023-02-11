export interface IProfileHeader {
  username: string,
}

export interface IPost {
  id: number,
  images: Array<string>,
  likes: number,
  caption: string,
}

export interface IPostsProps {
  posts: Array<IPost>,
}

export interface IProfileNav {
  navProps: {
    addedClass: string;
    username: string;
  }
}

export interface UserType {
  user: {
    following: number;
    followers: number;
    posts: Array<IPost>;
    profilePicture: string;
    bio: string,
    username: string;
    fullName: string;
    website: string;
  },
  setIsAuthorized?: React.Dispatch<React.SetStateAction<boolean>>
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
