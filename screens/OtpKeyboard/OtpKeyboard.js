'use strict';

import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';
import styles from './OtpKeyboardStyles.js';

class OtpKeyboard extends Component {
	static defaultProps = {
		pressMode: 'string',
		color: 'gray',
		backspaceImg: require('../backspace.png'),
		applyBackspaceTint: true,
		plus: true,
	}
	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
	}

	render() {
		return (
			<View style={styles.container}>
				{this.Row([1, 2, 3])}
				{this.Row([4, 5, 6])}
				{this.Row([7, 8, 9])}
				<View style={styles.row}>
					{this.Cell(0)}
				</View>
			</View>
		);
	}

	Backspace() {
		 return null;
	}

	Row(numbersArray) {
		let cells = numbersArray.map((val) => this.Cell(val));
		return (
			<View style={styles.row}>
				{cells}
			</View>
		);
	}

	Cell(symbol) {
		return (
			<TouchableOpacity style={styles.cell} key={symbol} accessibilityLabel={symbol.toString()} onPress={() => { this.onPress(symbol.toString()) }}>
			<View style={{ borderWidth: StyleSheet.hairlineWidth, borderRadius: 30, height: 60, width: 60,borderColor: "#fff"}}>
				<Text style={[styles.number, { color: this.props.color }]}>{symbol}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	onPress(val) {
		if (this.props.pressMode === 'string') {
			let curText = this.state.text;
			if (isNaN(val)) {
				if (val === 'back') {
					curText = curText.slice(0, -1);
				} else {
					curText += val;
				}
			} else {
				curText += val;
			}
			this.setState({ text: curText });
			this.props.onPress(curText);
		} else /* if (props.pressMode == 'char')*/ {
			this.props.onPress(val);
		}
	}
}


module.exports = OtpKeyboard;
