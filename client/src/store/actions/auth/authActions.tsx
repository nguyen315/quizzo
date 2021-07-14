import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EAction, User, LoginForm } from "../types";
import store from "../../store";
import { setAuthToken } from "../../../utils/setAuthToken";

export interface IAction {
  type: EAction;
  payload: {};
}

export interface LoginAction extends IAction {
  type: EAction.login;
  payload: {
    user: User;
    isAuthenticated: boolean;
  };
}

export interface TestAction extends IAction {
  type: EAction.test;
  payload: {
    showModal: boolean;
  };
}

export const loginUser = async (loginForm: LoginForm) => {
  try {
    const response = await axios.post(
      "https://floating-castle-01348.herokuapp.com/api/users/login",
      loginForm
    );
    if (response.data.success) {
      localStorage.setItem("token", response.data.accessToken);
      if (localStorage["token"]) {
        setAuthToken(localStorage["token"]);
      }
      const user = await axios.get(
        "https://floating-castle-01348.herokuapp.com/api/users/login"
      );
      console.log(user);
    }

    return response.data;
  } catch (error) {}
};

export const loadUser =
  () =>
  async (dispatch = useDispatch()) => {
    try {
      if (localStorage["token"]) {
        setAuthToken(localStorage["token"]);
      }
      const response = await axios.get(
        "https://floating-castle-01348.herokuapp.com/api/users/login"
      );
      console.log(response.data);
      if (response.data.success) {
        dispatch({
          type: EAction.login,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {}
  };

export const showModal =
  () =>
  (dispatch = useDispatch()) => {
    dispatch({
      type: EAction.test,
      payload: {
        showModal: !store.getState().auth.showModal,
      },
    });
  };
