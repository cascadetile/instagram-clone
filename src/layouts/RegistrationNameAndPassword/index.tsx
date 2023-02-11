import React, { useState, FormEvent, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { sendNameAndPassword } from '../../api';
import { RegistarationHeader } from '../../components/RegistrationHeader';
import { AxiosError } from 'axios';

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
    setNameErrorMessage('');
    setPasswordErrorMessage('');
    if (name.length === 0) {
      setNameErrorMessage('Заполните поле для имени');
    }
    if (password.length === 0) {
      setPasswordErrorMessage('Заполните поле для пароля');
    }
    if (password.length < 8) {
      setPasswordErrorMessage('Минимальная длина пароля 8 символов');
    }
    if (name.length && password.length >= 8) {
      try {
        setLoad(true);
        setLoadMessage('Данные обрабатываются');
        await sendNameAndPassword(name, password, session);
        setPassword(password);
        navigate('/registration/birthday');
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          if (error?.response?.data.message.includes('length must be greater than 7')) {
            setPasswordErrorMessage('Минимальная длина пароля 8 символов');
          } else if (error?.response?.data.message === 'Weak password') {
            setPasswordErrorMessage('Слабый пароль. Придумайте другой');
          } else if (error?.response?.data.message === 'The "name" can not be empty') {
            setNameErrorMessage('Имя не может быть пустым');
          } else if (error?.response?.data.message.includes('length must be less than or equal to 100')) {
            setNameErrorMessage('Имя не может быть длинее 100 символов');
          } else if (error?.response?.data.message === 'The session is expired') {
            setPasswordErrorMessage('Сессия истекла, начните сначала');
          }
        }
      } finally {
        setLoad(false);
        setLoadMessage('Далее');
      }
    }
  };

  return (
    <>
      <RegistarationHeader link="/registration/otp" />
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
    </>
  );
};

export default RegistrationNameAndPassword;
