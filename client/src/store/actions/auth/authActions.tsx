import axios from 'axios';
import { useDispatch } from 'react-redux';
import { EAction, User, LoginForm, registerForm } from '../types';
import store from '../../store';
import { setAuthToken } from '../../../utils/setAuthToken';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../types';

export interface IAction {
  type: EAction;
  payload: {};
}

export interface LoginAction extends IAction {
  type: EAction.login;
  payload: {
    user: User;
    isAuthenticated: boolean;
    authLoading: boolean;
  };
}

export interface ShowModalAction extends IAction {
  type: EAction.showModal;
  payload: {
    showModal: boolean;
  };
}

export interface ShowRegisterModalAction extends IAction {
  type: EAction.showRegisterModal;
  payload: {
    showRegisterModal: boolean;
  };
}

export const registerUser = createAsyncThunk(
  'api/users/register',
  async (registerForm: registerForm, { dispatch, getState }) => {
    try {
      const response = await axios.post(`${apiUrl}/sign-up`, registerForm);
      if (response.data.success) {
        localStorage.setItem('token', response.data.accessToken);
        if (localStorage['token']) {
          setAuthToken(localStorage['token']);
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
      console.log('response.data');
      if (response.data.success) {
        localStorage.setItem('Authorization', response.data.accessToken);
        dispatch(loadUser());
      } else {
      }
      dispatch(showModal());
      return response.data;
    } catch (error) {
      dispatch(showModal());
    }
  }
);

export const loadUser =
  () =>
  async (dispatch = useDispatch()) => {
    try {
      if (localStorage['Authorization']) {
        setAuthToken(localStorage['Authorization']);
      }
      const response = await axios.get(`${apiUrl}/login`);
      console.log(response);
      if (response.data !== undefined) {
        dispatch({
          type: EAction.login,
          payload: { isAuthenticated: true, user: response.data }
        });
      }
    } catch (error) {}
  };

export const logout =
  () =>
  async (dispatch = useDispatch()) => {
    localStorage.removeItem('Authorization');
    await setAuthToken(null);
    dispatch({
      type: EAction.login,
      payload: { isAuthenticated: false, user: null }
    });
  };

export const showModal =
  () =>
  (dispatch = useDispatch()) => {
    dispatch({
      type: EAction.showModal,
      payload: {
        showModal: !store.getState().auth.showModal
      }
    });
  };

export const showRegisterModal =
  () =>
  (dispatch = useDispatch()) => {
    dispatch({
      type: EAction.showRegisterModal,
      payload: {
        showRegisterModal: !store.getState().auth.showRegisterModal
      }
    });
  };
