import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableHighlight,
    AlertIOS,
} from 'react-native';
import I18n from 'react-native-i18n';
import Ripple from 'react-native-material-ripple';
import OtpKeyboard from '../OtpKeyboard/OtpKeyboard';
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import Material from 'react-native-vector-icons/MaterialCommunityIcons'; // 4.5.0
import styles from './RegisterAcountStyles.js';
const { width, height } = Dimensions.get('window');

export default class RegisterAcount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: this.props.navigation.state.params.phoneNumber,
            // phoneNumber: '',
            errorMessage: '',
            otpTitle: I18n.t("registeracount.secretTitle"),
            otp : '',
            text: '',
            country: ''
        };
    }
    _handleRegisterProcess= () => {
        if(this.validate()){
            this.props.navigation.navigate('Verification', { phoneNumber: this.state.phoneNumber });
        }
    }
    changeText(newText) {
        this.setState({ otp: newText });
    }
    validate(){
        const {otp} = this.state;
        if (otp.length !== 4){
            alert("Please Insert 4 Digit One Time Password")
            return false;
        }
        return true;
    }
    render() {
        const {otp}= this.state;
        otp.length === 4 ? this._handleRegisterProcess() : undefined
        return (
            <View style={styles.container}>
                <View style={styles.innerTop} >
                    <Text style={styles.phoneNumber}>
                        { !this.state.otp.length ? this.state.otpTitle  : this.state.otp}
                    </Text>
                    <Text style={styles.warning}>
                        { I18n.t("registeracount.warningString")}
                    </Text>
                    <View style={styles.radiobuttons}>
                        <Icon color="#fff" size={25} name="dot-circle-o" style={{ alignSelf: 'center'}}
                            onPress={() => this._handleRegisterProcess(this)}/>
                        <Material color="#fff" size={50} name="dots-horizontal" style={{ alignSelf: 'center'}}/>
                    </View>
                </View>
                <View style={styles.innerBot} >
                    <OtpKeyboard color='white' pressMode='string' onPress={(val) => this.changeText(val)} />
                </View>
            </View>
        );
    }
}
