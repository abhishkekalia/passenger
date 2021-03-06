'use strict';
var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#3B5999',
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
	      // alignItems: 'flex-start',
	      flex: 1,
	      // flexDirection: 'row',
	      justifyContent: 'space-between',
	      paddingBottom: 40,
	      padding: 20,
	  },
	  submit:{
	    marginRight:20,
	    marginLeft:20,
	    marginTop:10,
	    paddingTop:20,
	    paddingBottom:20,
	    backgroundColor:'#3B5999',
	    borderRadius:22,
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
	    borderRadius:30,
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
	    fontSize: 20,
	    textAlign: 'center',
	    color: '#fff',
	  },
	  verifyText: {
	    margin: 24,
	    fontSize: 25,
	    textAlign: 'center',
	    color: '#fff',
	  },

});
