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
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import I18n from 'react-native-i18n';
import Ripple from 'react-native-material-ripple';
import Keyboard from '../Keyboard/Keyboard'
import styles from './RegisterStyles.js';
import { Picker } from 'react-native-picker-dropdown';
const { width, height } = Dimensions.get('window');

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            errorMessage: '',
            inputValue: I18n.t("register.placeholder"),
            text: '',
            country: ''
        };
    }
    _handleRegisterProcess= () => {
        if(this.validate()){
            this.props.navigation.navigate('RegisterAcount', { phoneNumber: this.state.phoneNumber });
            // AlertIOS.alert("Sending "+ this.state.phoneNumber)
        }
    }
    changeText(newText) {
        this.setState({ phoneNumber: newText });
    }
    validate(){
        const {country , phoneNumber} = this.state;
        if (!country.length){
            alert("Please Select Country")
            return false;
        }
        if (!phoneNumber.length){
            alert("Please Insert PhoneNumber")
            return false;
        }
        return true;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerTop} >
                    <Text style={styles.paragraph}>
                        {I18n.t("register.addphone")}
                    </Text>
                    <View style={{ flexDirection: 'row',}}>
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
                        <View style={{width: width/1.8}}>
                        <Text style={styles.phoneNumber}>
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
            </View>
        );
    }
}
