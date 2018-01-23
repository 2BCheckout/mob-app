import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from './src/auth/Auth';
import { AuthSuccess } from './src/auth/AuthAction'

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';

class Test extends Component {
    render () {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
            Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
            To get started, edit App.js
            </Text>
            <Button
            onPress={()=> this.props.authSuccess('lindo<3')}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button" />
            <Auth/>
        </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authSuccess: (username) => {
        dispatch(AuthSuccess(username));
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default connect(null, mapDispatchToProps)(Test);