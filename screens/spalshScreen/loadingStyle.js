import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
	  container: {
	    flex: 1,
	    flexDirection: 'column',
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#3B5999',
	},
	logo: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title : {
		color: "#fff",
		fontSize: 50,
		fontWeight: "500"
	},
	blankView: {
		flex: 1,
	}
});
