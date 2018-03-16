import axios from 'axios';
import { API_URL } from '../Constants';
import Toaster from '../helpers/FetchToast'

export const AUTH_SUCCESS = 'AUTH_SUCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const AuthSuccess = (data, apiUrl) => {
    return {
        type: AUTH_SUCCESS,
        username: data.user.name,
        token: data.id,
        apiUrl
    }
}

export const AuthFailure = (data, apiUrl) => {
    return {
        type: AUTH_FAILURE,
        error: data.error.message,
        apiUrl
    }
}

export const AuthLogout = (apiUrl) => ({
    type: AUTH_LOGOUT,
    apiUrl
})

export const DoLogin = (username, password, apiUrl, navigate) => {
    return axios
        .post(`${apiUrl}/userAccounts/login?include=user`, { username, password })
}

export const DoLogout = (apiUrl, token) => {
    axios.defaults.headers.common['Authorization'] = token

    return axios.post(`${apiUrl}/userAccounts/logout`)
}