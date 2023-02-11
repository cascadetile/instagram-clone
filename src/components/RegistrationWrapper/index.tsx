import React, { Dispatch, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Registration } from '../../pages/Registration';
import { RegistrationEmailContainer } from '../../layouts/RegistrationEmail';
import { RegistrationOTPContainer } from '../../layouts/RegistrationOTP';
import { RegistrationNameAndPassword } from '../../layouts/RegistrationNameAndPassword';
import { RegistrationBirthday } from '../../layouts/RegistrationBirthday';
import { RegistrationUsername } from '../../layouts/RegistrationUsername';
import AuthentificationContainer from '../../pages/Authentification';
import { Routers } from '../../router/routers';
import { IAction } from '../../store/types/store';
import { toggleIsAuthAC } from '../../store/auth-store';
import { IRegistrationWrapper } from './types/registration-wrapper';

const RegistrationWrapper: React.FC<IRegistrationWrapper> = (props) => {
  const { toggleIsAuth } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState('');

  return (
    <div className="page page__login">
      <div className="page-body page-body__login">
        <Routes>
          <Route path="/" element={<AuthentificationContainer />} />
          <Route path={Routers.REGISTRATION} element={<Registration />}>
            <Route
              path={Routers.EMAIL}
              element={<RegistrationEmailContainer setEmail={setEmail} />}
            />
            <Route
              path={Routers.OTP}
              element={(
                <RegistrationOTPContainer
                  email={email}
                  setSession={setSession}
                />
              )}
            />
            <Route
              path={Routers.NAME_AND_PASSWORD}
              element={(
                <RegistrationNameAndPassword
                  session={session}
                  setPassword={setPassword}
                />
              )}
            />
            <Route path={Routers.BIRTHDAY} element={<RegistrationBirthday session={session} />} />
            <Route
              path={Routers.USERNAME}
              element={(
                <RegistrationUsername
                  session={session}
                  password={password}
                  email={email}
                  toggleIsAuth={toggleIsAuth}
                />
              )}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

const MapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  toggleIsAuth: (isAuth: boolean) => dispatch(toggleIsAuthAC(isAuth)),
});

export const ProfileWrapperContainer = connect(
  () => ({}),
  MapDispatchToProps,
)(RegistrationWrapper);
