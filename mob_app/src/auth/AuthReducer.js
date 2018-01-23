import { AUTH_SUCCESS } from "../ActionTypes";

const initState = {
    username: ''
};

const reducer = (state=initState, action) => {
    switch(action.type) {
        case AUTH_SUCCESS:
        return {
            ...state,
            username: action.username
        }
        default:
        return state;
    }
}

export default reducer;