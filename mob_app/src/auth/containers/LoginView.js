import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { DoLogin } from '../Action'
import { NavigationActions } from 'react-navigation'

const mapStateToProps = (state, ownProps) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogin: (username, password, apiURL) => {
            dispatch(DoLogin(username, password, apiURL))
            //dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
