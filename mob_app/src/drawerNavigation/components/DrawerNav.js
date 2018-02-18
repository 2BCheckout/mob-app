import { DrawerNavigator } from 'react-navigation'
import HomeNav from '../../studentVerifier/containers/StudentView'
import StudentStats from '../../studentStats/components/StudentStats'

const DrawerNav = DrawerNavigator({
    Home: {
      screen: HomeNav,
    },
    Student: {
        screen: StudentStats
    }
},{
    initialRouteName: 'Home',
})

export default DrawerNav