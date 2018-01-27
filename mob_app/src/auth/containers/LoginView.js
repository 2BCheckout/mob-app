import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { DoLogin } from '../Action'

const mapStateToProps = (state, ownProps) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (username, password) => {
            dispatch(DoLogin(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
