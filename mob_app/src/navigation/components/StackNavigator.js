import { StackNavigator } from 'react-navigation'
import LoginView from '../../auth/containers/LoginView'
import HomeView from '../../home/components/Home'

const stackNavigator = StackNavigator({
    Login: { screen: LoginView },
    Home: { screen: HomeView },
}, {
    headerMode: 'none'
})

export default stackNavigator