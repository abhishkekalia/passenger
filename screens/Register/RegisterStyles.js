import React, { Component, PropTypes } from 'react'
import { StyleSheet,} from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#222222',
    },
    innerTop:{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 10,
        // paddingLeft: 40,
        // paddingRight: 40,
    },
    innerBot:{
        flex: 1,
        backgroundColor: '#303030',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 10,
    },
    paragraph: {
        // margin: 24,
        fontSize: 20,
        fontWeight: '200',
        textAlign: 'center',
        color: '#ffffff',
    },
    phoneNumber: {
        height: 50,
        paddingTop: 15,
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        borderColor: '#383838',
        borderWidth: 1,
        borderRadius:10,
    },
    testing: {
        borderRadius: 4,
        borderWidth: 5,
        borderColor: 'red',
    },
    textInput: {
        height: 34,
    },
    button: {
        justifyContent: 'space-between',
        paddingBottom: 40,
        padding: 10,
    },
    submit:{
        padding:25,
        backgroundColor:'#3B5999',
        height: 40,
        justifyContent: 'center',
        borderRadius:30,
        //borderWidth: 1,
        //borderColor: '#fff'
    },
    submitText:{
        fontSize: 15,
        color:'#fff',
        textAlign:'center',
    },
    form : {
        // padding: 20
    },
    registerForm : {
        padding: 20,
    }
});
