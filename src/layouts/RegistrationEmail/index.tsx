/* eslint-disable arrow-body-style */
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { AxiosError } from 'axios';
import { connect } from 'react-redux';
import { sendEmail } from '../../api';
import { RegistarationHeader } from '../../components/RegistrationHeader';
import { StoreType } from '../../store/types/store';

// const domains = [
//   '@gmail.com',
//   '@hotmail.com',
//   '@yahoo.com',
//   '@outlook.com',
// ];

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>
  session: string
}

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const RegistrationEmail: React.FC<Props> = ({ setEmail, session }) => {
  const navigate = useNavigate();
  const [email, updateEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [load, setLoad] = useState(false);
  const [loadMessage, setLoadMessage] = useState('Далее');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    if (validateEmail(email)) {
      try {
        setLoad(true);
        setLoadMessage('Данные обрабатываются');
        await sendEmail(email, session);
        navigate('/registration/otp');
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          if (error?.response?.data.message === 'this email is already taken') {
            setErrorMessage('Этот email уже используется');
          } else if (error?.response?.data.message === 'we can\'t send a mail or update a database') {
            setErrorMessage('Не удалось отправить письмо, попробуйте снова');
          }
        }
      } finally {
        setLoad(false);
        setLoadMessage('Далее');
      }
    } else {
      setErrorMessage('Укажите действительный электронный адрес.');
    }
  };

  return (
    <>
      <RegistarationHeader link="/" />
      <div className="registration-email__window">
        <div className="registration-email__tabs">
          <button type="button" disabled className="registration-email__tabs-item registration-email__tabs-item--disabled">Телефон</button>
          <button type="button" className="registration-email__tabs-item">Эл. адрес</button>
        </div>
        <form noValidate onSubmit={(e) => onSubmit(e)} className="registration-email__email-form">
          <div className="registration-email__email-wrapper">
            <input onInput={(e) => updateEmail((e.target as HTMLInputElement).value)} className="registration-email__email-input" type="email" placeholder="Электронный адрес" />
            <div className="registration-email__email-label">Электронный адрес</div>
          </div>
          {errorMessage && <div className="registration-email__email-error">{ errorMessage }</div>}
          {/* <div className="registration-email__domains">
            {
              domains.map((domain) => {
                return (
                  <button
                    type="button"
                    className="registration-email__domains-item">
                      {domain}
                  </button>
                );
              })
            }
          </div> */}
          {/* TODO: блокировать кнопку после отправки запроса */}
          <button
            disabled={load}
            onClick={() => setEmail(email)}
            className={`registration-email__submit-btn ${load ? 'registration-email__submit-btn--disabled' : ''}`}
            type="submit"
          >
            {loadMessage}
          </button>
        </form>
      </div>
    </>
  );
};

const MapStateToProps = (store: StoreType) => ({
  session: store.auth.session,
});

export const RegistrationEmailContainer = connect(MapStateToProps, () => ({}))(RegistrationEmail);
