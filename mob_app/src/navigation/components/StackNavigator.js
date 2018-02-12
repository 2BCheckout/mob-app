import { StackNavigator } from 'react-navigation'
import LoginView from '../../auth/containers/LoginView'
import DrawerNavigator from './DrawerNavigator'

const stackNavigator = StackNavigator({
    Login: { screen: LoginView }
}, {
    headerMode: 'none'
})

export default stackNavigator