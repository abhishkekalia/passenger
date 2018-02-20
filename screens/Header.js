
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

var styles = require('./HeaderStyles.js');

class Header extends React.Component
{

  renderMap () {
    return (
        <View style={styles.matchParent}>
            <LinearGradient
              style={styles.mapGradient}
              colors={['black', 'transparent']} />
            <Icon
              name='menu'
              size={28}
              onPress={this.props.onPress}
              style={styles.backArrow}
              color='#fff' />
        </View>
     
    );
  }
  render() {
    return (
      <View style={styles.container}>
          {this.renderMap()}
      </View>
    );
  }
}

export default Header;
