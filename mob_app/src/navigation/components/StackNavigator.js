import { StackNavigator } from 'react-navigation'
import LoginView from '../../auth/containers/LoginView'
import DrawerNavigator from './DrawerNav'

const stackNavigator = StackNavigator({
    Login: { screen: LoginView },
    DrawerNavigator: { screen: DrawerNavigator }
}, {
    headerMode: 'none'
})

export default stackNavigator