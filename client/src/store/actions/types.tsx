import { LoginAction, TestAction } from "./auth/authActions";

export enum EAction {
  test = "TEST",
  login = "SET_AUTH",
}

export type Action = LoginAction | TestAction;

export type User = {
  username: string;
  fullname: string;
  email: string;
};

export type LoginForm = {
  username: string;
  password: string;
};
