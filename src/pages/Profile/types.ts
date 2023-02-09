export interface IProfileHeader {
  username: string,
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Post {
  id: number,
  images: Array<string>,
}

export interface IPostsProps {
  posts: Array<Post>,
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
    posts: Array<Post>;
    profilePicture: string;
    bio: string,
    username: string;
    fullName: string;
    website: string;
  },
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
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
