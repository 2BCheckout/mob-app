import { STUDENT_ACTIVE, STUDENT_INACTIVE, STUDENT_VALIDATION_FAILURE } from "./Action";

const initState = {
    isStudent: false,
    accountNumber: '',
    studentName: '',
    isActive: false,
    error: '0'
};

const reducer = (state=initState, action) => {
    switch(action.type) {
        case STUDENT_ACTIVE:
            return {
                ...state,
                isStudent: true,
                studentName: action.student_name,
                isActive: true,
                error: '0'
            }
        case STUDENT_INACTIVE:
            return {
                ...state,
                isStudent: true,
                studentName: action.student_name,
                isActive: false,
                error: '0'
            }
        case STUDENT_VALIDATION_FAILURE:
            return {
                ...state,
                isStudent: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;