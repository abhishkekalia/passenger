import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // 4.5.0
import EvilIcons from 'react-native-vector-icons/EvilIcons'; // 4.5.0

export default class InsideDashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 12 , color: "#ccc", paddingVertical: 10}}>Remaining Balance</Text>
                <View style={styles.price}>
                    <View style={{flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row',  paddingVertical: 10}}>
                            <Text style={{ fontSize: 15, color: "#000", alignSelf: 'center'}}>$</Text>
                            <Text style={{ fontSize: 30, color: "#3B5999", fontWeight: '500'}}>190</Text>
                        </View>
                        <TouchableOpacity style={[styles.Dolar, { paddingVertical: 10}]} onPress={()=>alert("Add Balance")}>
                            <EvilIcons color="#ccc" size={25} name="plus"/>
                            <Text style={{ fontSize: 15, color: "#ccc"}}>Add Balance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.Dolar, { paddingVertical: 10}]} onPress={()=>alert("Send Gifts")}>
                        <Icon color="#000" size={25} name="gift"/>
                            <Text style={{ fontSize: 15, color: "#000"}}>Send Gifts</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                    <View style={[{paddingVertical: 0}]}>
                        <Text style={{ fontSize: 15, color: "#ccc"}}>Trips Taken</Text>
                        <Text style={{ fontSize: 25, color: "#000", fontWeight: 'bold'}}>15</Text>
                    </View>
                    <View style={[styles.Dolar,{ paddingVertical: 10}]}>
                        <Text style={{ fontSize: 15, color: "#ccc"}}>Kilometres Travelled</Text>
                    </View>
                    <View style={{ paddingVertical: 10, flexDirection: 'row'}}>
                        <Text style={{ fontSize: 30, color: "#000", fontWeight: '500'}}>210</Text>
                            <Text style={{ fontSize: 15, color: "#000", alignSelf: 'flex-end'}}>KMS</Text>
                    </View>
                </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    price: {
        // flex: 1,
        justifyContent: 'space-around',
        // alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },
    balance : {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },
    Dolar : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    tripstaken : {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});
