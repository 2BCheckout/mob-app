import axios from 'axios'
import { API_URL } from '../Constants'
// import Toaster from '../helpers/FetchToast'

export const STUDENT_ACTIVE = 'STUDENT_ACTIVE'
export const STUDENT_INACTIVE = 'STUDENT_INACTIVE'
export const STUDENT_VALIDATION_FAILURE = 'STUDENT_VALIDATION_FAILURE'
// const failureMessage = 'Unable to reach Server';
// const internetConnMessage = 'Check your internet Connection';

export const getStudentStatus = (data) => {
    return {
        type: data.active ? STUDENT_ACTIVE : STUDENT_INACTIVE,
        student_name: data.names
    }
}

export const StudentValidationFailure = (data) => {
    return {
        type: STUDENT_VALIDATION_FAILURE,
        error: data.error.message
    }
}

export const DoValidate = (accountNumber, apiUrl) => {
    return axios
        .get(`${apiUrl}/Students/findOne?filter={"where":{"account_number":${accountNumber}}}`);
}