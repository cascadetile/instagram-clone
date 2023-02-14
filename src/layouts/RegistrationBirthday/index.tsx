/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent, FormEvent, useEffect, useRef, useState,
} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { sendBirthday } from '../../api';
import { RegistarationHeader } from '../../components/RegistrationHeader';

interface Props {
  session: string
}

export const RegistrationBirthday: React.FC<Props> = ({ session }) => {
  const navigate = useNavigate();

  const [month, updateMonth] = useState('');
  const [day, updateDay] = useState('');
  const [year, updateYear] = useState('');
  const [load, setLoad] = useState(false);
  const [loadMessage, setLoadMessage] = useState('Далее');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (session === '') {
      navigate('/registration/email', { replace: true });
    }
  }, []);

  const daysSelect = useRef<HTMLSelectElement>(null);
  const yearsSelect = useRef<HTMLSelectElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      setLoad(true);
      setLoadMessage('Данные обрабатываются');
      const birthday = `${year}-${month}-${day}`;
      await sendBirthday(birthday, session);
      navigate('/registration/username');
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error?.response?.data.message === 'The session is expired') {
          setErrorMessage('Сессия истекла, начните сначала');
        } else if (error?.response?.data.message === 'Database error') {
          setErrorMessage('Ошибка сервера. Попробуйте снова');
        } else if (error?.response?.data.message === 'The date can not be greater than today') {
          setErrorMessage('Дата не может быть больше, чем сегодняшний день');
        }
      }
    } finally {
      setLoad(false);
      setLoadMessage('Далее');
    }
  };

  const populateDaysSelect = (selectedMonth: string) => {
    if (daysSelect.current) {
      let days = 30;
      if (Number(selectedMonth) % 2 === 0 && selectedMonth !== '02') {
        days = 30;
      } else if (Number(selectedMonth) % 2 !== 0) {
        days = 31;
      } else if (selectedMonth === '02') {
        days = 28;
      }
      daysSelect.current.innerHTML = '';
      for (let i = 1; i <= days; i += 1) {
        const option = document.createElement('option');
        option.value = i.toString().length > 1 ? i.toString() : `0${i}`;
        option.innerHTML = i.toString();
        daysSelect.current?.append(option);
      }
    }
  };

  const populateYearsSelect = () => {
    if (yearsSelect.current) {
      const startingYear = 1919;
      yearsSelect.current.innerHTML = '';
      for (let i = new Date().getFullYear(); i >= startingYear; i -= 1) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.innerHTML = i.toString();
        yearsSelect.current?.append(option);
      }
    }
  };

  const onMonthChange = (event: ChangeEvent) => {
    updateMonth((event.target as HTMLSelectElement).value);
  };

  useEffect(() => {
    updateDay('01');
    updateMonth('01');
    updateYear(new Date().getFullYear().toString());
    populateYearsSelect();
  }, []);

  useEffect(() => {
    if (month !== '') {
      populateDaysSelect(month);
    }
  }, [month]);

  return (
    <>
      <RegistarationHeader link="/registration/name-and-password" />
      <div className="registration-birthday__window">
        <div className="registration-birthday__logo" />
        <div className="registration-birthday__title-1">Укажите дату вашего рождения</div>
        <div className="registration-birthday__title-2">Эта информация не будет показываться в вашем общедоступном профиле.</div>
        <form onSubmit={(e) => onSubmit(e)} className="registration-birthday__birthday-form">
          <div className="registration-birthday__birthday-wrapper">
            <select className="registration-birthday__month-select" onChange={(e) => onMonthChange(e)}>
              <option value="01">Январь</option>
              <option value="02">Февраль</option>
              <option value="03">Март</option>
              <option value="04">Апрель</option>
              <option value="05">Май</option>
              <option value="06">Июнь</option>
              <option value="07">Июль</option>
              <option value="08">Август</option>
              <option value="09">Сентябрь</option>
              <option value="10">Октябрь</option>
              <option value="11">Ноябрь</option>
              <option value="12">Декабрь</option>
            </select>
            <select className="registration-birthday__month-select" onChange={(e) => updateDay(e.target.value)} ref={daysSelect} />
            <select className="registration-birthday__month-select" onChange={(e) => updateYear(e.target.value)} ref={yearsSelect} />
          </div>
          {errorMessage && <div className="registration-birthday__birthday-error">{ errorMessage }</div>}
          <div className="registration-birthday__title-3">Укажите собственный день рождения, даже если вы создаете этот аккаунт для компании, домашнего животного и пр.</div>
          <button className="registration-birthday__submit-btn" type="submit" disabled={load}>{loadMessage}</button>
        </form>
      </div>
    </>
  );
};

export default RegistrationBirthday;
