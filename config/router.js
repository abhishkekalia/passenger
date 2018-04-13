import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import Registrationconfirmation from '../screens/Registrationconfirmation/Registrationconfirmation';
import Signup from '../screens/Signup';
import Register from '../screens/Register/Register';
import RegisterAcount from '../screens/RegisterAccount/RegisterAcount';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import BusApp from '../screens/BusApp';
import Verification from '../screens/Verification/Verification';
import SideMenu from '../screens/SideMenu/SideMenu';
import Profile from '../screens/Profile';
import Header from '../screens/Header';
import Loading from '../screens/spalshScreen/Loading'

export const MainDrawerNavigator = DrawerNavigator({
    Dashboard: {
        screen: Dashboard,
        headerMode: 'screen',
        navigationOptions: ({ navigation }) => ({
            //title: `${navigation.state.params.name.toUpperCase()}`,
            drawerLockMode: 'locked-closed',
            header: false,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#5F514B',
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }),
    },
    BusApp: {
        screen: BusApp,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: 'locked-closed',
            //title: `${navigation.state.params.name.toUpperCase()}`,
            title: `BusApp`,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#5F514B',
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }),
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: 'locked-closed',
            //title: `${navigation.state.params.name.toUpperCase()}`,
            title: `Profile`,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#5F514B',
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }),
    },
    Header: {
        screen: Header,
        headerMode: 'screen',
        navigationOptions: ({ navigation }) => ({
            //title: `${navigation.state.params.name.toUpperCase()}`,
            drawerLockMode: 'locked-closed',
            header: false,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#5F514B',
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }),
    },
},
{
    contentComponent: SideMenu,
    drawerWidth: 300,
    drawerPosition: 'left',
    contentOptions: {
        activeTintColor: '#e91e63',
        style: {
            flex: 1,
            paddingTop: 15
        }
    }
},
);
export const STNavigation = StackNavigator({
    // Loading: {
    //     screen: Loading,
    //     navigationOptions: {
    //         title: 'Smart Transit',
    //         header: false,
    //         gesturesEnabled: false,
    //     },
    // },
    LandingScreen: {
        screen: LandingScreen,
        // screen: Dashboard,
        navigationOptions: {
            title: 'Smart Transit',
            header: false,
            gesturesEnabled: false,
        },
    },
    Registrationconfirmation: {
        screen: Registrationconfirmation,
        navigationOptions: {
            title: 'Smart Transit',
            header: false,
            gesturesEnabled: false,
        },
    },
    Verification: {
        screen: Verification,
        headerMode: 'screen',
        navigationOptions: ({ navigation }) => ({
            title: `Account Verification`,
            gesturesEnabled: false,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#3B5999',
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }),
    },
    Signup: {
        screen: Signup,
        navigationOptions: ({ navigation }) => ({
            //title: `${navigation.state.params.name.toUpperCase()}`,
            title: `Register`,
            gesturesEnabled: false,
            headerVisible: false,
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
    Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => ({
            title: `Smart Transit`,
            gesturesEnabled: false,
            headerVisible: false,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#222222',
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }),
    },
    RegisterAcount: {
        screen: RegisterAcount,
        navigationOptions: ({ navigation }) => ({
            title: `Secret Code`,
            gesturesEnabled: false,
            headerVisible: false,
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#3B5999',
                //borderBottomColor: '#ffffff',
                //borderBottomWidth: 3,
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }),
    },

    MainDrawerNavigator: {
        screen: MainDrawerNavigator,
        headerMode: 'screen',
        navigationOptions: ({ navigation }) => ({
            header: false,
            gesturesEnabled: false,
        })
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
});
