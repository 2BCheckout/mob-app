import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Toaster from '../../helpers/FetchToast'

const View = styled.View`
    margin: 20% 10%;
`;
const TextInput = styled.TextInput``;
const Button = styled.Button``;
const Text = styled.Text``;

export default class LoginForm extends Component {
    _urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    static propTypes = {
        error: PropTypes.string,
        isAuthenticated: PropTypes.bool,
        doLogin: PropTypes.func.isRequired,
        doLogout: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            error: '',
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

    _validateInputs = () => {
        this.setState({error: ''})
        const { username, password, apiUrl} = this.state
        if (!(username.length>0 && password.length>0)) {
            this.setState({error: 'User or Password incorrect'})
            return
        }
        if (!this._urlRegex.test(apiUrl)) {
            this.setState({error: 'API URL is an invalid link'})
            return
        }
        this.props.doLogin(username, password, apiUrl)
    }

    render() {
        let { doLogin, isAuthenticated } = this.props;

        return (
            <View>
                <TextInput placeholder = 'username' onChangeText={ this._setUsername }/>
                <TextInput secureTextEntry placeholder = 'password'onChangeText={ this._setPassword }/>
                <TextInput placeholder = 'API URL'onChangeText={ this._setAPIURL } value={this.state.apiUrl}/>
                <Button title = 'Login' onPress = { this._validateInputs }/>
                { (this.state.error.length > 0) && <Text>{this.state.error}</Text>}
            </View>
        )
    }
}
