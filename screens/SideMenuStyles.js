import { StyleSheet, PixelRatio } from 'react-native';
const deviceScreen = require('Dimensions').get('window')

export default {
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#485EB1'
  },
  footerText: {
    color:'white',
  },

  scrollView: {
    backgroundColor: '#485EB1',
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#485EB1',
  },
  controlPanel: {
    flex: 1,
    backgroundColor:'#485EB1',
  },
  controlPanelText: {
    color:'white',
  },
  welcome: {
    fontSize: 25,
    color:'white',
    textAlign: 'center',
    margin: 40,
  },
  controlPanelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color:'white',
    fontWeight:'bold',
  },
  categoryLabel: {
    fontSize: 20,
    color:'white',
    textAlign: 'left',
    left: 10,
    padding:10,
    fontWeight:'bold',
  },
  row: {
    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0,
    paddingLeft:40,
    //borderTopWidth: 1 / PixelRatio.get(),
    //borderColor: 'white',
    padding:5,
    alignItems: 'center'
  },
  lastRow: {
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'white',
    padding:10,
    alignItems: 'center'
  },
  rowLabel: {
    left:10,
    color: 'white',
    fontSize:15,
    flex:1,
  },
  rowInput: {
    right:10,
  },
  sliderMetric: {
    right:10,
    width:30,
  },
  slider: {
    width: 150,
    height: 30,
    margin: 10,
  },
  picker: {
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
  },
  label: {
    fontSize: 20,
    textAlign: 'left',
    margin: 0,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderColor: '#eeeeee',
    borderWidth:1,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#aaaaaa',
    marginRight:20,
    marginLeft:20,
    alignSelf: 'center',
  },
  logoutIcon: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 0,
    alignSelf: 'flex-end',
  },
  logoutText: {
    flex: 5,
    paddingTop: 15,
    paddingRight: 5,
    alignSelf: 'flex-start',

  },
  userIcon: {
    paddingTop: 30,
    alignSelf: 'center',
  }
};