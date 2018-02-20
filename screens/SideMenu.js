import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenuStyles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 4.5.0


class SideMenu extends Component {
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _logout= () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Newuser'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
  
  render () {
    return (
      <View style={styles.container}>
        <ScrollView 
        pointerEvents="box-none"
        style={styles.scrollView}
        scrollEventThrottle={200}
        contentInset={{top: 0}}>
        <View style={styles.container}>
          <View style={styles.userIcon} >
            <Icon underlayColor='#5F514B' name='face' type= 'Action' color= '#fff' size= {30}/>
          </View>
          <Text style={styles.welcome}>
            Welcome Edmund
          </Text>
          <Text style={styles.categoryLabel}>
            Home
          </Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel} onPress={this.navigateToScreen('Dashboard')}>
            Current Trip
            </Text>
          </View>
          </View>
          <View>
            <Text style={styles.categoryLabel}>
              Bus Owner
            </Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel} onPress={this.navigateToScreen('BusApp')}>
                Start Driving
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.categoryLabel}>
              Account
            </Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel} onPress={() => alert("Coming Soon!")}>
                Edit Profile
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel} onPress={() => alert("Coming Soon!")}>
                Payment Options
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel} onPress={() => alert("Coming Soon!")}>
                  My Trips
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.categoryLabel}>
              Connect Account
            </Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel} onPress={() => alert("Coming Soon!")}>
                Facebook
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel} onPress={() => alert("Coming Soon!")}>
                Twitter
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel} onPress={() => alert("Coming Soon!")}>
                Gmail
              </Text>
            </View>
          </View>

        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>About smartTransit</Text>

          
          
          
          <View style={{flexDirection:"row"}}>
            <View style={styles.logoutIcon} >
                <Icon onPress={() => this._logout()} underlayColor='#5F514B' name='input' type= 'Action' color= '#fff' size= {30}/>
              </View>
            <View style={styles.logoutText}>
              <Text style={styles.rowLabel} onPress={() => this._logout()}>
                Sign out
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;