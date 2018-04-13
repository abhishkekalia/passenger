import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#8D8882',
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
	  },
	  rowbuttons: {
	      alignItems: 'flex-end',
	      flex: 1,
	      flexDirection: 'row',
	      justifyContent: 'space-between',
	      paddingBottom: 40,
	      padding: 20,
	  },
	  submit:{
	    padding:20,
	    backgroundColor:'#233fd0',
	    borderRadius:30,
	    //borderWidth: 1,
	    //borderColor: '#fff'
	  },
	  submitText:{
	  	  fontSize: 15,
	      color:'#fff',
	      textAlign:'center',
	  },
	  login:{
	    padding:20,
	    backgroundColor:'#FFFFFF',
	    borderRadius:22,
	    //borderWidth: 1,
	    //borderColor: '#fff'
	  },
	  loginText:{
	  	  fontSize: 15,
	      color:'#3B5999',
	      textAlign:'center',
	  },
	  confirmText: {
	    margin: 24,
	    fontSize: 15,
	    textAlign: 'center',
	    color: '#fff',
	  },
      no_codeText: {
          marginTop: 24,
          padding:10,
  	    backgroundColor:'#fff',
  	    borderRadius:35,
    },
    ReenterText: {
        fontSize: 15,
        color:'#0e27a9',
        textAlign:'center',
    }

});
