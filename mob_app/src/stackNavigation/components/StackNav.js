import { StackNavigator } from 'react-navigation'
import AppNavigator from '../containers/MainNavigator'
import DrawerNav from '../../drawerNavigation/components/DrawerNav'

const StackNav = StackNavigator({
    Login: {
        screen: AppNavigator,
    },
    Home: {
        screen: DrawerNav
    }
},{
    initialRouteName: 'Login',
})
  
export default StackNav