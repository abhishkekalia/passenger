
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Icon,
  AlertIOS
} from 'react-native';
import { Button } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

var styles = require('./NewuserStyles.js');

export default class Newuser extends Component<{}> {
  
  _handleRegister= () => {
    this.props.navigation.navigate('Register');

  }
  _handleLogin= () => {
    this.props.navigation.navigate('Dashboard');
    //AlertIOS.alert("Not Implemented Yet!")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowbuttons}>
          <View style={{flex:1}}>
              <Ripple onPress={() => this._handleRegister(this)}>  
                <TouchableHighlight
                  style={styles.submit}
                  underlayColor='#3B5999'>
                    <Text style={styles.submitText}>Get Started</Text>
                </TouchableHighlight>
              </Ripple>
              <Text style={styles.confirmText}>
                Enter SMS Code Confirmation
              </Text>
              <Ripple onPress={() => this._handleLogin(this)}>
                <TouchableHighlight
                  style={styles.login}
                  underlayColor='#ffffff'>
                    <Text style={styles.loginText}>Dashboard</Text>
                </TouchableHighlight>
              </Ripple>
            </View>
        </View>  
      </View>
    );
  }
}

