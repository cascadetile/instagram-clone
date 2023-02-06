import React, { useState, FormEvent, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { sendUsername, auth, sendAgree } from '../../api';

interface Props {
  session: string
  password: string
  email: string
}

export const RegistrationUsername: React.FC<Props> = ({ session, password, email }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (session === '') {
      navigate('/registration/email', { replace: true });
    }
  }, []);

  const [username, updateUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/.test(username)) {
      try {
        await sendUsername(username, session);
        await sendAgree(session);
        await auth(email, password);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage('Имя пользователя должно содержать только цифры, буквы, точки и знаки подчеркивания');
    }
  };

  return (
    <div className="registration-username__window">
      <div className="registration-username__title-1">Введите имя пользователя</div>
      <div className="registration-username__title-2">Выберите имя пользователя. Вы можете изменить его позже.</div>
      <form onSubmit={(e) => onSubmit(e)} className="registration-username__username-form">
        <div className="registration-username__username-wrapper">
          <input onInput={(e) => updateUsername((e.target as HTMLInputElement).value)} className="registration-username__username-input" type="text" />
          <div className="registration-username__username-label">Имя пользователя</div>
        </div>
        {errorMessage && <div className="registration-email__email-error">{ errorMessage }</div>}
        <button className="registration-username__submit-btn" type="submit">Далее</button>
      </form>
    </div>
  );
};

export default RegistrationUsername;
