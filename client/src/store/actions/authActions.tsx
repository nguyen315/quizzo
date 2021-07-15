import axios from "axios"
import {useDispatch} from 'react-redux'
import {AppDispatch} from "../store"



export interface IAction {
    type: string,
    payload: {}
}

export interface LoginAction extends IAction {
    type: string,
    payload: {
        user: User,
        isAuthenticated: boolean
    }
}

export interface TestAction extends IAction {
    type: string,
    payload: {
        user: User,
        isAuthenticated: boolean
    }
}


type User = {
    username: string,
    fullname: string,
    email: string
}
type LoginForm = {
    username: string,
    password: string
}

export const loginUser = async (loginForm: LoginForm) => {
    try {
        const response = await axios.post('/api/users/login', loginForm)
        await loadUser()
        return response.data
    } catch (error) {
        
    }
}

const loadUser = () => async (dispatch: AppDispatch)  => {
    try {
        const response = await axios.get('/api/users/login')
        if(response.data.success){
            dispatch({
                type: "SET_AUTH",
                payload: { isAuthenticated: true, user: response.data.user }
            })
        }
    } catch (error) {
        
    }
}

// export const test = () => {
export const test = () => (dispatch = useDispatch()) => {
    console.log("hello")
    dispatch({
        type: "TEST",
        payload: { isAuthenticated: true, user: {username: "a", fullname: "b", email: "c"} }
    })
}



