import React, { useState, FormEvent, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendUsername, auth, sendAgree } from '../../api';
import { RegistarationHeader } from '../../components/RegistrationHeader';
import { StoreType } from '../../store/types/store';

interface Props {
  session: string
  password: string
  email: string,
  toggleIsAuth: (isAuth: boolean) => void;
}

export const RegistrationUsername: React.FC<Props> = ({
  session, password, email, toggleIsAuth,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (session === '') {
      navigate('/registration/email', { replace: true });
    }
  }, []);

  const [username, updateUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [load, setLoad] = useState(false);
  const [loadMessage, setLoadMessage] = useState('Далее');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/.test(username)) {
      try {
        setLoad(true);
        setLoadMessage('Данные обрабатываются');
        await sendUsername(username, session);
        await sendAgree(session);
        await auth(email, password, session);
        toggleIsAuth(true);
        navigate('/');
      } catch (error) {
        alert('Ошибка! Попробуйте заново');
      } finally {
        setLoad(false);
        setLoadMessage('Далее');
      }
    } else {
      setErrorMessage('Имя пользователя должно содержать только цифры, буквы, точки и знаки подчеркивания');
    }
  };

  return (
    <>
      <RegistarationHeader link="/registration/birthday" />
      <div className="registration-username__window">
        <div className="registration-username__title-1">Введите имя пользователя</div>
        <div className="registration-username__title-2">Выберите имя пользователя. Вы можете изменить его позже.</div>
        <form onSubmit={(e) => onSubmit(e)} className="registration-username__username-form">
          <div className="registration-username__username-wrapper">
            <input onInput={(e) => updateUsername((e.target as HTMLInputElement).value)} className="registration-username__username-input" type="text" />
            <div className="registration-username__username-label">Имя пользователя</div>
          </div>
          {errorMessage && <div className="registration-email__email-error">{ errorMessage }</div>}
          <button className="registration-username__submit-btn" type="submit" disabled={load}>{loadMessage}</button>
        </form>
      </div>
    </>
  );
};

const MapStateToProps = (store: StoreType) => ({
  session: store.auth.session,
});

const RegistrationUsernameContainer = connect(MapStateToProps, () => ({}))(RegistrationUsername);

export default RegistrationUsernameContainer;
