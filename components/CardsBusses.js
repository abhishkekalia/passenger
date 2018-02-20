import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet } from 'react-native';
import { View, ScrollView, Image } from 'react-native';

import Modal from 'react-native-modalbox'; // 1.4.2
import Button from 'react-native-button'; // 2.3.0

const style = {
      backgroundColor: 'transparent',
      alignSelf: 'stretch',
      height: 160,
      padding: 20
    };

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  modal4: {
    height: 200
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  
  text: {
    color: "black",
    fontSize: 22
  },
  scrollView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 60,
    zIndex: 10,
  },
  slideStyle: {
    flex: 1,
    borderRadius: 10,
    margin: 2,
    elevation: 1,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    backgroundColor: 'white',
  },
  slideTopRow: {
    flex: 0.90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
  slideIcon: {
    height: 43,
    width: 43,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 43 / 2,
  },
  slideMeta: {
    paddingLeft: 8,
    justifyContent:'center',
    flex: 1,
  },
  slideMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slideBottomRow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 0.50,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 19,
    color: 'white',
  },
  subheader: {
    fontSize: 14,
    color: 'white',
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

});

class CardsBusses extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  openModal() {
    this.refs.modal.open();
  }

  _handlePress() {
    console.log('Pressed!');
    alert("Comming soon!")
  }
  
  render () {
    return (
        <Modal
          style={[styles.modal, styles.modal4]}
          ref={"modal"}
          backdropOpacity={0}
          position={"bottom"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
      
          <View style={style}>
            <View style={styles.slideStyle}>
              <View style={[styles.slideTopRow, { backgroundColor: '#45AAE9' }]}>
                <View style={styles.slideMeta}>
                  <View style={styles.slideMetaRow}>
                    <Text style={styles.header}>Bus Detail</Text>
                    <Text style={styles.header}>Trip Id</Text>
                  </View>

                  <View style={styles.slideMetaRow}>
                    <Text
                      ellipsizeMode='tail'
                      numberOfLines={1}
                      style={[styles.subheader, { flex: 0.9 }]}>{this.props.data.label} {this.props.data.profileid}</Text>
                    <Text style={[styles.subheader, { paddingRight: 4 }]}>{this.props.data.tripid}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.slideBottomRow}>
                <View>
                  <Button
                    style={{fontSize: 18, color: '#45AAE9'}}
                    styleDisabled={{color: '#fff'}}
                    onPress={() => this._handlePress()}>
                    Confirm your trip 
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
    );
  }
}

export default CardsBusses;

