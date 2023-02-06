import React, { useState, FormEvent, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { sendNameAndPassword } from '../../api';

interface Props {
  session: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export const RegistrationNameAndPassword: React.FC<Props> = ({ session, setPassword }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (session === '') {
      navigate('/registration/email', { replace: true });
    }
  }, []);

  const [name, updateName] = useState('');
  const [password, updatePassword] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [load, setLoad] = useState(false);
  const [loadMessage, setLoadMessage] = useState('Далее');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (name.length === 0) {
      setNameErrorMessage('Заполните поле для имени');
    }
    if (password.length === 0) {
      setPasswordErrorMessage('Заполните поле для пароля');
    } else {
      setNameErrorMessage('');
      setPasswordErrorMessage('');
      try {
        setLoad(true);
        setLoadMessage('Данные обрабатываются');
        await sendNameAndPassword(name, password, session);
        setPassword(password);
        navigate('/registration/birthday');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="registration-nnp__window">
      <div className="registration-nnp__title-1">Введите имя и пароль</div>
      <div className="registration-nnp__title-2">Добавьте имя, чтобы друзья могли найти вас.</div>
      <form onSubmit={(e) => onSubmit(e)} className="registration-nnp__nnp-form">
        <div className="registration-nnp__name-wrapper">
          <input onInput={(e) => updateName((e.target as HTMLInputElement).value)} className="registration-nnp__name-input" type="text" placeholder="Имя и фамилия" />
          <div className="registration-nnp__name-label">Имя и фамилия</div>
        </div>
        {nameErrorMessage && <div className="registration-otp__otp-error">{ nameErrorMessage }</div>}
        <div className="registration-nnp__password-wrapper">
          <input onInput={(e) => updatePassword((e.target as HTMLInputElement).value)} className="registration-nnp__password-input" type="text" placeholder="Пароль" />
          <div className="registration-nnp__password-label">Пароль</div>
        </div>
        {passwordErrorMessage && <div className="registration-otp__otp-error">{ passwordErrorMessage }</div>}
        <button className="registration-nnp__submit-btn" type="submit" disabled={load}>{loadMessage}</button>
      </form>
    </div>
  );
};

export default RegistrationNameAndPassword;
