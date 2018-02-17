import { StackNavigator } from 'react-navigation'
import LoginView from '../../auth/containers/LoginView'
import HomeNav from '../../home/components/Home'
import AppNavigator from '../containers/MainNavigator'

const StackNav = StackNavigator({
    Login: {
        screen: AppNavigator,
    },
    Home: {
        screen: HomeNav
    }
},{
    initialRouteName: 'Login',
})
  
export default StackNav