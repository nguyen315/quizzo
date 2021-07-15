import {
  LoginAction,
  ShowModalAction,
  ShowRegisterModalAction,
} from "./auth/authActions";

export enum EAction {
  showModal = "SHOW_MODAL",
  login = "SET_AUTH",
  showRegisterModal = "SHOW_REGISTER_MODAL",
}

export type Action = LoginAction | ShowModalAction | ShowRegisterModalAction;

export type User = {
  username: string;
  fullname: string;
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
