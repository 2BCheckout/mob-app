import React from 'react'
import { Button, View, Text } from 'react-native'
import LoginView from '../../auth/containers/LoginView'

class AppNavigator extends React.Component {
    render() {
      return (
        <View>
          <Text>Login Screen</Text>
          <LoginView navigation = { this.props.navigation }/>
        </View>
      );
    }
  }

export default AppNavigator