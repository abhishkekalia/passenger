import { StyleSheet, Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');

module.exports = StyleSheet.create({
	container: {
		marginTop: 0,
		marginLeft: 0,
		marginRight: 0,
		alignItems: 'flex-start',
	},
	row: {
		flexDirection: 'row',
		marginTop: 25,
		
	},
	number: {
		fontSize: 25,
		textAlign: 'center',
	},
	backspace: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cell: {
		flex: 1,
		justifyContent: 'center',
	},
});