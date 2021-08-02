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
  apiUrl,
  updateProfileForm
} from '../types';
import { AppDispatch } from '../store';

interface State {
  user?: User | null;
  isAuthenticated?: boolean;
  authLoading?: boolean;
  showModal?: boolean;
  showRegisterModal?: boolean;
  showUpdateModal?: boolean;
  loginError?: string | null;
  registerError?: string | null;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  authLoading: false,
  showModal: false,
  showRegisterModal: false,
  showUpdateModal: false,
  loginError: null,
  registerError: null
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
  async (registerForm: registerForm, { dispatch, rejectWithValue }) => {
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
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'api/users/login',
  async (loginForm: LoginForm, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, loginForm);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem('Authorization', response.data.accessToken);
        dispatch(loadUser());
      }
      dispatch(showModal());

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'api/users/update',
  async (updateForm: updateProfileForm, { dispatch, getState }) => {
    try {
      const state: any = getState();
      const userID = state.auth.user.id;
      const response = await axios.post(
        `${apiUrl}/users/${userID}/update-user`,
        updateForm
      );
      if (response.data.success) {
        dispatch(showUpdateModal());
      }
    } catch (error) {}
  }
);

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showModal(state) {
      state.showModal = !state.showModal;
      state.loginError = null;
    },
    showRegisterModal(state) {
      state.showRegisterModal = !state.showRegisterModal;
      state.registerError = null;
    },
    showUpdateModal(state) {
      state.showUpdateModal = !state.showUpdateModal;
    },
    logIn(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: {
    [loginUser.fulfilled.toString()]: (state, actino) => {
      state.loginError = null;
    },
    [loginUser.rejected.toString()]: (state, action) => {
      console.log(action);
      state.loginError = action.payload.message;
    },
    [registerUser.fulfilled.toString()]: (state, actino) => {
      state.registerError = null;
    },
    [registerUser.rejected.toString()]: (state, action) => {
      console.log(action);
      state.registerError = action.payload.message;
    }
  }
});

export default authSlices.reducer;
export const { showModal, showRegisterModal, showUpdateModal, logIn, logOut } =
  authSlices.actions;
