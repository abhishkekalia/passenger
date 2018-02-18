const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3VoYWlsd2FraWwiLCJhIjoiY2pkNG85aGd6NGpyejJ5bzV5ZHBtM2tvMCJ9.jHWo8YAjscitA5eIz9oCNA'
import MapboxGL from '@mapbox/react-native-mapbox-gl'; // 6.0.3-rc1
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  StatusBar,
  Animated
} from 'react-native';
import io from 'socket.io-client'; // 2.0.4
import 'moment-timezone'; // 0.5.14

import MappingKit from './MappingKit';

import {
  blueTheme,
  blueThemeBus
} from './themes';

import "moment"; // 2.20.1

const IS_IOS = Platform.OS === 'ios';
const ThemeList = [
  {
    name: 'Blue Theme',
    theme: blueTheme,
    image: require('../assets/blue_button_image.png'),
  },
  {
    name: 'Blue Theme',
    theme: blueThemeBus,
    image: require('../assets/house_icon.png'),
  }
];

var styles = require('./BusAppStyles');


const LATITUDE = 5.639344;
const LONGITUDE = -0.243016;

const PROFILEID = '786';
const socketURL = 'https://smarttransit-dev-map-api.herokuapp.com/v1/socket'


export const theme = new MappingKit.Theme({
  icon: {name: 'arrow-right', type: 'octicon', color: '#083045', size: 40 },
  activeIcon: {name: 'arrow-right', type: 'octicon', color: '#083045', size: 40 },
  styleURL: MapboxGL.StyleURL.Light,
  primaryColor: `#A35BCD`,
  primaryDarkColor: '#5D39BA',
  directionsLineColor: '#987DDF',
  cardIcon: {name: 'arrow-right', type: 'octicon', color: '#083045', size: 40 },
  cardTextColor: '#6A159B',
  accentColor: '#C7A8D9',
});

export default class BusApp extends Component<{}> {
  constructor() {
    super();
    this.socket = io(socketURL);
    this.socket.on('connect', () => {
      //alert('connected!');
    });

    this.onDismiss = this.onDismiss.bind(this);

    this.state = {
      isGranted: IS_IOS,
      activeTheme: ThemeList[0].theme,
      busTheme: ThemeList[1].theme,
      initialLocation: [LONGITUDE,LATITUDE],

      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,
      coordinates: [
        [LONGITUDE, LATITUDE],
      ],
      mycoordinates: [LONGITUDE, LATITUDE],
      busses: [],
      busListWrap: {},
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
    this.onPress = this.onPress.bind(this);

  }

  async componentWillMount () {
    if (!IS_IOS) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      this.setState({ isGranted: isGranted });
    }
    MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
  }

  onDismiss () {
    StatusBar.setBarStyle('dark-content');
    this.setState({ activeTheme: null, busTheme: null });
  }


  onPress (feature) {
    this.setState({
          mycoordinates:feature.geometry.coordinates,
          sendObj: {
              profileid: PROFILEID,
              lat: feature.geometry.coordinates[0], 
              long: feature.geometry.coordinates[1],
              tripid: '100',
              label: 'Hola Bus'
            }
          }, 
          function(){
            this.socket.emit('/geo-location/transportation-profile/update', this.state.sendObj)
          })
  }

  onAnnotationSelected (activeIndex, feature) {
    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex });

    if (this.state.previousActiveAnnotationIndex !== -1) {
      //this._map.moveTo(feature.geometry.coordinates, 500);
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
    //socket.on('disconnect', () => alert('You have been disconnected.'));

     this.socket.on('/geo-location/transportation-profile/subscribe', (locationState) => {
        var busses = [];
        var busList = [];
        for (var key in locationState) {
            if (locationState.hasOwnProperty(key)) {
              var innerObj = locationState[key]
              var lat = Number(innerObj['lat']);
              var lon = Number(innerObj['long']);

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
                    name: innerObj['label'],
                    phoneFormatted: innerObj['tripid'],
                    addressFormatted: "None",
                    hoursFormatted: "10 AM - 9 PM"
                  }
                }

              var busObj = {
                title: innerObj['label'],
                coordinates: {
                  latitude: (isNaN(lat) ? 0 : lat), 
                  longitude: (isNaN(lon) ? 0 : lon) 
                },
              }
              busses.push(busObj);
              busList.push(busObject);
            }
        }
        var busListWrap = {  
           type:"FeatureCollection",
            features:busList
          }

        this.setState({busses: busses, busListWrap: busListWrap })

        
        
      });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }
  
  renderMyBus () {
    const item = (
        <MapboxGL.PointAnnotation
          key='pointAnnotationBus'
          id='pointAnnotationBus'
          title='Bus'
          coordinate={this.state.mycoordinates}>
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFillMy} />
          </View>
          <MapboxGL.Callout title={PROFILEID} />
        </MapboxGL.PointAnnotation>
      );
    return item;
  }

  render() {
    return (
      <View style={styles.container}>
     
          <View style={{flex: 1}} >

            <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={15}
              onPress={this.onPress}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.mycoordinates}
              style={{flex:1}}
              >
              {this.renderMyBus()}
            </MapboxGL.MapView>
          </View>
      </View>
    );
  }
}