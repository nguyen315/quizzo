import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
