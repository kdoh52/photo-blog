// in reducers, state must ALWAYS be equal to something
// 'state' refers to the posts
export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [ ...state, action.payload ];
        default:
            return state;
    }
}