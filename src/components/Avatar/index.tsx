import React from 'react';
import { AvatarProps } from './types';
import './avatar.scss';
import DefaultAvatar from '../../assets/img/ava-def.png';

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  const { avatar } = props;
  const { src } = avatar;

  return (
    <div className="avatar">
      <img className="avatar__img" src={src || DefaultAvatar} alt="ava" />
    </div>
  );
};

export default Avatar;
