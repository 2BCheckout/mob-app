import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LoadingIndicator = styled.ActivityIndicator`
    margin: 30% 20%;
`;

export default class Splash extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        setTimeout(this.checkLoggedInt.bind(this), 1500);
    }

    checkLoggedInt() {
        const routeName = this.props.isAuthenticated ? "Home" : "Login";

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        })

        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <LoadingIndicator/>
        )
    }
}