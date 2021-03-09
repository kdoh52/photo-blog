// import constants
import { AUTH, LOGOUT } from "../constants/actionTypes";

// in reducers, state must ALWAYS be equal to something
// 'state' refers to the posts
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // add profile info & JWT to localStorage
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            // change authData to equal same thing
            return { ...state, authData: action?.data }
        // case LOGOUT:
        //     return [ ...state, action.payload ];
        default:
            return state;
    }
}

export default authReducer;