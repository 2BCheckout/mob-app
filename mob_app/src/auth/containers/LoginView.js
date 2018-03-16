import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { DoLogin, DoLogout } from '../Action'
import { NavigationActions } from 'react-navigation'

const mapStateToProps = (state, ownProps) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogin: (username, password, apiURL) => {
            dispatch(DoLogin(username, password, apiURL))
            dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
        },
        doLogout: () => {
        	dispatch(DoLogout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
