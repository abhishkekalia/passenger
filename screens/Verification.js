
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
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
var styles = require('./VerificationStyles.js');

export default class Verification extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: this.props.navigation.state.params.phoneNumber,
    };

  }

  _handleRegister= () => {
    this.props.navigation.navigate('MainDrawerNavigator');
  }

  _handleLogin= () => {
    
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'MainDrawerNavigator'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    
    
    //this.props.navigation.navigate('Dashboard');
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
              <Text style={styles.verifyText}>
                Account Verification
              </Text>

              <Text style={styles.confirmText}>
                The phone number {this.state.phoneNumber} is now associated with this device.
              </Text>

              <TouchableHighlight
                style={styles.login}
                onPress={() => this._handleLogin(this)}
                underlayColor='#ffffff'>
                  <Text style={styles.loginText}>Open</Text>
              </TouchableHighlight>
            </View>
        </View>  
      </View>
    );
  }
}

