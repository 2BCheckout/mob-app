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
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            apiUrl: ''
        }
    }

    componentWillMount() {
        if(this.props.token)
            this.props.doLogout()
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
                <TextInput placeholder = 'password'onChangeText={ this._setPassword }/>
                <TextInput placeholder = 'API URL'onChangeText={ this._setAPIURL }/>
                <Button title = 'Login' onPress = { () => { doLogin(this.state.username, this.state.password, this.state.apiUrl) }}/>
            </View>
        )
    }
}
