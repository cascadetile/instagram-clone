import React, {
  useState, FormEvent, useEffect, useRef,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import { auth } from '../../api';
import { translate } from '../../translate/translate-func';

interface IAuthentification {
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}

export const Authentification: React.FC<IAuthentification> = ({ setIsAuthorized }) => {
  const navigate = useNavigate();

  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loadMessage, setLoadMessage] = useState(translate('Sign_in'));

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await auth(email, password);
      // const { session } = response;

      setLoadMessage(translate('Data_processed'));
      setIsAuthorized(true);
      navigate('/');
      // TODO: write resp to variable and store it in redux
    } catch (error) {
      console.error(error);
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
          <button className="auth__submit-btn" type="submit">{loadMessage}</button>
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

export default Authentification;
