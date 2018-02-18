import { connect } from 'react-redux'
import StudentStats from '../components/StudentStats'

const mapStateToProps = (state, ownProps) => ({
    studentName: state.student.studentName,
    isActive: state.student.isActive
})

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentStats)
