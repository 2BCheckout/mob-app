import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const View = styled.View`
    margin: 20% 10%;
`;
const TextInput = styled.TextInput``;
const Button = styled.Button``;
const Text = styled.Text``;

export default class LoginForm extends Component {
    static propTypes = {
        error: PropTypes.string,
        isAuthenticated: PropTypes.bool,
        doLogin: PropTypes.func.isRequired,
        doLogout: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            apiUrl: props.screenProps.apiUrl ? props.screenProps.apiUrl : ''
        }
    }

    componentWillMount() {
        if(this.props.token)
            this.props.doLogout(this.state.apiUrl, this.props.screenProps.token)
    }

    _setUsername = (username) => {
        this.setState({...this.state, username})
    }

    _setPassword = (password) => {
        this.setState({...this.state, password})
    }

    _setAPIURL = (apiUrl) => {
        this.setState({...this.state, apiUrl})
    }

    render() {
        let { doLogin, error, isAuthenticated } = this.props;

        return (
            <View>
                <TextInput placeholder = 'username' onChangeText={ this._setUsername }/>
                <TextInput secureTextEntry placeholder = 'password'onChangeText={ this._setPassword }/>
                <TextInput placeholder = 'API URL'onChangeText={ this._setAPIURL } value={this.state.apiUrl}/>
                <Button title = 'Login' onPress = { () => { doLogin(this.state.username, this.state.password, this.state.apiUrl) }}/>
            </View>
        )
    }
}
