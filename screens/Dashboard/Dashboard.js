const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3VoYWlsd2FraWwiLCJhIjoiY2pkNG85aGd6NGpyejJ5bzV5ZHBtM2tvMCJ9.jHWo8YAjscitA5eIz9oCNA'
import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    StatusBar,
    Animated,
    ScrollView
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl'; // 6.0.3-rc1
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
import { NavigationActions } from 'react-navigation'; // 1.0.3
import io from 'socket.io-client'; // 2.0.4
import 'moment-timezone'; // 0.5.14
import "moment"; // 2.20.1
import MappingKit from '../MappingKit';
import LinearGradient from 'react-native-linear-gradient'; // 2.4.0
import Icon from 'react-native-vector-icons/MaterialIcons'; // 4.5.0
import busStops from '../../assets/places.json';
import Header from '../Header';
import SegmentedDasboard from './SegmentedDasboard';
import {
    blueTheme,
    blueThemeBus
} from '../themes';
const IS_IOS = Platform.OS === 'ios';
var styles = require('./DashboardStyles');
// const LATITUDE = 5.639344;
// const LONGITUDE = -0.243016;
const LATITUDE = 22.966425;
const LONGITUDE = 72.615933;
const PROFILEID = '786';
const socketURL = 'https://smarttransit-dev-map-api.herokuapp.com/v1/socket'
const ThemeList = [
    {
        name: 'Blue Theme',
        theme: blueTheme,
        image: require('../../assets/blue_button_image.png'),
    },
    {
        name: 'Blue Theme',
        theme: blueThemeBus,
        image: require('../../assets/house_icon.png'),
    }
];
export default class Dashboard extends Component {
    constructor() {
        super();
        this.socket = io(socketURL);
        this.socket.on('connect', () => {
            //alert('connected!');
        });
        this.state = {
            isGranted: IS_IOS,
            busStopTheme: ThemeList[0].theme,
            busTheme: ThemeList[1].theme,
            initialLocation: [LONGITUDE,LATITUDE],
            activeAnnotationIndex: -1,
            previousActiveAnnotationIndex: -1,
            coordinates: [
                [LONGITUDE, LATITUDE],
            ],
            mycoordinates: [LONGITUDE, LATITUDE],
            busses: [],
            busListCollection: {
              type:"FeatureCollection",
              features:[]
            },
            sendObj: {
                profileid: '',
                lat: '',
                long: '',
                tripid: '',
                label: '',
            },
        };
        this._scaleIn = null;
        this._scaleOut = null;
        this.onDismiss = this.onDismiss.bind(this);
    }
    async componentWillMount () {
        if (!IS_IOS) {
            const isGranted = await MapboxGL.requestAndroidLocationPermissions();
            this.setState({ isGranted: isGranted });
        }
        MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
    }
    onDismiss() {
        StatusBar.setBarStyle('dark-content');
        this.setState({ busStopTheme: null, busTheme: null });
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Newuser'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    drawerNav= () => {
        this.props.navigation.navigate("DrawerOpen")
    }
    onAnnotationSelected (activeIndex, feature) {
        if (this.state.activeIndex === activeIndex) {
            return;
        }
        this._scaleIn = new Animated.Value(0.6);
        Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
        this.setState({ activeAnnotationIndex: activeIndex });
        if (this.state.previousActiveAnnotationIndex !== -1) {
            this._map.moveTo(feature.geometry.coordinates, 500);
        }
    }
    onAnnotationDeselected (deselectedIndex) {
        let nextState = {};
        if (this.state.activeAnnotationIndex === deselectedIndex) {
            nextState.activeAnnotationIndex = -1;
        }
        this._scaleOut = new Animated.Value(1);
        Animated.timing(this._scaleOut, { toValue: 0.6, duration: 200 }).start();
        nextState.previousActiveAnnotationIndex = deselectedIndex;
        this.setState(nextState);
    }
    componentDidMount() {
        const socket = this.socket;
        if (!socket) return;
        // socket.on('disconnect', () => alert('You have been disconnected.'));
        this.socket.on('/geo-location/transportation-profile/subscribe', (locationState) => {
            var busList = [];
            for (var key in locationState) {
                if (locationState.hasOwnProperty(key)) {
                    var innerObj = locationState[key]
                    var lat = Number(innerObj['lat']);
                    var lon = Number(innerObj['long']);
                    var label = Number(innerObj['label']);
                    var busObject = {
                        id: innerObj['profileid'],
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [
                                (isNaN(lat) ? 0 : lat),
                                (isNaN(lon) ? 0 : lon)
                            ]
                        },
                        properties: {
                            label: innerObj['label'],
                            tripid: innerObj['tripid'],
                            profileid: innerObj['profileid'],
                        }
                    }
                    busList.push(busObject);
                }
            }
            // DELETE ONLY TESTING
            var busObject1 = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [LONGITUDE + 0.01, LATITUDE]
                },
                properties: {
                    label: 'KKK',
                    tripid: 222,
                    profileid: "999",
                }
            }
            busList.push(busObject1);
            // DELETE
            var busListCol = {
                type:"FeatureCollection",
                features:busList
            }
            this.setState({busListCollection: busListCol })
        });
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }
    renderMap () {
        if (!this.state.busStopTheme) {
            return null;
        }
        StatusBar.setBarStyle('light-content');
        return (
            <View style={styles.matchParent}>
                <MappingKit.MapView
                    simulateUserLocation
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    theme={this.state.busStopTheme}
                    bustheme={this.state.busTheme}
                    centerCoordinate={this.state.initialLocation}
                    featureCollection={busStops}
                    busCollection={this.state.busListCollection}
                    zoomLevel={13}
                    style={styles.matchParent} />
                <View style={styles.mapHeader}>
                    <Header onPress={this.drawerNav}/>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1}}>
                    {this.renderMap()}
                </View>
                <View style={{ flex: 1}}>
                    <SegmentedDasboard/>
                </View>

            </View>
        );
    }
}
