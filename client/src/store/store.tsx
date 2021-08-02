import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import questionsSlice from './slices/questions.slice';
import roomsSlice from './slices/rooms.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsSlice,
    rooms: roomsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
