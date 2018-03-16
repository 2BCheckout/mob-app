import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT } from "./Action";

const initState = {
    username: '',
    isAuthenticated: false,
    token: null,
    error: '0'
};

const reducer = (state=initState, action) => {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                username: action.username,
                token: action.token,
                isAuthenticated: true,
                error: '0'
            }
        case AUTH_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case AUTH_LOGOUT:
            return initState;
        default:
            return state;
    }
}

export default reducer;