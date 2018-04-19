import React from "react";
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from "react-native-router-flux";
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {connect} from "react-redux";
import HomePage from "../app/dashboard/DashboardPage";
import LoginPage from "../app/auth/LoginPage";
import ProfilePage from "../app/profile/ProfilePage";
import {Loader} from "../app/common/components";

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
const reducerCreate = params => (state, action) => Reducer(params)(state, action);

const Routes = ({loading, needSignIn}) => (
	loading
	?
	<Loading/>
	:
    <Router
        createReducer={reducerCreate}
        // getSceneStyle={getSceneStyle}
        headerMode='screen'>
        <Overlay key="overlay">
            <Modal
                hideNavBar={true}
                // transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
                >
                <Lightbox key="lightbox">
                    <Stack key="root">
                        <Scene key="LandingScreen" initial={needSignIn} component={LandingScreen} title="Login" type="reset" hideNavBar/>
                        <Drawer
                            key="drawer"
                            drawer ={true}
                            type="overlay"
                            // drawerImage={MenuIcon}
                            contentComponent={SideMenu}
                            tapToClose={true}
                            hideNavBar={true}
                            initial={!needSignIn}
                            >
                            <Scene key="tab" hideNavBar>
                                <Stack
                                    key="Home"
                                    title="Home"
                                    // icon={TabIcon}
                                    iconName="home"
                                    // navigationBarStyle={{backgroundColor: '#1e2226'}}  titleStyle={{color : "#FFF"}}
                                    navigationBarStyle={{ backgroundColor: '#a9d5d1' }}
                                    onRight={ ()=> console.log("")}
                                    rightTitle={null}>
                                    <Scene
                                        key="Dashboard"
                                        titleStyle={{alignSelf: 'center'}}
                                        component={Dashboard}
                                        title="Home"
                                        // navigationBarStyle={{backgroundColor: '#1e2226'}}
                                        titleStyle={{color : "#FFF", alignSelf: 'center'}}
                                        type="replace"/>
                                </Stack>
                            </Scene>
                        </Drawer>
                    </Stack>
                </Lightbox>
                <Stack key="Register">
                    <Scene key="Register" component={Register} title="Register" hideNavBar/>
                </Stack>
                <Stack key="Registrationconfirmation">
                    <Scene key="Registrationconfirmation" component={Registrationconfirmation} title="Registrationconfirmation" hideNavBar/>
                </Stack>
                <Stack key="RegisterAcount">
                    <Scene key="RegisterAcount" component={RegisterAcount} title="RegisterAcount" hideNavBar/>
                </Stack>
                <Stack key="Verification">
                    <Scene key="Verification" component={Verification} title="Verification" hideNavBar/>
                </Stack>
            </Modal>
            </Overlay>
        </Router>
    );

function mapStateToProps(state) {
	return {
		loading: !state.storage.storageLoaded,
		needSignIn: !state.auth.token
	}
}

export default connect(mapStateToProps)(Routes);
