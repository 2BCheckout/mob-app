import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const View = styled.View`
    margin: 20% 10%;
`
const Button = styled.Button``
const Text = styled.Text``

export default class AccountForm extends Component {
    static PropTypes = {
        isStudentActive: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            accountNumber: ''
        }
    }

    _setAccountNumber = (accountNumber) => {
        this.state({ accountNumber })
    }

    render () {
        let { isStudentActive } = this.props

        return (
            <View>
                <TextInput placeholder = 'Student Account Number' onChangeText={ this._setAccountNumber }/>
                <Button title = 'Login' onPress = { () => { doLogin(this.state.username, this.state.password) }}/>
            </View>
        )
    }
}