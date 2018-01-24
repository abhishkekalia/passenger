import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Newuser from '../screens/Newuser';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';

export const Tabs = TabNavigator({
  Newuser: {
    screen: Newuser,
    navigationOptions: {
      tabBarLabel: 'New User',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      tabBarLabel: 'Register',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
},
{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
  },);

export const FeedStack = StackNavigator({
  Newuser: {
    screen: Newuser,
    navigationOptions: {
      title: 'Smart Transit',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#8D8882',
        //borderBottomColor: '#ffffff',
        //borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    },
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      //title: `${navigation.state.params.name.toUpperCase()}`,
      title: `Register`,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#222222',
        //borderBottomColor: '#ffffff',
        //borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      //title: `${navigation.state.params.name.toUpperCase()}`,
      title: `Login`,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#5F514B',
        //borderBottomColor: '#ffffff',
        //borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      //title: `${navigation.state.params.name.toUpperCase()}`,
      title: `Dashboard`,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#5F514B',
        //borderBottomColor: '#ffffff',
        //borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
    }),
  },
},
{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
  },);