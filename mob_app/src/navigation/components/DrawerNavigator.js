import { DrawerNavigator } from 'react-navigation'
import StudentView from '../../inputAccount/containers/StudentView'
import HomeView from '../../home/components/Home'

const drawerNavigator = DrawerNavigator({
    Home: { scree: HomeView },
    Student: { screen: StudentView }
})

export default drawerNavigator