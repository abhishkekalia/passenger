import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenuStyles';
import {NavigationActions} from 'react-navigation';
import { StyleSheet, ScrollView, Text, View, Image, TouchableHighlight, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 4.5.0
import EvilIcons from 'react-native-vector-icons/EvilIcons'; // 4.5.0
import MapIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // 4.5.0
import ImagePicker from 'react-native-image-picker';
import store from 'react-native-simple-store';
class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            nickName: "",
            avatarSource: "",
            thumbnail_image: "",
            imageSelect: "",
            videoSelect: "",
            image: "",
            fileType: "",
            thumblinefiletype: "",
            Source: "",
            uploadFileName: "",
            thumblinename: "",
        }
    }
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
                NavigationActions.navigate({ routeName: 'LandingScreen'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    componentDidMount () {
        this._getProfile();
    }
    async _getProfile () {
        store.get('userProfile')
        .then((res) =>
        {
            if(res !== null)
            {
                this.setState({
                    firstname: res.firstname,
                    nickName: res.nickName,
                })
            }
        }
        )
        .catch(error => {
            console.error(error.message);
        })
    }
    selectPhotoTapped() {
    const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
            skipBackup: true
        }
    };
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
            let name = response.fileName;
            let url = response.uri
            let path =
            (Platform.OS === 'ios')?
            url.replace(/^file:\/\//, '') : response.uri
            this.setState({
                avatarSource: source,
                thumbnail_image : path,
                imageSelect : true,
                videoSelect : false,
                image : 'image',
                fileType : 'image/jpg',
                thumblinefiletype : 'image/jpg',
                Source: path,
                uploadFileName : name,
                thumblinename : name,
                amount : "1"
            });
        }
    });
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
                            <View style={styles.avatar}>
                                {
                                    this.state.thumblinename === ""
                                    ?
                                    <Image  source={require('../../images/avatar.png')} style={styles.avatarProfile}/>
                                    :
                                    <Image style={styles.avatarProfile} source={this.state.avatarSource} />
                                }
                                <TouchableHighlight  onPress={()=>this.selectPhotoTapped()}
                                    style={{ width: 30, height: 30, backgroundColor: "#fff", borderRadius: 15, justifyContent: 'center',  position: 'absolute', left: 70, borderWidth: StyleSheet.hairlineWidth, borderColor: "#3B5999"}}>
                                    <EvilIcons underlayColor='#5F514B' name='pencil' type= 'Action' color= '#ccc' size= {30}/>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Text style={styles.welcome}>
                            Welcome {this.state.nickName}
                        </Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            <MapIcons size={20} color="#ccc" name="map-marker"/>
                            <Text style={styles.location}>
                                Accra {this.state.nickName}
                            </Text>
                        </View>
                        <View style={{height: StyleSheet.hairlineWidth, backgroundColor: "#fff"}}/>
                        <Text style={styles.categoryLabel}  onPress={this.navigateToScreen('Dashboard')}>
                            Dashboard
                                                                                                                                                                                                                                                    </Text>
                    </View>
                    <View>
                        <Text style={styles.categoryLabel} onPress={()=>alert("I am travel")}>
                            Travel
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.categoryLabel} onPress={()=>alert("My Trips")}>
                            My Trips
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.categoryLabel} onPress={()=>alert("My Funds")}>
                            My Funds
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.categoryLabel} onPress={()=>alert("Payment Method")}>
                            Payment Method
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.categoryLabel} onPress={()=>alert("Rewards")}>
                            Rewards
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.categoryLabel}>
                            Acount Settings
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>About smartTransit</Text>
                </View>
            </View>
        );
    }
}
SideMenu.propTypes = {
    navigation: PropTypes.object
};
export default SideMenu;
