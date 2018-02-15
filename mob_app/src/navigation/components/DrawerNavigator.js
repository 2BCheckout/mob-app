import { DrawerNavigator } from 'react-navigation'
import StudentView from '../../inputAccount/components/AccountForm'
import HomeView from '../../home/components/Home'
import { Platform } from 'react-native'

const drawerNavigator = DrawerNavigator({
    Home: { screen: HomeView, navigationOptions: {drawerLabel: 'Home'} },
    Student: { screen: StudentView,navigationOptions: {drawerLabel: 'Student Account Number'} }
}, {
    drawerOpenRoute: 'DrawerOpen', 
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'Home',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    contentOptions: { activeTintColor: '#e91e63' }
})

export default drawerNavigator
