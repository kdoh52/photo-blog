// in reducers, state must ALWAYS be equal to something
// 'state' refers to the posts
export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [ ...state, action.payload ];
        case "UPDATE":
            // map through posts, if ID matches the payload's ID, return payload, else leave it alone
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case "DELETE":
            // keep all posts except for the one that matches the payload's ID
            return state.filter((post) => post._id !== action.payload);
        default:
            return state;
    }
}