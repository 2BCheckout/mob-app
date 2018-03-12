import { DrawerNavigator } from 'react-navigation'
import HomeNav from '../../home/components/Home'
import StudentStats from '../../studentStats/components/StudentStats'
import LoginView from '../../auth/containers/LoginView'

const DrawerNav = DrawerNavigator({
    Home: {
      screen: HomeNav,
    },
    Student: {
        screen: StudentStats
    },
    Logout: {
        screen: LoginView
    }
},{
    initialRouteName: 'Home',
})

export default DrawerNav