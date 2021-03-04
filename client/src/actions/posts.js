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
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: "CREATE", payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // returning the updated post 
        const { data } = await api.updatePost(id, post);

        dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: "DELETE", payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: "LIKE", payload: data });
    } catch (error) {
        console.log(error);
    }
}