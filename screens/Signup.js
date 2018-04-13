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
import Ripple from 'react-native-material-ripple';
import Keyboard from './Keyboard/Keyboard';
import CustomTextInput from '../components/CustomTextInput'
var styles = require('./RegisterStyles.js');

export default class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            errorMessage: '',
            inputValue: 'enter phone number',
            text: '',
            password: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            verificationTokenExpiry: '',
            emailVerified : true,
            verificationType: '',
            avatarSrc : '',
            id:''
        };
    }
    hideForm = async () => {
        if (this.buttonRef && this.formRef && this.linkRef) {
            await Promise.all([
                this.buttonRef.zoomOut(200),
                this.formRef.fadeOut(300),
                this.linkRef.fadeOut(300)
            ])
        }
    }

    _handleRegisterProcess= () => {
        this.props.navigation.navigate('Verification', { phoneNumber: this.state.phoneNumber });
        // AlertIOS.alert("Sending "+ this.state.phoneNumber)
    }
    changeText(newText) {
        this.setState({ phoneNumber: newText });
    }
    render() {
        const { email, password, firstName } = this.state
        const { isLoading, onLoginLinkPress, onSignupPress } = this.props
        const isValid = email !== '' && password !== '' && firstName !== ''

        return (
            <View style={styles.container}>
                <View style={styles.registerForm} ref={(ref) => this.formRef = ref}>
                    <View style={styles.form} ref={(ref) => this.formRef = ref}>
                    <CustomTextInput
                        ref={(ref) => this.firstNameInputRef = ref}
                        placeholder={'First name'}
                        editable={!isLoading}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        withRef={true}
                        onSubmitEditing={() => this.lastNameInputRef.focus()}
                        onChangeText={(value) => this.setState({ firstName: value })}
                        isEnabled={!isLoading}
                        />
                    <CustomTextInput
                        ref={(ref) => this.lastNameInputRef = ref}
                        placeholder={'Last name'}
                        editable={!isLoading}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        withRef={true}
                        onSubmitEditing={() => this.usernameNameInputRef.focus()}
                        onChangeText={(value) => this.setState({ lastName: value })}
                        isEnabled={!isLoading}
                        />
                    <CustomTextInput
                        ref={(ref) => this.usernameNameInputRef = ref}
                        placeholder={'Username'}
                        editable={!isLoading}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        withRef={true}
                        onSubmitEditing={() => this.emailInputRef.focus()}
                        onChangeText={(value) => this.setState({ username: value })}
                        isEnabled={!isLoading}
                        />
                    <CustomTextInput
                        ref={(ref) => this.emailInputRef = ref}
                        placeholder={'Email'}
                        keyboardType={'email-address'}
                        editable={!isLoading}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        withRef={true}
                        onSubmitEditing={() => this.passwordInputRef.focus()}
                        onChangeText={(value) => this.setState({ email: value })}
                        isEnabled={!isLoading}
                        />
                    <CustomTextInput
                        ref={(ref) => this.passwordInputRef = ref}
                        placeholder={'Password'}
                        editable={!isLoading}
                        returnKeyType={'done'}
                        secureTextEntry={true}
                        withRef={true}
                        onChangeText={(value) => this.setState({ password: value })}
                        isEnabled={!isLoading}
                        />
                </View>
                <Ripple onPress={() => this.validate()}>
                    <TouchableHighlight
                        style={styles.submit}
                        underlayColor='#3B5999'>
                        <Text style={styles.submitText}>Next</Text>
                    </TouchableHighlight>
                </Ripple>
            </View>
            </View>
        );
    }
    validate(){
    const {firstName, lastName, username, email, password} = this.state;
    if (!firstName.length){
    alert("Please Insert FirstName")
        return false;
    }
    if (!lastName.length){
    alert("Please Insert LastName")
        return false;
    }
    if (!username.length){
    alert("Please Insert Username")
        return false;
    }
    if (!email.length){
    alert("Please Insert Email")
        return false;
    }
    if (!password.length){
    alert("Please Insert Password")
        return false;
    }

    return true;
}


}
