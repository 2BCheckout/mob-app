import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const View = styled.View`
    margin: 20% 10%;
`;
const TextInput = styled.TextInput``
const Button = styled.Button`
margin: 16px;
`
const Text = styled.Text``

export default class LoginForm extends Component {
    static propTypes = {
        error: PropTypes.string,
        doValidation: PropTypes.func.isRequired,
        isStudent: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.state = {
            accountNumber: ''
        }
    }

    _setAccountNumber = (accountNumber) => {
        this.setState({...this.state, accountNumber});
    }

    render() {
        let { doValidation, error, isStudent } = this.props;

        return (
            <View>
                <TextInput placeholder = 'Account Number' onChangeText={ this._setAccountNumber }/>
                <Button title = 'Validate Student' onPress = { () => { doValidation(this.state.accountNumber) }}/>
                { (error !== '0') && <Text> { error } </Text> }
                { isStudent && this.props.navigation.navigate('Student') }
                <Button title = 'Menu' onPress = { () => this.props.navigation.navigate('DrawerToggle') }/>
            </View>
        )
    }
}
