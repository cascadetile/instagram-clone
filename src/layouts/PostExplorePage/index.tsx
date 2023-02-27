import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export interface IExplorePost {
  id: number,
  imageUrl: string,
}

export const PostExplorePage: React.FC<IExplorePost> = ({ id, imageUrl }) => {
  const postRef = useRef(null);
  const navigate = useNavigate();
  const [heigth, setHeight] = useState(0);

  useEffect(() => {
    setHeight((postRef.current as unknown as HTMLDivElement).getBoundingClientRect().width);
  }, [window.innerWidth]);

  return (
    <div
      className="explore__post"
      ref={postRef}
      onClick={() => navigate(`/p/${id}`)}
      style={{ height: `${heigth}px`, backgroundImage: `url(${imageUrl})` }}
    />
  );
};

export default PostExplorePage;
