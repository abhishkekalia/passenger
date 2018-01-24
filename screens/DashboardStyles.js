'use strict';
var React = require('react-native');

var {
  StyleSheet,
} = React;

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
	  	justifyContent: 'center', 
	  	padding: 10,
	  	paddingLeft: 40,
	  	paddingRight: 40,
	  	borderRadius: 4,
	    borderWidth: 5,
	    borderColor: 'red',
	  },
	  innerBot:{
	  	flex: 1,
	  	backgroundColor: '#303030',
	  	alignItems: 'stretch', 
	  	justifyContent: 'flex-start', 
	  	padding: 10,
	  	borderRadius: 4,
	    borderWidth: 5,
	    borderColor: 'green',
	  },
	  paragraph: {
	    margin: 24,
	    fontSize: 20,
	    fontWeight: 'bold',
	    textAlign: 'center',
	    color: '#ffffff',
	  },
	  testing: {
	  	borderRadius: 4,
	    borderWidth: 5,
	    borderColor: 'red',
	  },
	  textInput: {
		height: 34,
	},

});