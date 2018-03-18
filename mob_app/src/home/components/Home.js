import React, { Component } from 'react'
import styled from 'styled-components';
import { View, Picker } from 'react-native'
import axios from 'axios'
import Toaster from '../../helpers/FetchToast'

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
    _minutes = 1;
    constructor(props) {
        super(props);
        this.state = {
          latitude: null,
          longitude: null,
          error: null,
          selectedRoute: '1',
          routes: [],
          rideID: ''
        };
    }

    activateGeolocation = () => {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
            },
            (error) => {
                this.setState({ error: error.message })
                Toaster('Error', 'Geolocalizacion esta apagada!', () => {
                    navigator.geolocation.clearWatch(this.watchId)
                    this.activateGeolocation()
                })
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );
    }
    
    componentWillMount() {
        this.activateGeolocation()
        this.populateRoutes()
    }

    populateRoutes = () => {
        const apiUrl = this.props.screenProps.apiUrl
        axios.get(`${apiUrl}/Routes`).then(response => {
            const _routes = response.data.map(item => { return { name: item.name, id: item.id } });
            this.setState({routes: _routes, selectedRoute: _routes[0].id});
        })
        .catch((error) => {
            console.log(error);
            Toaster('Error!', `Error al solicitar rutas: ${error.message}`, () => {
                this.populateRoutes()
            })
        });
    }

    writeToDB = () => {
        const apiUrl = this.props.screenProps.apiUrl

        this.state.rideID === '' ? this.createRide(apiUrl) : this.updateRide(apiUrl)
    }

    createRide = (apiUrl) => {
        console.log('create ride')

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
            if(response.status === 200 && response.data.id)
                this.setState({...this.state, rideID: response.data.id})
        })
        .catch((error) => {
            console.log(error)
            Toaster('El viaje no ha comenzado!', `Problemas al crear viaje: ${error.message}`, () => {
                this.createRide(apiUrl)
            })
        });
    }

    updateRide = (apiUrl) => {
        console.log('update ride')

        const data = {
            "latitude": this.state.latitude,
            "longitude": this.state.longitude
        }

        axios
        .patch(`${apiUrl}/Rides/${this.state.rideID}`, data)
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
            Toaster('Error!', `Problemas para actualizar viaje: ${error.message}`, () => {
                this.updateRide(apiUrl)
            })
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
