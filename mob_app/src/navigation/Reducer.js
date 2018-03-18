import StackNavigator from './components/StackNavigator'
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../auth/Action'
import { NavigationActions } from 'react-navigation'

const initialState = StackNavigator.router.getStateForAction(NavigationActions.init());

const HomeAction = StackNavigator.router.getActionForPathAndParams('Drawer');
const HomeNavState = StackNavigator.router.getStateForAction(HomeAction);

const LoginAction = StackNavigator.router.getActionForPathAndParams('Login');
const LoginNavState = StackNavigator.router.getStateForAction(LoginAction);

const nav = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGOUT:
            return LoginNavState
        default:
            return StackNavigator.router.getStateForAction(action, state)
    }
}

export default nav;