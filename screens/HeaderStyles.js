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
	textbox: {
  	margin: 10,
    height: 40, 
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: 'left',
    color: '#000',
    borderColor: '#fff', 
    borderWidth: 1,
    borderRadius: 5
  },
  signin:{
	marginRight:20,
	marginLeft:20,
	marginTop:10,
	paddingTop:20,
	paddingBottom:20,
	backgroundColor:'#3B5999',
	borderRadius:30,
	//borderWidth: 1,
	//borderColor: '#fff'
  },
  signinText:{
  	  fontSize: 15,
      color:'#fff',
      textAlign:'center',
  },
  matchParent: {
    flex: 1,
  },
  mapHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
  },
  mapGradient: {
    flex: 1,
    height: 80,
  },
  mapHeaderText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
    position: 'relative',
    top: -60,
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 24,
  },
});