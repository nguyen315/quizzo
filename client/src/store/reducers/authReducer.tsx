import {LoginAction, TestAction} from "../actions/authActions"

type State = {

}

const initialState: State = {
    user: null,
    isAuthenticated: false
}


type Action = TestAction | LoginAction

export const authReducer = (state = initialState, action: Action) => {
    // const {
    //     type, payload: {isAuthenticated, user}
    // } = action
    switch(action.type) { 
        case "SET_AUTH": { 
           //statements; 
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated
            };
        } 

        case "TEST": {
            console.log("I'm here")
            return state
        }
        
        default: { 
           //statements; 
           return state
        } 
     } 
}