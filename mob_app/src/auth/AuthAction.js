import { AUTH_SUCCESS } from "../ActionTypes";

export const AuthSuccess = (username) => {
    return {
        type: AUTH_SUCCESS,
        username: username
    }
}