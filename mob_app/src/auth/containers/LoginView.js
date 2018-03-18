import { connect } from 'react-redux'
import axios from 'axios';
import LoginForm from '../components/LoginForm'
import { DoLogin, DoLogout, AuthSuccess, AuthFailure, AuthLogout } from '../Action'
import { NavigationActions } from 'react-navigation'
import Toaster from '../../helpers/FetchToast'

const mapStateToProps = (state, ownProps) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
})

function logout(dispatch, apiUrl, token) {
	DoLogout(apiUrl, token)
		.then(response => {
			if (response.status === 204) {
	            axios.defaults.headers.common['Authorization'] = null
	            dispatch(AuthLogout(apiUrl))
			}else{
				Toaster('Error','No se pudo establecer conexion con el servidor',
				() => {
					logout(dispatch, apiUrl, token)
				},
				() => {
					dispatch(NavigationActions.navigate({ routeName: 'Home' }))
				})
			}
	    })
	    .catch(error => {
			Toaster('Error','No se pudo establecer conexion con el servidor',
			() => {
				logout(dispatch, apiUrl, token)
			},
			() => {
				dispatch(NavigationActions.navigate({ routeName: 'Home' }))
			})
	        // dispatch(NavigationActions.navigate({ routeName: 'Home' }))
	    })
}

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
		        	console.log(error)
		            dispatch(AuthFailure(error.response.data));
		        });
        },
        doLogout: (apiUrl, token) => {
        	logout(dispatch, apiUrl, token)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
