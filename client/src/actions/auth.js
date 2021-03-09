// 'import * as' allows to do 'api.fetchPosts'
import * as api from "../api";

// import constants
import { AUTH } from "../constants/actionTypes";

// 'async (dispatch) =>' is possible because of redux-thunk

// ACTION CREATORS
export const signin = (formData, history) => async (dispatch) => {
    try {
        // // destructure res.data from request
        // // 'await' means JS will not continue until response is returned
        // const { data } = await api.fetchPosts();

        // // dispatch action to the reducers
        // // payload is equal to all posts in the database
        // dispatch({ type: FETCH_ALL, payload: data })
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // // destructure res.data from request
        // // 'await' means JS will not continue until response is returned
        // const { data } = await api.fetchPosts();

        // // dispatch action to the reducers
        // // payload is equal to all posts in the database
        // dispatch({ type: FETCH_ALL, payload: data })
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}