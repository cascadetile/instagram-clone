import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  auth_token: '',
};

export const authStore = createSlice({
  name: 'auth_store',
  initialState,
  reducers: {
    setTokenAuth() {
      console.log('set-token');
    },
    checkAuth() {
      console.log('check');
    },
  },
});
