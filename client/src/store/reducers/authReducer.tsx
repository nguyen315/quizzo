type State = {

}

type Action = {
    type: string,
    payload: {
        isAuthenticated: boolean,
        user: {
            username: string,
            password: string,
            email: string
        }
    }
}

export const authReducer = (state: State, action: Action) => {
    const {
        type, payload: {isAuthenticated, user}
    } = action
    switch(type) { 
        case "SET_AUTH": { 
           //statements; 
            return {
                ...state,
                // authLoading: false,
                isAuthenticated,
                user,
            };
        } 
        
        default: { 
           //statements; 
           return state
        } 
     } 
}