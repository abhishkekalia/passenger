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
    backgroundColor: '#F4F9FF',
  },
   contentContainer: {
    padding: 20,
  },
  bottomcontainer:{
  	flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  innerBot:{
  	flex: 1,
  	//backgroundColor: '#303030',
  	alignItems: 'stretch', 
  	justifyContent: 'center', 
  	padding: 20,
  },
  userIcon: {
    paddingTop: 50,
    alignSelf: 'center',
  },
  textbox: {
  	margin: 10,
    height: 40, 
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: 'left',
    color: '#fff',
    borderColor: '#fff', 
    borderWidth: 1,
    borderRadius: 5
  },
  testing: {
  	borderRadius: 4,
    borderWidth: 5,
    borderColor: 'red',
  },
  textInput: {
	borderColor: 'white', 
	borderWidth: 1,
	height: 34,
	paddingBottom:40
  },
  signin:{
	padding:18,
	backgroundColor:'#3B5999',
	borderRadius:18,
	//borderWidth: 1,
	//borderColor: '#fff'
  },
  signinText:{
  	  fontSize: 15,
      color:'#fff',
      textAlign:'center',
  },
  login:{
    marginRight:20,
    marginLeft:20,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
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
  rightText: {
    margin: 1,
    fontSize: 15,
    textAlign: 'right',
    color: '#fff',
  },
  centerText: {
    margin: 25,
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
  leftView: {
  	flex: 1,
  	alignItems: 'flex-start',
  },
  rightView: {
  	flex: 1.5,
  	alignItems: 'flex-end',
  },
  leftViewFace: {
  	flex: 1,
  	//alignItems: 'flex-start',
  },
  rightViewTwit: {
  	flex: 1,
  	//alignItems: 'flex-end',
  },
  rowTextView: {
  	flexDirection: "row", 
  	margin: 10 
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
    top: 32,
    left: 24,
  },
    leftText: {
    margin: 1,
    fontSize: 15,
    textAlign: 'center',
    color: 'green',
    paddingBottom:10,
  },

});