const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3VoYWlsd2FraWwiLCJhIjoiY2pkNG85aGd6NGpyejJ5bzV5ZHBtM2tvMCJ9.jHWo8YAjscitA5eIz9oCNA'
import MapboxGL from '@mapbox/react-native-mapbox-gl'; // 6.0.3-rc1
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  StatusBar,
  Animated,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import io from 'socket.io-client'; // 2.0.4
import 'moment-timezone'; // 0.5.14
import Header from './Header';
import Ripple from 'react-native-material-ripple';

import { Button } from 'react-native-elements';


import MappingKit from './MappingKit';

import {
  blueTheme,
  blueThemeBus
} from './themes';

import "moment"; // 2.20.1

//BUS
const BUSLATITUDE = 5.649177;
const BUSLONGITUDE = -0.252200;
const PASSENGERPROFILEID = 888;
const BUSPROFILEID = '666';
const TRANSPORTATIONID = '666';
const TRIPID = '102';
const BUSLABEL = 'New Bus';
//BUS
const socket_URL = 'https://smarttransit-dev-map-api.herokuapp.com/v1/socket'


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
    this.socket = io(socket_URL);

    this.socket.on('connect', () => {
      //alert('connected!');
    });

    this.onDismiss = this.onDismiss.bind(this);
    this.renderMyBus = this.renderMyBus.bind(this);
    this.renderMyPassengers = this.renderMyPassengers.bind(this);
    this.onStartStopPress = this.onStartStopPress.bind(this);
    
    this.state = {
      isGranted: IS_IOS,
      activeTheme: ThemeList[0].theme,
      busTheme: ThemeList[1].theme,
      //initialLocation: [LONGITUDE,LATITUDE],
      isStarted: false,
      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,
      
      mycoordinates: [BUSLONGITUDE, BUSLATITUDE],
      busses: [],
      passengers: [],
      buttonText: 'Start Bus',
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

  onStartStopPress () {
    if(this.state.isStarted){
      this.setState({isStarted: false, buttonText: 'Start Bus'})
      
    } else{
      this.setState({isStarted: true, buttonText: 'Stop Bus'})
    }
  }

  onPress (feature) {
    if(feature.geometry){
      mycoordinates = feature.geometry.coordinates
    }else{
      mycoordinates = this.state.mycoordinates//CurrentLocation
    }
    this.setState({
          mycoordinates:mycoordinates,
          sendObj: {
              profileid: BUSPROFILEID,
              lat: mycoordinates[0], 
              long: mycoordinates[1],
              tripid: TRIPID,
              label: BUSLABEL
            }
          }, 
          function(){
            this.socket.emit('/geo-location/transportation-profile/update', this.state.sendObj, (result) => {
                console.log('transportation eimtting', result)})
          })
  } 

  componentWillUnmount() {
    this.socket.disconnect();
  }

  componentDidMount() {

    const socket = this.socket;
    if (!socket) return;

    /*var channel1 = `${"/geo-location/passenger-profile/" + PASSENGERPROFILEID + "/subscribe"}`       
    this.socket.on(channel1, (result) => {
        console.log(JSON.stringify(result))
        var passengers = [];
        var passeger = result;
        passengers.push(passeger);
        this.setState({passengers: passengers})
    });
    */
    var channel2 = `${"/geo-location/transportation-profile/" + TRANSPORTATIONID + "/passengers/subscribe"}`  
    this.socket.on(channel2, (result) => {
      
      var passengers = [];

      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          var passeger = result[key]
          passengers.push(passeger);
        }
      }
        this.setState({passengers: passengers})
        console.log("state", this.state.passengers)
    })

/*      
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
       */ 
        
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

  drawerNav= () => {
    this.props.navigation.navigate("DrawerOpen")
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
          <MapboxGL.Callout title={BUSPROFILEID} />
        </MapboxGL.PointAnnotation>
      );
    return item;
  }


  renderMyPassengers () {
    var pointAnnotations = [];
    passengers = this.state.passengers;

    for (i = 0; i < passengers.length; i++) {
        const point = (
          <MapboxGL.PointAnnotation
            key={passengers[i].profileid}
            id={passengers[i].profileid}
            title='passengers'
            coordinate={[parseFloat(passengers[i].long), parseFloat(passengers[i].lat)] }
            >
            <View style={styles.annotationContainer}>
              <View style={styles.annotationFillPass} />
            </View>
            <MapboxGL.Callout title={'Passenger Profile id: ' +passengers[i].profileid} />
          </MapboxGL.PointAnnotation>
      );
      pointAnnotations.push(point)
    }
    return pointAnnotations;
  }

  render() {
    return (
      <View style={styles.container}>
     
          <View style={{flex: 1}} >
            <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={15}
              onPress={this.onPress}
              logoEnabled={false}
              animated={true}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.mycoordinates}
              style={{flex:1}}
              >
              {this.renderMyBus()}

              {this.renderMyPassengers()}

            </MapboxGL.MapView>

              <TouchableHighlight
                  style={styles.scan}
                  onPress={ _ => this.onStartStopPress(this)}
                  underlayColor='#3B5999'>
                    <Text style={styles.scanText}>{this.state.buttonText}</Text>
               </TouchableHighlight>


            <View style={styles.mapHeader}>
              <Header onPress={this.drawerNav}/>
            </View>
          </View>
      </View>
    );
  }
}