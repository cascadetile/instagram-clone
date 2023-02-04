import React from 'react';
import { IPostsProps } from './types/posts';
import { PostItem } from './Post-item';

export const ProfilePosts: React.FC<IPostsProps> = (props: IPostsProps) => {
  const { posts } = props;

  const postsItems = posts.map((post) => <PostItem key={post.id} post={post} />);

  return (
    <ul className="profile__posts">
      {postsItems}
    </ul>
  );
};
