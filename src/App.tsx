import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { StoreType } from './store/types/store';
import { IApp } from './types/app';
import { App } from './components/App/App';
import { ProfileWrapperContainer } from './components/RegistrationWrapper';
import { toggleContextMenuAC } from './store/context-menu-store';

function AppWrapper(props: IApp) {
  const { isAuth } = props;

  return isAuth ? <App /> : <ProfileWrapperContainer />;
}

const MapStateToProps = (store: StoreType) => ({
  isAuth: store.auth.isAuth,
  isOpenContextMenu: store.contextMenu.isOpen,
});

const MapDispatchToProps = {
  toggleContextMenu: toggleContextMenuAC,
};

const AppContainer = connect(MapStateToProps, MapDispatchToProps)(AppWrapper);

export default AppContainer;
