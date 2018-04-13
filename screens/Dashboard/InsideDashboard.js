import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // 4.5.0

export default class InsideDashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 15, color: "#000"}}>Remaining Balance</Text>
                <View style={styles.price}>
                    <View style={styles.Dolar}>
                        <Text style={{ fontSize: 15, color: "#000"}}>$</Text>
                        <Text style={{ fontSize: 15, color: "#000"}}>150</Text>
                    </View>
                    <View style={styles.tripstaken}>
                        <Text style={{ fontSize: 15, color: "#000"}}>Trips Taken</Text>
                        <Text style={{ fontSize: 15, color: "#000"}}>15</Text>
                    </View>
                </View>
                <View style={styles.balance}>
                <View style={styles.Dolar}>
                <Icon color="#000" size={25} name="plus-circle"/>
                    <Text style={{ fontSize: 15, color: "#000"}}>Add Balance</Text>
                </View>
                <View style={styles.Dolar}>
                    <Text style={{ fontSize: 15, color: "#000"}}>Kilometres Travelled</Text>
                </View>
                </View>
                <View style={styles.balance}>
                <View style={styles.Dolar}>
                <Icon color="#000" size={25} name="gift"/>
                    <Text style={{ fontSize: 15, color: "#000"}}>Send Gifts</Text>
                </View>
                <View style={styles.Dolar}>
                    <Text style={{ fontSize: 15, color: "#000"}}>210 KMS</Text>
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
        alignItems: 'center',
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
