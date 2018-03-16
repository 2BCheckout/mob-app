import { connect } from 'react-redux'
import axios from 'axios';
import LoginForm from '../components/LoginForm'
import { DoLogin, DoLogout, AuthSuccess, AuthFailure, AuthLogout } from '../Action'
import { NavigationActions } from 'react-navigation'

const mapStateToProps = (state, ownProps) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogin: (username, password, apiUrl) => {
            DoLogin(username, password, apiUrl)
	            .then(response => {
		            axios.defaults.headers.common['Authorization'] = response.data.id;
		            dispatch(AuthSuccess(response.data, apiUrl));
		            dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
		        })
		        .catch((error) => {
		        	console.log(error0)
		            dispatch(AuthFailure(error.response.data));
		        });
        },
        doLogout: (apiUrl, token) => {
        	DoLogout(apiUrl, token)
        	.then(response => {
	            axios.defaults.headers.common['Authorization'] = null
	            dispatch(AuthLogout(apiUrl))
	        })
	        .catch(error => {
	            //TODO TOASTER NOTIFICATION
	        })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
