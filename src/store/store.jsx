import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import storeReducer from './storeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    store: storeReducer,
  },
});

export default store;
