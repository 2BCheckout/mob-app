import React, { Component } from 'react'
import styled from 'styled-components';

const View = styled.View`
    margin: 20% 10%;
`;
const Text = styled.Text``

export default class Home extends Component {

    render() {
        return (
            <View>
                <Text> { 'HOME' } </Text>
            </View>
        )
    }
}
