// 'import * as' allows to do 'api.fetchPosts'
import * as api from "../api";

// import constants
import { AUTH } from "../constants/actionTypes";

// 'async (dispatch) =>' is possible because of redux-thunk

// ACTION CREATORS
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data })
        
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data })

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}
