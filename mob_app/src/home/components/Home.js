import React, { Component } from 'react'
import styled from 'styled-components';
import { View, Picker, AsyncStorage } from 'react-native'
import axios from 'axios'
import Toaster from '../../helpers/FetchToast'
import KeepAwake from 'react-native-keep-awake'
// import endRide from '../Services'

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

const stopRideMsg = 'Stop Ride'
const startRideMsg = 'Start Ride'

export default class Home extends Component {
    _minutes = 1;

    _initialState = {
        latitude: null,
        longitude: null,
        error: null,
        selectedRoute: '1',
        routes: [],
        rideID: '',
        intervalID: '',
        btnMsg: startRideMsg
    };

    constructor(props) {
        super(props);
        this.state = this._initialState;
      }
        
    componentWillMount() {
        this.activateGeolocation()
        this.populateRoutes()

        AsyncStorage.multiGet(['rideStatus','rideId'])
            .then(response => {
                const [[sKey, rideStatus], [iKey, rideId]] = response
                console.log(rideStatus)
                console.log(response)
                if (rideStatus)
                    this.setState({...this.state, btnMsg: stopRideMsg})
                if(rideId){
                    this.setState({...this.state, rideID: rideId})
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    populateRoutes = () => {
        const apiUrl = this.props.screenProps.apiUrl
        axios.get(`${apiUrl}/Routes`).then(response => {
            const _routes = response.data.map(item => { return { name: item.name, id: item.id } });
            this.setState({routes: _routes, selectedRoute: _routes[0].id});
        })
        .catch((error) => {
            console.log(error.response);
            Toaster('Error!', `Error al solicitar rutas: ${error.response}`, () => {
                this.populateRoutes()
            })
        });
    }

    writeToDB = () => {
        const apiUrl = this.props.screenProps.apiUrl

        this.state.rideID === '' ? this.createRide(apiUrl) : this.updateRide(apiUrl)
    }

    createRide(apiUrl) {

        const data = {
            "routeId": this.state.selectedRoute,
            "plate": "string",
            "date": new Date(),
            "latitude": this.state.latitude,
            "longitude": this.state.longitude,
            "isActive": true
        }

        axios
        .post(`${apiUrl}/Rides`, data)
        .then(response => {
            console.log('create ride',response)
            if(response.status === 200 && response.data.id){
                this.setState({...this.state, rideID: response.data.id, btnMsg: stopRideMsg}, () => {
                    AsyncStorage.multiSet([['rideStatus', 'Active'], ['rideId', response.data.id.toString()]]);
                })

            }
        })
        .catch((error) => {
            console.log(error.response)
            Toaster('El viaje no ha comenzado!', `Problemas al crear viaje: ${error.message}`, () => {
                this.createRide(apiUrl)
            })
        });
    }

    updateRide(apiUrl) {

        const data = {
            "latitude": this.state.latitude,
            "longitude": this.state.longitude
        }

        axios
        .patch(`${apiUrl}/Rides/${this.state.rideID}`, data)
        .then(response => {
            console.log('update ride',response)
        })
        .catch((error) => {
            console.log(error.response)
            Toaster('Error!', `Problemas para actualizar viaje: ${error.message}`, () => {
                this.updateRide(apiUrl)
            })
        });
    }

    activateGeolocation = () => {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            }, console.log({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            }));
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

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    minutesInMillis = (minutes) => {
        const minuteInMillis = 60 * 1000;
        return minutes * minuteInMillis;
    }

    emitLocation = () => {
        KeepAwake.activate();
        this.writeToDB();
        setInterval(this.writeToDB, this.minutesInMillis(this._minutes));
    }

    generateRoutes = () =>  this.state.routes.map(item => <Picker.Item label={item.name} value={item.id} key={item.id} />)

    getRoute = (id) => this.state.routes.map(item => {
        if (item.id === id)
            this.setState({ selectedRoute: item.id});
    })

    startAction = () => {
        const apiUrl = this.props.screenProps.apiUrl
        const { intervalID, btnMsg } = this.state

        btnMsg === startRideMsg
        ? this.emitLocation()
        : this.endRide(apiUrl, intervalID)

    }

    endRide = (apiUrl, intervalID) => {
        const data = {
            isActive: false
        }
    
        axios
        .patch(`${apiUrl}/Rides/${this.state.rideID}`, data)
        .then(response => {
            if(response.status === 200) {
                clearInterval(intervalID)
                this.setState({...this.state, btnMsg: startRideMsg})
                console.log('end ride',response)
                AsyncStorage.removeItem('rideStatus');
            }
        })
        .catch((error) => {
            this.setState({ error: error.message })
            console.log(error)
            Toaster('Error', 'Fallo de conexion al servidor', () => {
                this.endRide(apiUrl, intervalID)
            })
        });
    }

    render() {
        return (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Select Route</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Picker
                    style={{width: 200}} 
                    selectedValue={this.state.selectedRoute}
                    onValueChange={this.getRoute}>
                    { this.generateRoutes() }
                </Picker>
                <StyledButton title = {this.state.btnMsg} onPress = { () => { this.startAction() }}/>
            </View>
        );
    }
}
