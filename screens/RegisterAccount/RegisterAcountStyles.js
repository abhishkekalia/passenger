import React, { Component, PropTypes } from 'react'
import { StyleSheet,} from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#3B5999',
    },
    innerTop:{
        flex: 0.3,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 10,
        // paddingLeft: 40,
        // paddingRight: 40,
    },
    innerBot:{
        flex: 1,
        backgroundColor: '#3B5999',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 10,
    },
    paragraph: {
        // margin: 24,
        fontSize: 13,
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
        // borderColor: '#383838',
        // borderWidth: 1,
        // borderRadius:10,
    },
    warning : {
        fontSize: 13,
        fontWeight: '200',
        textAlign: 'center',
        color: '#89a9d6',
    },
    testing: {
        borderRadius: 4,
        borderWidth: 5,
        borderColor: 'red',
    },
    textInput: {
        height: 34,
    },
    radiobuttons: {
        justifyContent: 'center',
        flexDirection: 'row'
        // paddingBottom: 40,
        // padding: 10,
    },
    submit:{
		padding:25,
        backgroundColor:'#fff',
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
