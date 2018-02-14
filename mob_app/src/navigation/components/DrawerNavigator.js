import { DrawerNavigator } from 'react-navigation'
import StudentView from '../../inputAccount/components/AccountForm'
import HomeView from '../../home/components/Home'

const drawerNavigator = DrawerNavigator({
    Home: { screen: HomeView },
    Student: { screen: StudentView }
})

export default drawerNavigator