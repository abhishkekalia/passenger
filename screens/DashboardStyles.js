'use strict';
var React = require('react-native');

var {
  StyleSheet,
} = React;
const ANNOTATION_SIZE = 30;
module.exports = StyleSheet.create({
	annotationContainer: {
	    width: ANNOTATION_SIZE,
	    height: ANNOTATION_SIZE,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'white',
	    borderRadius: ANNOTATION_SIZE / 2,
	    borderWidth: StyleSheet.hairlineWidth,
	    borderColor: 'rgba(0, 0, 0, 0.45)',
	  },
	  annotationFill: {
	    width: ANNOTATION_SIZE - 3,
	    height: ANNOTATION_SIZE - 3,
	    borderRadius: (ANNOTATION_SIZE - 3) / 2,
	    backgroundColor: 'orange',
	    transform: [{ scale: 0.6 }],
	  },
	  annotationContainerMy: {
	    width: ANNOTATION_SIZE,
	    height: ANNOTATION_SIZE,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'white',
	    borderRadius: ANNOTATION_SIZE / 2,
	    borderWidth: StyleSheet.hairlineWidth,
	    borderColor: 'rgba(0, 0, 0, 0.45)',
	  },
	  annotationFillMy: {
	    width: ANNOTATION_SIZE - 3,
	    height: ANNOTATION_SIZE - 3,
	    borderRadius: (ANNOTATION_SIZE - 3) / 2,
	    backgroundColor: 'green',
	    transform: [{ scale: 0.6 }],
	  },
	  
	  container: {
	    flex: 1,
	    
	    
	  },
	  innerTop:{
	  	flex: 1,
	  	alignItems: 'stretch', 
	  	justifyContent: 'flex-start', 
	  	
	  },
	  innerBot:{
	  	flex: 1,
	  	backgroundColor: '#303030',
	  	alignItems: 'stretch', 
	  	justifyContent: 'flex-start', 
	  	
	  },
	  paragraph: {
	    margin: 0,
	    fontSize: 10,
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