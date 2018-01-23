import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Auth extends Component {
    render() {
        return (
            <View>
                <Text>
                    {this.props.username}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps, null)(Auth);