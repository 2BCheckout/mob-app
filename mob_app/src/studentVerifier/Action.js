import axios from 'axios'
import { API_URL } from '../Constants'

export const STUDENT_ACTIVE = 'STUDENT_ACTIVE'
export const STUDENT_INACTIVE = 'STUDENT_INACTIVE'
export const STUDENT_VALIDATION_FAILURE = 'STUDENT_VALIDATION_FAILURE'

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

export const DoValidate = (accountNumber) => {
    return (dispatch) => {
        axios
        .get(`/Students?filter={"where":{"account_number":${accountNumber}}}`)
        .then(response => {
            console.log(response, "success")
            dispatch(getStudentStatus(response.data[0]));
        })
        .catch((error) => {
            console.log(error, "error")
            dispatch(StudentValidationFailure(error.response.data));
        });
    }
}