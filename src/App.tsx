import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { StoreType } from './store/types/store';
import { IApp } from './types/app';
import { App } from './components/App/App';
import { ProfileWrapperContainer } from './components/RegistrationWrapper';

function AppWrapper(props: IApp) {
  const { isAuth } = props;

  return isAuth ? <App /> : <ProfileWrapperContainer />;
}

const MapStateToProps = (store: StoreType) => ({
  isAuth: store.auth.isAuth,
});

const AppContainer = connect(MapStateToProps, () => ({}))(AppWrapper);

export default AppContainer;
