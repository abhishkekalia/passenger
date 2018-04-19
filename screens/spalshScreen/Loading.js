import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import I18n from 'react-native-i18n';

var styles = require('./loadingStyle.js');

export default class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // navigatetolanding(){
    //     setTimeout(function () {
    //         this.props.navigation.navigate('LandingScreen');
    //     }.bind(this), 1000);
    // }
    render() {
        // this.navigatetolanding()
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Text style={styles.title}>{I18n.t("loading.title")}</Text>
                </View>
                <View style={styles.blankView}/>
            </View>
        );
    }
}
