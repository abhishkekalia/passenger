
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import Keyboard from './Keyboard'


var styles = require('./RegisterStyles.js');

export default class Register extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      errorMessage: '',
      inputValue: 'enter phone number',
      text: '',
    };

  }
  
  _handleRegisterProcess= () => {
      //this.props.navigation.navigate('Register');
      AlertIOS.alert("Sending "+ this.state.phoneNumber)
  }

  changeText(newText) {
    this.setState({ phoneNumber: newText });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerTop} >
            <Text style={styles.paragraph}>
              Add your phone number to receive your code
            </Text>
            <Text style={styles.phoneNumber}>
              {this.state.phoneNumber}
            </Text>
            <View style={styles.button}>
              <TouchableHighlight
                style={styles.submit}
                onPress={() => this._handleRegisterProcess(this)}
                underlayColor='#3B5999'>
                  <Text style={styles.submitText}>Next</Text>
              </TouchableHighlight>
            </View> 
          </View>
          <View style={styles.innerBot} >
            <Keyboard color='white' pressMode='string' onPress={(val) => this.changeText(val)} />
          </View>

      </View>
    );
  }
}

