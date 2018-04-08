import React, { Component } from 'react';
import { AppRegistry, ScrollView, View, KeyboardAvoidingView, TouchableHighlight, Text } from 'react-native';
import { FormValidationMessage } from 'react-native-elements'; // 0.19.0

import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from './Header';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 4.5.0
import Ripple from 'react-native-material-ripple';
import store from 'react-native-simple-store';

var styles = require('./ProfileStyles.js');


export default class Profile extends Component<{}> {
    constructor(props) {
      super(props);

      this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
      this.onSubmitnickName = this.onSubmitnickName.bind(this);
      this.onSubmitLocation = this.onSubmitLocation.bind(this);
      this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPhone = this.onSubmitPhone.bind(this);
      //this.onSubmitPassword = this.onSubmitPassword.bind(this);
      this.onAccessoryPress = this.onAccessoryPress.bind(this);

      this.firstnameRef = this.updateRef.bind(this, 'firstname');
      this.nickNameRef = this.updateRef.bind(this, 'nickName');
      this.locationRef = this.updateRef.bind(this, 'location');
      this.emailRef = this.updateRef.bind(this, 'email');
      this.phoneRef = this.updateRef.bind(this, 'phone');
      //this.passwordRef = this.updateRef.bind(this, 'password');

      //this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

      this.state = {
        firstname: '',
        nickName: '',
        location: '',
        email: '',
        phone: '',
        //password: '',
        userProfile: {
        },
        saveMessage: '',
        secureTextEntry: true,

      };
    }
    
    componentDidMount () { 
      this._getProfile(); 
    } 

    async _getProfile () { 
      store.get('userProfile')
        .then((res) =>
          { 
            if(res !== null)
              {
                this.setState({
                  firstname: res.firstname,
                  nickName: res.nickName,
                  location: res.location,
                  email: res.email,
                  phone: res.phone,
                  //password: res.password
                })
              }
          }
        )   
        .catch(error => {
          console.error(error.message);
        })
    } 


    onSubmit() {
      /*let errors = {};

      ['firstname', 'nickName', 'email', 'password']
        .forEach((name) => {
          let value = this[name].value();

          if (!value) {
            errors[name] = 'Should not be empty';
          } else {
            if ('password' === name && value.length < 6) {
              errors[name] = 'Too short';
            }
          }
        });

      this.setState({ errors });
      */

      store.save('userProfile', 
        {
          firstname: this.state.firstname,
          nickName: this.state.nickName,
          location: this.state.location,
          email: this.state.email,
          phone: this.state.phone,
          //password: this.state.password,
        }
      )
      this.setState({saveMessage: "Changes are saved"})
    }

    onFocus() {
      let { errors = {} } = this.state;

      for (let name in errors) {
        let ref = this[name];

        if (ref && ref.isFocused()) {
          delete errors[name];
        }
      }

      this.setState({ errors });
      this.setState({saveMessage: ''})
    }

    onChangeText(text) {
      ['firstname', 'nickName', 'location', 'email', 'phone'/*, 'password'*/]
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
            this.setState({saveMessage: ''})
          }
        });

    }

    onAccessoryPress() {
      this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmitFirstName() {
      this.nickName.focus();
    }

    onSubmitnickName() {
      this.location.focus();
    }

    onSubmitLocation() {
      this.email.focus();
    }

    onSubmitEmail() {
      this.phone.focus();
    }

    onSubmitPhone() {
      this.phone.blur();
      //this.password.focus();
    }

    onSubmitPassword() {
      this.password.blur();
    }



    updateRef(name, ref) {
      this[name] = ref;
    }

    renderPasswordAccessory() {
      let { secureTextEntry } = this.state;

      let name = secureTextEntry?
        'visibility':
        'visibility-off';

      return (
        <MaterialIcon
          size={24}
          name={name}
          color={TextField.defaultProps.baseColor}
          onPress={this.onAccessoryPress}
          suppressHighlighting
        />
      );
    }

    drawerNav= () => {
      this.props.navigation.navigate("DrawerOpen", {nickName: this.state.nickName})
    }

    render() {
      let { errors = {}, secureTextEntry, ...data } = this.state;
      let { firstname = '', nickName = '' } = data;

      //let defaultEmail = `${firstname}@${nickName}.com`
       // .replace(/\s+/g, '_')
        //.toLowerCase();

      return (
        <View style={styles.container} >
        <KeyboardAvoidingView behavior='padding'>
        <ScrollView
          style={styles.scroll}
          //contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.contentContainer}>
          
            <View style={styles.userIcon} >
              <Icon underlayColor='#5F514B' name='face' type= 'Action' color= '#666' size= {80}/>
            </View>

            <TextField
              ref={this.firstnameRef}
              tintColor="black"
              value={data.firstname}
              autoCorrect={false}
              //enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitFirstName}
              returnKeyType='next'
              label='Name'
              error={errors.firstname}
            />

            <TextField
              ref={this.nickNameRef}
              tintColor="black"
              value={data.nickName}
              autoCorrect={false}
              //enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitnickName}
              returnKeyType='next'
              label='Nickname'
              error={errors.nickName}
            />

            <TextField
              ref={this.locationRef}
              tintColor="black"
              value={data.location}
              autoCorrect={false}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitLocation}
              returnKeyType='next'
              multiline={true}
              blurOnSubmit={true}
              label='Location'
              //characterRestriction={140}
            />

            <TextField
              ref={this.emailRef}
              tintColor="black"
              value={data.email}
              //defaultValue={defaultEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              //enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitEmail}
              returnKeyType='next'
              label='E-mail'
              error={errors.email}
            />

            <TextField
              ref={this.phoneRef}
              tintColor="black"
              value={data.phone}
              //defaultValue={defaultPhone}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              //enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPhone}
              returnKeyType='done'
              label='Phone'
              error={errors.phone}
            />


           { /*<TextField
                         ref={this.passwordRef}
                         tintColor="black"
                         value={data.password}
                         secureTextEntry={secureTextEntry}
                         autoCapitalize='none'
                         autoCorrect={false}
                         //enablesReturnKeyAutomatically={true}
                         //clearTextOnFocus={true}
                         onFocus={this.onFocus}
                         onChangeText={this.onChangeText}
                         onSubmitEditing={this.onSubmitPassword}
                         returnKeyType='done'
                         label='Password'
                         error={errors.password}
                         //title='Choose wisely'
                         maxLength={20}
                         characterRestriction={20}
                         renderAccessory={this.renderPasswordAccessory}
                       />*/}
              <FormValidationMessage labelStyle={styles.leftText}>{this.state.saveMessage}</FormValidationMessage>
              <Ripple onPress={() => this.onSubmit(this)}>
                <TouchableHighlight
                  style={styles.signin}
                  disabled={this.state.butLoading}
                  >
                    <Text style={styles.signinText}>Save Changes</Text>
                </TouchableHighlight>  
              </Ripple>

              
          
          </View>     
        </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.mapHeader}>
            <Header onPress={this.drawerNav} headerText="Edit Profile" data={this.state.nickName}/>
        </View>
      </View>
      );
    }
  }
module.exports = Profile;
