import StackNavigator from './components/StackNavigator'
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../auth/Action'

const DrawerNavigatorAction = StackNavigator.router.getActionForPathAndParams('DrawerNavigator')
const DrawerNavigatorNavState = StackNavigator.router.getStateForAction(DrawerNavigatorAction)

const LoginAction = StackNavigator.router.getActionForPathAndParams('Login')
const LoginNavState = StackNavigator.router.getStateForAction(LoginAction)

const nav = (state = LoginNavState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return DrawerNavigatorNavState
        case AUTH_LOGOUT:
            return LoginNavState
        default:
            return StackNavigator.router.getStateForAction(action, state)
    }
}

export default nav