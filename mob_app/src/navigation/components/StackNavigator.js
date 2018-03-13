import { StackNavigator } from 'react-navigation'
import LoginView from '../../auth/containers/LoginView'
import HomeView from '../../drawerNavigation/components/DrawerNav'

const stackNavigator = StackNavigator({
    Login: { screen: LoginView },
    Drawer: { screen: HomeView },
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
})

export default stackNavigator