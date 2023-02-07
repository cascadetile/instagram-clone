import { configureStore } from '@reduxjs/toolkit';
import { authStore } from './auth-store';

export const store = configureStore({
  reducer: {
    auth: authStore.reducer,
  },
});
