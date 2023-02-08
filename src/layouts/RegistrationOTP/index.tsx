import React, { FormEvent, useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { sendEmail, sendOTP } from '../../api';
import { RegistarationHeader } from '../../components/RegistrationHeader';

interface Props {
  email: string
  setSession: React.Dispatch<React.SetStateAction<string>>
}

export const RegistrationOTP: React.FC<Props> = ({ email, setSession }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [loadMessage, setLoadMessage] = useState('Далее');

  useEffect(() => {
    if (email === '') {
      navigate('/registration/email', { replace: true });
    }
  }, []);

  const [otp, updateOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (/^\d{6}$/.test(otp)) {
      try {
        setLoad(true);
        setLoadMessage('Данные обрабатываются');
        const resp = await sendOTP(otp, email);
        if (resp.data.session) {
          setSession(resp.data.session);
        }
        navigate('/registration/name-and-password');
      } catch (error) {
        console.error(error);
        setErrorMessage('Код недействителен. Можно запросить новый.');
      }
    }
  };

  const resendOTP = async () => {
    try {
      await sendEmail(email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RegistarationHeader link="/registration/email" />
      <div className="registration-otp__window">
        <div className="registration-otp__title-1">Введите код подтверждения</div>
        <div className="registration-otp__title-2">
          Введите код подтверждения, который мы отправили на электронный адрес
          &nbsp;
          {email}
          .
        </div>
        <button
          onClick={() => resendOTP()}
          type="button"
          className="registration-otp__resend-btn"
        >
          Запросите код еще раз
        </button>
        <form onSubmit={(e) => onSubmit(e)} className="registration-otp__otp-form">
          <div className="registration-otp__otp-wrapper">
            <input
              onInput={(e) => updateOtp((e.target as HTMLInputElement).value)}
              className="registration-otp__otp-input"
              type="number"
              placeholder="Код подтверждения"
            />
            <div className="registration-otp__otp-label">Код подтверждения</div>
          </div>
          {errorMessage && <div className="registration-otp__otp-error">{ errorMessage }</div>}
          <button
            disabled={load}
            className={`registration-otp__submit-btn ${otp.length !== 6 ? 'registration-otp__submit-btn--disabled' : ''}`}
            type="submit"
          >
            {loadMessage}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationOTP;
