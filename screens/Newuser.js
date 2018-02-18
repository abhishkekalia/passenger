
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Icon,
  AlertIOS
} from 'react-native';
import { Button } from 'react-native-elements';
var styles = require('./NewuserStyles.js');

export default class Newuser extends Component<{}> {
  
  _handleRegister= () => {
    this.props.navigation.navigate('Register');

  }
  _handleLogin= () => {
    this.props.navigation.navigate('Dashboard');
    //AlertIOS.alert("Not Implemented Yet!")
  }

  goToBus= () => {
    this.props.navigation.navigate('BusApp');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowbuttons}>
          <View style={{flex:1}}>
              <Text style={styles.confirmText} onPress={this.goToBus}>
                Go To Bus App
              </Text>
              <TouchableHighlight
                style={styles.submit}
                onPress={() => this._handleRegister(this)}
                underlayColor='#3B5999'>
                  <Text style={styles.submitText}>Get Started</Text>
              </TouchableHighlight>
              <Text style={styles.confirmText}>
                Enter SMS Code Confirmation
              </Text>
              <TouchableHighlight
                style={styles.login}
                onPress={() => this._handleLogin(this)}
                underlayColor='#ffffff'>
                  <Text style={styles.loginText}>Dashboard</Text>
              </TouchableHighlight>
            </View>
        </View>  
      </View>
    );
  }
}

