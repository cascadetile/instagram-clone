import React from 'react';
import { Post } from '../types';
import { IPostsProps } from '../types';
import { PostItem } from '../ProfilePost';

export const ProfilePosts: React.FC<IPostsProps> = (props: IPostsProps) => {
  const { posts } = props;

  const postsItems = posts.map((post) => <PostItem key={post.id} post={post} />);

  const showPost = (postItem: Post) => {
    console.log(postItem);
  };

  return (
    <ul className="profile__posts">
      {postsItems}
    </ul>
  );
};
