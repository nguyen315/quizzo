import { Action, User } from "../actions/actions";

interface State {
  user?: User | null;
  isAuthenticated?: boolean;
  showModal?: boolean;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  showModal: false,
};

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_AUTH": {
      console.log("hello");
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }

    case "TEST": {
      return {
        ...state,
        showModal: action.payload.showModal,
      };
    }

    default: {
      return state;
    }
  }
};
