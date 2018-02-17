import React from 'react'
import { Button, View, Text } from 'react-native'

class AppNavigator extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Login Screen</Text>
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      );
    }
  }

export default AppNavigator