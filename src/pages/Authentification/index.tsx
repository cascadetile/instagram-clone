import React, {
  useState, FormEvent, useEffect, useRef, Dispatch,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { auth } from '../../api';
import { translate } from '../../translate/translate-func';
import { setTokenAC, toggleIsAuthAC } from '../../store/auth-store';
import { IAction, StoreType } from '../../store/types/store';
import { setMyUsernameAC } from '../../store/profile-store';

interface IAuthentification {
  enableIsAuth: (isAuth: boolean) => void,
  setToken: (auth_token: string) => void,
  setMyUsername: (myUsername: string) => void,
  session: string
}

export const Authentification: React.FC<IAuthentification> = (props: IAuthentification) => {
  const {
    enableIsAuth, setToken, setMyUsername, session,
  } = props;
  const navigate = useNavigate();

  localStorage['app-theme'] = 'light';

  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loadMessage, setLoadMessage] = useState('Войти');
  const [load, setLoad] = useState(false);

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await auth(email, password, session);
      setToken(res.data.session);
      setMyUsername(res.data.username);
      setLoadMessage(translate('Data_processed'));
      enableIsAuth(true);
      setLoad(true);
      navigate('/');
      // TODO: write resp to variable and store it in redux
    } catch (error) {
      // TODO: change message
      alert('Введенные данные неверные');
      console.error(error);
    } finally {
      setLoadMessage('Войти');
      setLoad(false);
    }
  };

  useEffect(() => {
    if (passwordInput.current) {
      if (isPasswordVisible) {
        passwordInput.current.type = 'text';
      } else {
        passwordInput.current.type = 'password';
      }
    }
  }, [isPasswordVisible]);

  return (
    <div className="auth">
      <img className="login-img" src="https://static.cdninstagram.com/rsrc.php/v3/yr/r/fzBXVxs22bH.png" alt="" />
      <div className="auth__window">
        <div className="auth__logo" />
        <form onSubmit={(e) => onSubmit(e)} className="auth__form">
          <div className="auth__email-wrapper">
            <input
              ref={emailInput}
              onInput={(e) => updateEmail((e.target as HTMLInputElement).value)}
              className={`auth__email-input ${email.length ? 'auth__email-input--focused' : ''}`}
              type="text"
            />
            <div className="auth__email-label">Имя пользователя или эл. адрес</div>
          </div>
          <div className="auth__password-wrapper">
            <input
              ref={passwordInput}
              onInput={(e) => updatePassword((e.target as HTMLInputElement).value)}
              className={`auth__password-input ${password.length ? 'auth__password-input--focused' : ''}`}
              type="text"
            />
            <div className="auth__password-label">Пароль</div>
            <button onClick={() => setPasswordVisibility(!isPasswordVisible)} className="auth__password-show-btn" type="button">{isPasswordVisible ? 'Скрыть' : 'Показать'}</button>
          </div>
          <button className="auth__forgot-btn" type="button">Забыли пароль?</button>
          <button className="auth__submit-btn" type="submit" disabled={load}>{loadMessage}</button>
        </form>
        <div className="auth__separator-block">
          <p className="auth__separator-text">или</p>
        </div>
        <div className="auth__login-block">
          <p>Нет акккаунта?</p>
          <Link className="auth__login-link" to="/registration/email">Зарегистрируйся</Link>
        </div>
      </div>
    </div>
  );
};

const MapStateToProps = (store: StoreType) => ({
  session: store.auth.session,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  setToken(auth_token: string) {
    dispatch(setTokenAC(auth_token));
  },
  setMyUsername(username: string) {
    dispatch(setMyUsernameAC(username));
  },
  enableIsAuth(isAuth: boolean) {
    dispatch(toggleIsAuthAC(isAuth));
  },
});

const AuthentificationContainer = connect(MapStateToProps, mapDispatchToProps)(Authentification);

export default AuthentificationContainer;
