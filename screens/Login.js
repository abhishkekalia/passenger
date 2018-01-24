
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
import { CheckBox, SocialIcon, Button, Header, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

var styles = require('./LoginStyles.js');

export default class Register extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      username: '',
      password: '',
      text: '',
    };
  }
  
  _handleLogin= () => {
      //this.props.navigation.navigate('Register');
      //AlertIOS.alert("Sending "+ this.state.username + " " + this.state.password)

      this.props.navigation.navigate('Dashboard');
  }

  changeText(newText) {
    this.setState({ phoneNumber: newText });
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.innerBot} >
              <TextInput 
                style={styles.textbox}
                placeholder = "Email Address"
                placeholderTextColor = '#fff'
                autoCorrect = {false}
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.phoneNumber}
              />
              <TextInput 
                style={styles.textbox}
                placeholder = "Password"
                autoCorrect = {false}
                secureTextEntry = {true}
                placeholderTextColor = '#fff'
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.phoneNumber}
              />
              <View style={styles.rowTextView} >
                <View style={styles.leftView} >
                  <Text style={styles.leftText}>
                    Remember me
                  </Text>
                </View>   
                <View style={styles.rightView} > 
                  <Text style={styles.rightText}>
                    Forgot password?
                  </Text>
                </View>   
              </View>      
              <TouchableHighlight
                style={styles.signin}
                onPress={() => this._handleLogin(this)}
                underlayColor='#3B5999'>
                  <Text style={styles.signinText}>Sign in</Text>
              </TouchableHighlight>
          
            <Text style={styles.centerText}>
              or connect with
            </Text>

            <View style={styles.rowTextView} >
              <View style={styles.leftViewFace} >
                <SocialIcon
                  button
                  raised={false}
                  type='facebook'
                />
              </View>
              <View style={styles.rightViewTwit} >
                <SocialIcon
                  button
                  raised={false}
                  type='twitter'
                /> 
              </View>  
            </View>     
            <SocialIcon
              button
              raised={false}
              type='google'
            />
          </View>
      </View>
    );
  }
}

