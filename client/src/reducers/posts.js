// in reducers, state must ALWAYS be equal to something
export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return state;
        case "CREATE":
            return state;
        default:
            return state;
    }
}