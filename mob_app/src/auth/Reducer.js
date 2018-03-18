import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT } from "./Action";

const initState = {
    username: '',
    isAuthenticated: false,
    token: null,
    apiUrl: '',
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
                error: '0',
                apiUrl: action.apiUrl
            }
        case AUTH_FAILURE:
            return {
                ...state,
                error: action.error,
                apiUrl: action.apiUrl
            }
        case AUTH_LOGOUT:
            return {
                ...initState,
                apiUrl: action.apiUrl
            };
        default:
            return state;
    }
}

export default reducer;