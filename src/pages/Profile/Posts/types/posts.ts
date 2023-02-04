export interface Post {
  id: number,
  images: Array<string>,
}

export interface IPostsProps {
  posts: Array<Post>,
}
