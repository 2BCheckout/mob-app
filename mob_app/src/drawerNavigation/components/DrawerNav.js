import { DrawerNavigator } from 'react-navigation'
import HomeNav from '../../home/components/Home'
// import StudentVerifier from '../../studentVerifier/components/StudentForm'
import StudentView from '../../studentVerifier/containers/StudentView'
import LoginView from '../../auth/containers/LoginView'

const DrawerNav = DrawerNavigator({
    Home: {
      screen: HomeNav,
    },
    Student: {
        screen: StudentView
    },
    Logout: {
        screen: LoginView
    }
},{
    initialRouteName: 'Home',
})

export default DrawerNav