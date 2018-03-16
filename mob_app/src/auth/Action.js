import axios from 'axios';
import { API_URL } from '../Constants';
import Toaster from '../helpers/FetchToast'

export const AUTH_SUCCESS = 'AUTH_SUCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const AuthSuccess = (data) => {
    return {
        type: AUTH_SUCCESS,
        username: data.user.name,
        token: data.id
    }
}

export const AuthFailure = (data) => {
    return {
        type: AUTH_FAILURE,
        error: data.error.message
    }
}

export const AuthLogout = () => ({
    type: AUTH_LOGOUT
})

export const DoLogin = (username, password, apiUrl, navigate) => {
    axios.defaults.baseURL = apiUrl + "/api";
    return (dispatch) => {
        axios
        .post(`${apiUrl}/api/userAccounts/login?include=user`, { username, password })
        .then(response => {
            axios.defaults.headers.common['Authorization'] = response.data.id;
            dispatch(AuthSuccess(response.data));
        })
        .catch((error) => {
            dispatch(AuthFailure(error.response.data));
        });
    }
}

export const DoLogout = () => {
    return (dispatch) => {
        axios
        .post('/userAccounts/logout')
        .then(response => {
            axios.defaults.headers.common['Authorization'] = null
            dispatch(AuthLogout())
        })
        .catch(error => {
            //TODO TOASTER NOTIFICATION
        })
    }
}