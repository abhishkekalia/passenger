
const mapboxAccessToken = 'pk.eyJ1Ijoic3VoYWlsd2FraWwiLCJhIjoiY2pkNG85aGd6NGpyejJ5bzV5ZHBtM2tvMCJ9.jHWo8YAjscitA5eIz9oCNA'
import MapboxGL from '@mapbox/react-native-mapbox-gl';
MapboxGL.setAccessToken(mapboxAccessToken);

import MapboxClient from 'mapbox';
const mapboxClient = new MapboxClient(mapboxAccessToken);

import MappingKit from './MappingKit';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  AlertIOS,
  Dimensions,
  TextInput,
  Animated
} from 'react-native';
import { Button } from 'react-native-elements';
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';
import renderIf from './renderIf';
import places from '../assets/places.json';
import busCol from '../assets/nyc_geojson.json';

import {
  purpleTheme,
  blueTheme,
  greenTheme,
  grayTheme,
  neutralTheme,
} from './themes';

const IS_IOS = Platform.OS === 'ios';
const MAPBOX_ACCESS_TOKEN = mapboxAccessToken;
const ThemeList = [
  {
    name: 'Blue Theme',
    theme: blueTheme,
    image: require('../assets/blue_button_image.png'),
  }
];

var styles = require('./DashboardStyles');

const styles_map = MapboxGL.StyleSheet.create({
  busStops: {
    circleColor: 'red',
    circleRadius: 10,
    circleOpacity: 0.84,
  },
  directionsLine: {
    lineColor: 'green',
    lineWidth: 5,
  },
});

const LATITUDE = 40.725777216880076;
const LONGITUDE = -74.011150343389346;

const PROFILEID = '789';
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

export default class Dashboard extends Component<{}> {
  constructor() {
    super();
    this.socket = io(socketURL);
    this.socket.on('connect', () => {
      //alert('connected!');
    });

    
    this.onDismiss = this.onDismiss.bind(this);
    this.renderThemeItem = this.renderThemeItem.bind(this);

    this.state = {
      isGranted: IS_IOS,
      activeTheme: ThemeList[0].theme,
      initialLocation: [-74.011150343389346,40.725777216880076],

      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,
      coordinates: [
        [LONGITUDE, LATITUDE],
      ],
      startCoordinates: [
        [-74.011150343389346,40.725777216880076],
      ],
      endCoordinates: [
        [-74.014524158565024,40.720187397445684],
      ],
      mycoordinates: [LONGITUDE, LATITUDE],
      busses: [],
      directions:'',
      sendObj: {
        profileid: '',
        latlong: '',
        timestamp: '',
        tripid: '',
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
    this.setState({ activeTheme: null });
  }

  renderThemeItem ({ item, index }) {
    const marginTop = index === 0 ? 16 : 8;
    const marginBottom = 8;

    const style = {
      flex: 1,
      height: 120,
      marginTop: marginTop,
      marginBottom: marginBottom,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: item.theme.primaryColor,
    };
    alert(JSON.stringify(item.theme))
    return (
      <TouchableOpacity onPress={() => this.setState({ activeTheme: item.theme })}>
        <View style={style}>
          <Image source={item.image} style={{ width: 130, flex: 1 }} />
        </View>
      </TouchableOpacity>
    );
  }



  renderMap () {
    if (!this.state.activeTheme) {
      return null;
    }

    StatusBar.setBarStyle('light-content');

    return (
      <Modal
        visible={!!this.state.activeTheme}
        animationType='slide'
        transparent
        onRequestClose={this.onDismiss}>
        <View style={styles.matchParent}>
          <MappingKit.MapView
            simulateUserLocation
            accessToken={MAPBOX_ACCESS_TOKEN}
            theme={this.state.activeTheme}
            centerCoordinate={this.state.initialLocation}
            featureCollection={places}
            busCollection={busCol}
            zoomLevel={13}
            style={styles.matchParent} />

          <View style={styles.mapHeader}>
            <LinearGradient
              style={styles.mapGradient}
              colors={['black', 'transparent']} />

            <Icon
              name='keyboard-backspace'
              size={28}
              onPress={this.onDismiss}
              style={styles.backArrow}
              color='white' />

            <Text style={styles.mapHeaderText}>Start Your Trip</Text>
          </View>
        </View>
      </Modal>
    );
  }

  async fetchDirections(origin, dest) {
    //origin = this.state.startCoordinates
    //dest = this.state.endCoordinates

    const originLatLng = {
      latitude: origin[1],
      longitude: origin[0],
    };
    
    const destLatLng = {
      latitude: dest[1],
      longitude: dest[0],
    };

    const requestOptions = {
      profile: this.props.type,
      geometry: 'polyline',
    };

    let res = null;
    try {
      res = await mapboxClient.getDirections([
        originLatLng,
        destLatLng,
      ], requestOptions);
    } catch (e) {
      console.log(e);
    }
    
    if (res !== null) {
      const directions = res.entity.routes[0];
      this.setState({ directions: directions });
    }
  }

  onPress (feature) {
    this.setState({
          mycoordinates:feature.geometry.coordinates,
          sendObj: {
              profileid: PROFILEID,
              latlong: feature.geometry.coordinates[0] + ',' + feature.geometry.coordinates[1], 
              tripid: '100',
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

    //this.fetchDirections([LONGITUDE, LATITUDE], [-117.1182608, 32.8463615]);

    const socket = this.socket;
    if (!socket) return;
    socket.on('disconnect', () => alert('You have been disconnected.'));

     this.socket.on('/geo-location/transportation-profile/subscribe', (locationState) => {
        var busses = [];
        for (var key in locationState) {
            if (locationState.hasOwnProperty(key)) {
              var innerObj = locationState[key]
              var latlong = locationState[key]['latlong'].split(",");
              var lat = Number(latlong[1]);
              var lon = Number(latlong[0]);

              var busObj = {
                title: locationState[key]['profileid'] + ' ' +locationState[key]['tripid']+ ' '+ locationState[key]['type'],
                coordinates: {
                  latitude: (isNaN(lat) ? 0 : lat), 
                  longitude: (isNaN(lon) ? 0 : lon) 
                },
              }
              busses.push(busObj);
            }
        }
        this.setState({busses: busses})
        alert(JSON.stringify(this.state.busses))
      });
  }

  componentWillUnmount() {
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

  renderBusses () {   
    const items = [];
    var busses = this.state.busses;
      for (let i = 0; i < busses.length; i++) {
        if(busses[i]['coordinates']['longitude'] < 0){
          const coordinate = [busses[i]['coordinates']['longitude'], busses[i]['coordinates']['latitude'] ]
          const title = busses[i]['title'];
          const id = `pointAnnotation${i}`;

          let animationStyle = {};
          if (i === this.state.activeAnnotationIndex) {
            animationStyle.transform = [{ scale: this._scaleIn }];
          } else if (i === this.state.previousActiveAnnotationIndex) {
            animationStyle.transform = [{ scale: this._scaleOut }];
          }

          items.push(
            <MapboxGL.PointAnnotation
              key={id}
              id={id}
              title='Test'
              selected={i === 0}
              onSelected={(feature) => this.onAnnotationSelected(i, feature)}
              onDeselected={() => this.onAnnotationDeselected(i)}
              coordinate={coordinate}>

              <View style={styles.annotationContainer}>
                <Animated.View style={[styles.annotationFill, animationStyle]} />
              </View>
              <MapboxGL.Callout title={title} />
            </MapboxGL.PointAnnotation>
          );
        }
      }
    return items;
  }


  render() {

    {/*if (!this.state.isGranted) {
      return null;
    }*/}

    const directions = this.state.directions;


    return (
      <View style={styles.container}>
          <View style={styles.innerTop} >
            {this.renderBusses()}

            {/*<TextInput 
                style={styles.textbox}
                placeholder = "From Address"
                placeholderTextColor = '#000'
                autoCorrect = {false}
                onChangeText={(text) => this.setState({fromAddress: text})}
                value={this.state.fromAddress}
              />
              <TextInput 
                style={styles.textbox}
                placeholder = "To Address"
                placeholderTextColor = '#000'
                autoCorrect = {false}
                onChangeText={(text) => this.setState({toAddress: text})}
                value={this.state.toAddress}
              />
              <TouchableHighlight
                style={styles.signin}
                onPress={() => this.fetchDirections([LONGITUDE, LATITUDE], [-74.005350272247554, 40.704310079961523])} 
                underlayColor='#3B5999'>
                  <Text style={styles.signinText}>Find Route</Text>
              </TouchableHighlight>*/}

            {/*<MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={15}
              showUserLocation={true}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.coordinates[0]}
              style={{flex:1}}
              styleURL='mapbox://styles/suhailwakil/cjd8f22c28yv72sp43vj765xy'
              >
              <MapboxGL.ShapeSource id='mapbox-directions-source' shape={directions.geometry}>
                <MapboxGL.LineLayer
                  id='mapbox-directions-line'
                  belowLayerID={Places.UnselectedSymbolID}
                  style={[styles.directionsLine, this.props.style]} />
              </MapboxGL.ShapeSource>
            

              <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={12}
              showUserLocation={true}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.coordinates[0]}
              style={{flex:1}}
              >
              */}
              
              
              
              {/*{renderIf(directions,
                <MapboxGL.ShapeSource id='mapbox-directions-source' shape={directions.geometry}>
                  <MapboxGL.LineLayer
                    id='mapbox-directions-line'
                    style={[styles_map.directionsLine, this.props.style]} />
                </MapboxGL.ShapeSource>
              )}

              <MapboxGL.ShapeSource id='nyc' shape={places} >
                <MapboxGL.CircleLayer
                  id='nycFill'
                  style={styles_map.busStops} />
              </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
          */}

          </View>




          <View style={styles.innerBot} >
            <Text style={styles.paragraph}>
              Bus App 
            </Text>
            <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={15}
              onPress={this.onPress}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.mycoordinates}
              style={{flex:1}}
              styleURL='mapbox://styles/suhailwakil/cjd8f22c28yv72sp43vj765xy'
              >
              {this.renderMyBus()}
            </MapboxGL.MapView>

            <View style={styles.matchParent}>
              {/*this.renderMap()*/}
            </View>

          </View>

      </View>
    );
  }
}



//ADDITION
renderBusses () {   
    const items = [];
    var busses = this.state.busses;
      for (let i = 0; i < busses.length; i++) {
        if(busses[i]['coordinates']['longitude'] < 0){
          const coordinate = [busses[i]['coordinates']['longitude'], busses[i]['coordinates']['latitude'] ]
          const title = busses[i]['title'];
          const id = `pointAnnotation${i}`;

          let animationStyle = {};
          if (i === this.state.activeAnnotationIndex) {
            animationStyle.transform = [{ scale: this._scaleIn }];
          } else if (i === this.state.previousActiveAnnotationIndex) {
            animationStyle.transform = [{ scale: this._scaleOut }];
          }

          items.push(
            <MapboxGL.PointAnnotation
              key={id}
              id={id}
              title='Test'
              selected={i === 0}
              onSelected={(feature) => this.onAnnotationSelected(i, feature)}
              onDeselected={() => this.onAnnotationDeselected(i)}
              coordinate={coordinate}>

              <View style={styles.annotationContainer}>
                <Animated.View style={[styles.annotationFill, animationStyle]} />
              </View>
              <MapboxGL.Callout title={title} />
            </MapboxGL.PointAnnotation>
          );
        }
      }
    return items;
  }
