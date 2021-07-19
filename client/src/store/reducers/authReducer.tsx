import { Action, User } from '../actions/actions';

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
  authLoading: true,
  showModal: false,
  showRegisterModal: false
};

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_AUTH': {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        authLoading: false
      };
    }

    case 'SHOW_MODAL': {
      return {
        ...state,
        showModal: action.payload.showModal
      };
    }

    case 'SHOW_REGISTER_MODAL': {
      return {
        ...state,
        showRegisterModal: action.payload.showRegisterModal
      };
    }

    default: {
      return state;
    }
  }
};
