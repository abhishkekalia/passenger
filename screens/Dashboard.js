
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
import { Button } from 'react-native-elements';
var styles = require('./DashboardStyles.js');

export default class Dashboard extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.innerTop} >
            <Text style={styles.paragraph}>
              This will be Maps
            </Text>
          </View>
          <View style={styles.innerBot} >
            <Text style={styles.paragraph}>
              This will Dashboard with Trips
            </Text>
          </View>

      </View>
    );
  }
}

