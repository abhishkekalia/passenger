import MapboxGL from '@mapbox/react-native-mapbox-gl';
MapboxGL.setAccessToken('pk.eyJ1Ijoic3VoYWlsd2FraWwiLCJhIjoiY2pkNG85aGd6NGpyejJ5bzV5ZHBtM2tvMCJ9.jHWo8YAjscitA5eIz9oCNA');

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Icon,
  AlertIOS,
  Dimensions,
  Animated
} from 'react-native';
import { Button } from 'react-native-elements';
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';
var styles = require('./DashboardStyles');

const LATITUDE = 32.7157;
const LONGITUDE = -117.1611;

const PROFILEID = '789';
const socketURL = 'https://smarttransit-dev-map-api.herokuapp.com'

export default class Dashboard extends Component<{}> {
  constructor() {
    super();
    this.socket = io(socketURL);
    this.socket.on('connect', () => {
      //alert('connected!');
    });

    this.state = {
      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,
      coordinates: [
        [LONGITUDE, LATITUDE],
      ],
      mycoordinates: [LONGITUDE, LATITUDE],
      busses: [
      {
        title: '',
        coordinates: {
          latitude: LATITUDE,
          longitude: LONGITUDE
        },  
      }],
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

  onPress (feature) {
    this.setState({
          mycoordinates:feature.geometry.coordinates,
          sendObj: {
              profileid: PROFILEID,
              latlong: feature.geometry.coordinates[0] + ',' + feature.geometry.coordinates[1], 
              timestamp: '02:02',
              tripid: '100',
            }
          }, 
          function(){
            this.socket.emit('/v1/socket/geo-location/transportation-profile/update', this.state.sendObj)
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
    socket.on('disconnect', () => alert('You have been disconnected.'));

     this.socket.on('/v1/socket/geo-location/transportation-profile/subscribe', (locationState) => {
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
    return (
      <View style={styles.container}>
          <View style={styles.innerTop} >
            <Text style={styles.paragraph}>
              Passenger App 
            </Text>
            <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={5}
              showUserLocation={true}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.coordinates[0]}
              style={{flex:1}}>
              {this.renderBusses()}
            </MapboxGL.MapView>
          </View>
          <View style={styles.innerBot} >
            <Text style={styles.paragraph}>
              Bus App 
            </Text>
            <MapboxGL.MapView
              ref={(c) => this._map = c}
              zoomLevel={5}
              onPress={this.onPress}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              centerCoordinate={this.state.mycoordinates}
              style={{flex:1}}>
              {this.renderMyBus()}
            </MapboxGL.MapView>
          </View>



          

      </View>
    );
  }
}

