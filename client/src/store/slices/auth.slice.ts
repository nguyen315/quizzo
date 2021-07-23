import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../utils/setAuthToken';
import { User } from '../types';
import {
  EAction,
  LoginForm,
  registerForm,
  changePasswordForm,
  apiUrl
} from '../types';

interface State {
  user?: User | null;
  isAuthenticated?: boolean;
  authLoading?: boolean;
  showModal?: boolean;
  showRegisterModal?: boolean;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  authLoading: false,
  showModal: false,
  showRegisterModal: false
};

export const loadUser =
  () =>
  async (dispatch = useDispatch()) => {
    try {
      if (localStorage['Authorization']) {
        setAuthToken(localStorage['Authorization']);
      }
      const response = await axios.get(`${apiUrl}/login`);
      if (response.data !== undefined) {
        dispatch(logIn({ isAuthenticated: true, user: response.data }));
      }
    } catch (error) {}
  };

export const registerUser = createAsyncThunk(
  'api/users/register',
  async (registerForm: registerForm, { dispatch, getState }) => {
    try {
      const response = await axios.post(`${apiUrl}/sign-up`, registerForm);
      if (response.data) {
        localStorage.setItem('Authorization', response.data.accessToken);
        if (localStorage['Authorization']) {
          setAuthToken(localStorage['Authorization']);
        }
        dispatch(loadUser());
        dispatch(showRegisterModal());
      }
      return response.data;
    } catch (error) {
      dispatch(showRegisterModal());
    }
  }
);

export const loginUser = createAsyncThunk(
  'api/users/login',
  async (loginForm: LoginForm, { dispatch, getState }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, loginForm);
      if (response.data.success) {
        localStorage.setItem('Authorization', response.data.accessToken);
        dispatch(loadUser());
      }
      dispatch(showModal());
      return response.data;
    } catch (error) {}
  }
);

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showModal(state) {
      state.showModal = !state.showModal;
    },
    showRegisterModal(state) {
      state.showRegisterModal = !state.showRegisterModal;
    },
    logIn(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export default authSlices.reducer;
export const { showModal, showRegisterModal, logIn, logOut } =
  authSlices.actions;
