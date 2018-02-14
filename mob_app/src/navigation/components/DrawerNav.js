import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import DrawerNavigator from './DrawerNavigator'

const DrawerNav = ({dispatch, nav}) => (<DrawerNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>)

export default DrawerNav