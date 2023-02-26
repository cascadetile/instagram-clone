import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

export interface IExplorePost {
  url: string,
}

export const PostExplorePage: React.FC<IExplorePost> = ({ url }) => {
  const postRef = useRef(null);
  const [heigth, setHeight] = useState(0);

  useEffect(() => {
    setHeight((postRef.current as unknown as HTMLDivElement).getBoundingClientRect().width);
  }, [window.innerWidth]);

  return (
    <div className="explore__post" ref={postRef} style={{ height: `${heigth}px`, backgroundImage: `url(${url})` }} />
  );
};

export default PostExplorePage;
