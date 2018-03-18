import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import StackNavigator from './StackNavigator'

const AppNavigator = ({dispatch, nav, apiUrl, token}) => (<StackNavigator navigation={addNavigationHelpers({dispatch, state: nav})} screenProps={{apiUrl, token}}/>)

export default AppNavigator