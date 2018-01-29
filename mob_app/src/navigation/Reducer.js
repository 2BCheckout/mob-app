import StackNavigator from './components/StackNavigator'
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../auth/Action'

const HomeAction = StackNavigator.router.getActionForPathAndParams('Home');
const HomeNavState = StackNavigator.router.getStateForAction(HomeAction);

const LoginAction = StackNavigator.router.getActionForPathAndParams('Login');
const LoginNavState = StackNavigator.router.getStateForAction(LoginAction);

const nav = (state = LoginNavState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return HomeNavState
        case AUTH_LOGOUT:
            return LoginNavState
        default:
            return StackNavigator.router.getStateForAction(action, state)
    }
}

export default nav;