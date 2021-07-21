export enum EAction {
  showModal = 'SHOW_MODAL',
  login = 'SET_AUTH',
  showRegisterModal = 'SHOW_REGISTER_MODAL'
}

export type User = {
  username: string;
  email: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type registerForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type changePasswordForm = {
  _id: string;
  password: string;
  confirmPassword: string;
};

export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'https://quizzo-service.herokuapp.com/api';
