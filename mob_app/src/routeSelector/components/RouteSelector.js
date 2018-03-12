import React, { Component } from 'react'

const View = styled.View`
    margin: 20% 10%;
`;
const Text = styled.Text``

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: []
        }
    }

    componentDidMount() {
        axios
        .post('/Routes')
        .then(response => {

            console.log(response.data)
        })
        .catch((error) => {
            dispatch(console.log(`=============${error.response.data}=============`));
        });
    }

    render() {
        <Text>{ this.state.routes }</Text>
    }
}