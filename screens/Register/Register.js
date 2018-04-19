import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    Image,
    TouchableHighlight,
    AlertIOS,
} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import io from 'socket.io-client'; // 2.0.4
import I18n from 'react-native-i18n';
import Ripple from 'react-native-material-ripple';
import ActionSheet from 'react-native-actionsheet';
import styles from './RegisterStyles.js';
import { Picker } from 'react-native-picker-dropdown';
import FontAwesome from 'react-native-vector-icons/Feather';
import IMEI from 'react-native-imei';
import {Actions as routes} from "react-native-router-flux";

import Keyboard from '../Keyboard/Keyboard';
import api from '../../Api/api'
// const socketURL = 'https://smarttransit-dev-api.herokuapp.com/v1/socket'
// const socketURL = 'https://smarttransit-dev-map-api.herokuapp.com/v1/socket'
const { width, height } = Dimensions.get('window');
const countryTitle = 'Select Country'
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 0
const Ghana = require("../../images/ghana.png");
const Nigeria = require("../../images/nigeria.png");
const uk = require("../../images/english-national-flag-union-jack-i135.jpg");
const india = require("../../images/india.jpg");
let IMEi_number = IMEI.getImei();
export default class Register extends Component{
    constructor(props) {
        super(props);
        // this.socket = io(socketURL);
        // this.socket.on('connect', () => {
            // alert('i am connected!');
        // });
        this.state = {
            countries: ["Cancel", "Ghana", "Nigeria", "United Kingdom", "India"],
            dialingCode: ["Cancel", "+233", "+234", "+44", "+91"],
            countryFlag: ["Cancel",Ghana, Nigeria, uk, india],
            phoneNumber: '',
            errorMessage: '',
            inputValue: I18n.t("register.placeholder"),
            text: '',
            country: ''
        };
        this.handlePress = this.handlePress.bind(this);
    }
    handlePress(index, value) {
        if(index === 0){
            this.setState({
                country: '',
            })
        }else{
            this.setState({
                country : index.toString()
            })
        }
    }
    _handleRegisterProcess= () => {
        const { phoneNumber} = this.state;
        let  DialCode = this.state.dialingCode[this.state.country];
        let contactnumber = DialCode + phoneNumber;
        // this.socket = io(socketURL);
        if(this.validate()){
            // socket based api call
            // this.socket.on('connect', (result) => {
                // console.log(result);
            // })
            // this.socket.emit('/passenger-identifier/check', Contact, (result) => {
                // alert("You are connected to the check")
            // })
            // console.warn("contactnumber:-", contactnumber);
            // routes.RegisterAcount()
            this.props.navigation.navigate('RegisterAcount', { phoneNumber: this.state.phoneNumber });
            // uncomment this if api done

            /*
            api.register(contactnumber)
            .then((responseData) => {
                if(responseData[0].verified){
                    this.registerToSmartTransit(contactnumber)
                }else {
                    this.registerToSmartTransit(contactnumber)
                    // alert(JSON.stringify(responseData))
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .done();
            */
        }
    }
    registerToSmartTransit(contactnumber){
        api.registerSmartTransit(contactnumber, IMEi_number)
        .then((responseData) => {
            console.log("Responsefrom register:", responseData);
        })
        .catch((error) => {
            console.log(error);
        })
        .done();
    }
    changeText(newText) {
        if(this.validatePhoneNumber()){
            this.setState({ phoneNumber: newText });
        }
    }
    showCountrysheet() {
        this.countrySheet.show()
    }
    validatePhoneNumber(){
        if(this.state.phoneNumber.length > 9){
            return false;
        }
        return true;
    }
    validate(){
        const { country , phoneNumber} = this.state;
        if (!country.length){
            alert("Please Select Country first")
            return false;
        }
        if (phoneNumber.length < 8){
            alert("Please Insert 8 Digit PhoneNumber")
            return false;
        }
        return true;
    }
    render() {
        // console.warn("IMEi_number", IMEi_number);
        return (
            <View style={styles.container}>
                <View style={styles.innerTop} >
                    <Text style={styles.paragraph}>
                        {I18n.t("register.addphone")}
                    </Text>
                    <View style={{ flexDirection: 'row',}}>
                        { this.state.country
                            ?
                            <Image source={ this.state.countryFlag[this.state.country]} style={{ width: 30, height: 30, borderRadius: 15, alignSelf: 'center'}} />
                            :
                            <Image source={require('../../images/country_icon.png')} style={{ width: 30, height: 30,  alignSelf: 'center'}} />
                        }
                            <FontAwesome
                                onPress={()=> this.showCountrysheet()}
                                name="chevron-down"
                                size={20}
                                color="#FFF"
                                style={{padding:5, alignSelf: 'center'}}/>
                        {/*
                            <Picker
                            mode="dropdown"
                            style={{width : width/3, alignSelf: 'center'}}
                            selectedValue={this.state.country}
                            onValueChange={(itemValue, itemIndex) => {
                            this.setState({country: itemValue})
                            }}>
                            <Picker.Item key={0} label={"Ghana +233"} value={"+233"} />
                            <Picker.Item key={1} label={"Nigeria +299"} value={"+299"} />
                            <Picker.Item key={2} label={"United"} value={"+93"} />
                            </Picker>
                            */}
                        <View style={{width: width/1.5, flexDirection: 'row' }}>
                            <Text style={{ height: 50, paddingTop: 15, fontSize: 18, textAlign: 'center', color: '#fff', padding: 5 ,borderColor: '#383838', borderBottomWidth:  this.state.country ? 1 : 0, right: 5}}>
                                { this.state.country ? this.state.dialingCode[this.state.country] : undefined}
                            </Text>
                            <Text style={[styles.phoneNumber, {width: this.state.country ? width/1.7 : width/1.5 }]}>
                                { !this.state.phoneNumber.length ? this.state.inputValue : this.state.phoneNumber}
                            </Text>
                    </View>
                    </View>
                    <View style={styles.button}>
                        <Ripple onPress={() => this._handleRegisterProcess(this)}>
                            <TouchableHighlight
                                style={styles.submit}
                                underlayColor='#3B5999'>
                                <Text style={styles.submitText}>Next</Text>
                            </TouchableHighlight>
                        </Ripple>
                    </View>
                </View>
                <View style={styles.innerBot} >
                    <Keyboard color='white' pressMode='string' onPress={(val) => this.changeText(val)} />
                </View>
                <ActionSheet
                    ref={o => this.countrySheet = o}
                    title={countryTitle}
                    options={this.state.countries}
                    cancelButtonIndex={CANCEL_INDEX}
                    // destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                    allowFontScaling={false}
                    styles={customStyles}/>
            </View>
        );
    }
}
const customStyles = {
    // titleBox: {
    //     backgroundColor: '#fff'
    // },
    titleText: {
        fontSize: 15,
        color: '#000'
    },
    // messageBox: {
    //     // height: 60 ,
    //     background: 'red'
    // }
}
