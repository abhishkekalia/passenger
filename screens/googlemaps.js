
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Icon,
  AlertIOS,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import io from 'socket.io-client';
import Moment from 'react-moment';
import 'moment-timezone';

var styles = require('./DashboardStyles.js');

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 32.7157;
const LONGITUDE = -117.1611;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const PROFILEID = '123';
const socketURL = 'https://smarttransit-dev-map-api.herokuapp.com'

export default class Dashboard extends Component<{}> {
  constructor() {
    super();
    this.socket = io(socketURL);
    this.socket.on('connect', () => {
      //alert('connected!');
    });

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      sendObj: {
        profileid: '',
        latlong: '',
        timestamp: '',
        tripid: '',
      },
      busObj:{},
      markers: [
        {
          title: '',
          coordinates: {
            latitude: LATITUDE,
            longitude: LONGITUDE
          },  
        }]
    };
  }


  onMapPress(e) {
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    
    this.setState({
          region: region,
          sendObj: {
              profileid: PROFILEID,
              latlong: region.latitude + ',' + region.longitude, 
              timestamp: '02:02',
              tripid: '100',
            }
          }, 
          function(){
            this.socket.emit('/v1/socket/geo-location/transportation-profile/update', this.state.sendObj)
          })

  }

  componentDidMount() {
    const socket = this.socket;
    if (!socket) return;
    socket.on('disconnect', () => alert('You have been disconnected.'));

     this.socket.on('/v1/socket/geo-location/transportation-profile/subscribe', (locationState) => {
        //var retStr = JSON.stringify(locationState)
        var busses = [];
        for (var key in locationState) {
            if (locationState.hasOwnProperty(key)) {
                var innerObj = locationState[key]
                var latlong = locationState[key]['latlong'].split(",");
                var lat = Number(latlong[0]);
                var lon = Number(latlong[1]);

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
        this.setState({markers: busses})

      });
    
    
    /*navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );*/
  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }



  render() {
    return (
      <View style={styles.container}>
          <View style={styles.innerTop} >
            <Text style={styles.paragraph}>
              Passenger App 
            </Text>
            <MapView
              ref="map"
              style={styles.container}
              //onPress={this.onMapPress.bind(this)}
              mapType="standard"
              zoomEnabled={true}
              pitchEnabled={true}
              showsUserLocation={true}
            >
              {this.state.markers.map((marker, index) => ( 
                  <MapView.Marker key={index} 
                        coordinate={marker.coordinates} 
                        title={marker.title} /> 
                ))}
              
            </MapView>
          </View>



          <View style={styles.innerBot} >
            <Text style={styles.paragraph}>
              Bus App 
            </Text>
            <MapView
              ref="map"
              style={styles.container}
              onPress={this.onMapPress.bind(this)}
              mapType="standard"
              zoomEnabled={true}
              pitchEnabled={true}
              //showsUserLocation={true}
            >
              <MapView.Marker
                coordinate={ this.state.region }
                title={PROFILEID}
              />
            </MapView>
          </View>

      </View>
    );
  }
}

