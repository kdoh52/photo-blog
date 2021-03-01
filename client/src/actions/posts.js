// 'import * as' allows to do 'api.fetchPosts'
import * as api from "../api";

// 'async (dispatch) =>' is possible because of redux-thunk

// ACTION CREATORS
export const getPosts = () => async (dispatch) => {
    try {
        // destructure res.data from request
        // 'await' means JS will not continue until response is returned
        const { data } = await api.fetchPosts();

        // dispatch action to the reducers
        // payload is equal to all posts in the database
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: "CREATE", payload: data });
    } catch (error) {
        console.log(error.message);
    }
}