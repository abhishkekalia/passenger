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
import styles  from './Reg_confirmationstyle.js';
export default class Registrationconfirmation extends Component{
    _handleRegister= () => {
        this.props.navigation.navigate('Register');
    }
    _handleSignup= () => {
        this.props.navigation.navigate('RegisterAcount');
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../images/64ac96b532c4acdac548d9004f5e32b9fa5a0771.png')}
                    style={{ flex: 1,
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }
                }/>
                <View style={styles.rowbuttons}>
                    <View style={{flex:1}}>
                        <Ripple onPress={() => this._handleSignup(this)}>
                            <TouchableHighlight
                                style={styles.submit}
                                underlayColor='#3B5999'>
                                <Text style={styles.submitText}>{I18n.t("Reg_confirmation.confirmation_code")}</Text>
                            </TouchableHighlight>
                        </Ripple>
                        <Ripple onPress={() => this._handleRegister(this)}>
                            <TouchableHighlight
                            style={styles.no_codeText}
                                underlayColor='#3B5999'>
                                <Text style={styles.ReenterText}>{I18n.t("Reg_confirmation.no_code")}</Text>
                            </TouchableHighlight>
                        </Ripple>
                    </View>
                </View>
            </View>
        );
    }
}
