import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import StackNavigator from './StackNavigator'

const AppNavigator = ({dispatch, nav}) => (<StackNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>)

export default AppNavigator