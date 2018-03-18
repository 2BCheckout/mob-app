import { connect } from 'react-redux'
import StudentForm from '../components/StudentForm'
import { DoValidate, StudentValidationFailure, getStudentStatus } from '../Action'
import Toaster from '../../helpers/FetchToast'

const failureMessage = 'Unable to reach Server';
const internetConnMessage = 'Check your internet Connection';

function validate(dispatch, accountNumber, apiUrl) {
	DoValidate(accountNumber, apiUrl)
	.then(response => {
        dispatch(getStudentStatus(response.data))
    })
    .catch((error) => {
        let modalMessage = error.response !== undefined ? error.response.data.error.message : internetConnMessage;
        Toaster(failureMessage, modalMessage, () => {
            validate(dispatch, accountNumber, apiUrl)
        }, () => {
            dispatch(StudentValidationFailure(error.response.data))
        })
    })
}

const mapStateToProps = (state, ownProps) => ({
    error: state.student.error,
    isStudent: state.student.isStudent,
    studentName: state.student.studentName,
    isActive: state.isActive
})

const mapDispatchToProps = (dispatch) => {
    return {
        doValidation: (accountNumber, apiUrl) => {
        	validate(dispatch, accountNumber, apiUrl)
            // dispatch(DoValidate(accountNumber, apiUrl))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
