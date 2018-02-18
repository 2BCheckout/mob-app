import { connect } from 'react-redux'
import StudentForm from '../components/StudentForm'
import { DoValidate } from '../Action'

const mapStateToProps = (state, ownProps) => ({
    error: state.student.error,
    isStudent: state.student.isStudent,
    studentName: state.student.studentName,
    isActive: state.isActive
})

const mapDispatchToProps = (dispatch) => {
    return {
        doValidation: (accountNumber) => {
            dispatch(DoValidate(accountNumber))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)