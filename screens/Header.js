import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS
} from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'; // 2.4.0
import Icon from 'react-native-vector-icons/MaterialIcons'; // 4.5.0
import MaterialIcons from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import IconBadge from 'react-native-icon-badge';
var styles = require('./HeaderStyles.js');
class Header extends React.Component{
    renderHeader () {
        return (
            <View style={styles.matchParent}>
                <Icon
                    name='menu'
                    size={28}
                    onPress={this.props.onPress}
                    // style={styles.backArrow}
                    color='#000' />
                    <Text
                        //  style={styles.backArrow}
                        >Smart Transit</Text>
                    <View style={{ flexDirection: 'row', width: 100, justifyContent: 'space-around'}}>
                        <Icon
                            name='book'
                            size={28}
                            onPress={this.props.onPress}
                            // style={styles.backArrow}
                            color='#000' />
                        <IconBadge
                            MainElement={
                                <MaterialIcons
                                    name='bell-o'
                                    size={25}
                                    onPress={this.props.onPress}
                                    style={{right: 10}}
                                    color='#000' />
                            }
                            BadgeElement={
                                <Text style={{color:'#FFFFFF'}}>{2}</Text>
                            }
                            IconBadgeStyle={{
                                width:16,
                                height:18,
                                left : 10,
                                backgroundColor: 'red'
                            }}
                            />
                    </View>

            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
            </View>
        );
    }
}
export default Header;
