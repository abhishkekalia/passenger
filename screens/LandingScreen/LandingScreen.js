import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Icon,
    Image,
    AlertIOS
} from 'react-native';
import { Button } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import I18n from 'react-native-i18n';
import styles  from './LandingScreensStyle.js';
export default class LandingScreen extends Component{
    _handleRegister= () => {
        this.props.navigation.navigate('Register');
    }
    _Registrationconfirmation= () => {
        this.props.navigation.navigate('Registrationconfirmation');
    }
    // _handleLogin= () => {
    //     this.props.navigation.navigate('Dashboard');
        // AlertIOS.alert("Not Implemented Yet!")
    // }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../images/newusersplash.png')}
                    style={{ flex: 1,
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }
                }/>
                <View style={styles.rowbuttons}>
                    <View style={{flex:1}}>
                        <Ripple onPress={() => this._Registrationconfirmation(this)}>
                            <TouchableHighlight
                                style={styles.submit}
                                underlayColor='#3B5999'>
                                <Text style={styles.submitText}>{I18n.t("landing.start")}</Text>
                            </TouchableHighlight>
                        </Ripple>
                        <Text style={styles.confirmText} onPress={() => this._handleRegister(this)}>
                            {I18n.t("landing.codeConfirmation")}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
