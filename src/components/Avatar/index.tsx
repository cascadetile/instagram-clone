import React from 'react';
import { AvatarProps } from './types/avatar';
import './avatar.scss';
import DefaultAvatar from '../../assets/img/ava-def.png';

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const { avatar } = props;
  const { src, size } = avatar;

  const avaStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="avatar">
      <img className="avatar__img" src={src || DefaultAvatar} alt="ava" style={avaStyle} />
    </div>
  );
};

export default Avatar;
