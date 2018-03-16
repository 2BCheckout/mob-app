import React, { Component } from 'react'
import styled from 'styled-components';
import { View, Picker } from 'react-native'
import axios from 'axios'

// const View = styled.View`
//     margin: 20% 10%;
// `;
const Text = styled.Text`
    fontFamily: 'Cochin';
    fontSize: 20;
`
const StyledButton = styled.Button`
    margin: 16px;
    width: 300;
    color=#841584;
`

export default class Home extends Component {
    _minutes = 5;
    constructor(props) {
        super(props);
        this.state = {
          latitude: null,
          longitude: null,
          error: null,
          selectedRoute: '1',
          routes: []
        };
      }
    
    componentWillMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );

        this.populateRoutes();
    }

    populateRoutes = () => {
        const apiUrl = this.props.screenProps.apiUrl
        axios.get(`${apiUrl}/Routes`).then(response => {
            const _routes = response.data.map(item => { return { name: item.name, id: item.id } });
            this.setState({routes: _routes, selectedRoute: _routes[0].id});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    writeToDB = () => {
    const apiUrl = this.props.screenProps.apiUrl
        
        const data = {
            "routeId": this.state.selectedRoute,
            "plate": "string",
            "date": new Date(),
            "latitude": this.state.latitude,
            "longitude": this.state.longitude
        }

        axios
        .post(`${apiUrl}/Rides`, data)
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    minutesInMillis = (minutes) => {
        const minuteInMillis = 60 * 1000;
        return minutes * minuteInMillis;
    }

    emitLocation = () => {
        this.writeToDB();
        setInterval(this.writeToDB, this.minutesInMillis(this._minutes));
    }

    generateRoutes = () =>  this.state.routes.map(item => <Picker.Item label={item.name} value={item.id} key={item.id} />)

    getRoute = (id) => this.state.routes.map(item => {
        if (item.id === id)
            this.setState({ selectedRoute: item});
    })

    render() {
        return (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Select Route</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Picker
                    style={{width: 200}} 
                    selectedValue={this.state.selectedRoute.id}
                    onValueChange={this.getRoute}>
                    { this.generateRoutes() }
                </Picker>
                <StyledButton title = 'Start Ride' onPress = { () => { this.emitLocation() }}/>
            </View>
        );
    }
}
