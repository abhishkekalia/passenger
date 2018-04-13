
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
import Ripple from 'react-native-material-ripple';
import I18n from 'react-native-i18n';

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
        // this.props.navigation.navigate('Dashboard');
        // AlertIOS.alert("Not Implemented Yet!")
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
                            {I18n.t("varification.varificationTitle")}
                        </Text>
                        <Text style={styles.confirmText}>
                            {I18n.t("varification.successString_1") + this.state.phoneNumber + " " + I18n.t("varification.successString_2")}
                        </Text>
                    </View>
                    <Ripple onPress={() => this._handleLogin(this)}>
                        <TouchableHighlight
                            style={styles.login}
                            underlayColor='#ffffff'>
                            <Text style={styles.loginText}>{I18n.t("varification.openSmartTransit")}</Text>
                        </TouchableHighlight>
                    </Ripple>
                </View>
            </View>
        );
    }
}
