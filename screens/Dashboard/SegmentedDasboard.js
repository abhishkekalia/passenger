'use strict';

import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import InsideDashboard from './InsideDashboard.js';
import Trips from './Trips.js';

class SegmentedDasboard extends Component {
	constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            selectedIndices: [0],
            customStyleIndex: 0,
        }
    }

    handleSingleIndexSelect = (index) => {
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
    }

    handleMultipleIndexSelect = (index) => {
        if (this.state.selectedIndices.includes(index)) {
            this.setState({
                ...this.state,
                selectedIndices: this.state.selectedIndices.filter((i) => i !== index),
            });
        }
        else {
            this.setState({
                ...this.state,
                selectedIndices: [
                    ...this.state.selectedIndices,
                    index,
                ],
            });
        }
    }

    handleCustomIndexSelect = (index) => {
        this.setState({
            ...this.state,
            customStyleIndex: index,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlTab
                    values={["Dashboard","Trips"]}
                    selectedIndex={this.state.customStyleIndex}
                    onTabPress={this.handleCustomIndexSelect}
                    borderRadius={0}
                    tabsContainerStyle={{ height: 50, backgroundColor: '#a9d5d1' }}
                    tabStyle={{ backgroundColor: '#fff', borderWidth: 0 }}
                    activeTabStyle={{ backgroundColor: '#3B5999' }}
                    tabTextStyle={{ color: '#696969', fontWeight: 'bold' }}
                    activeTabTextStyle={{ color: '#fff' }} />
                {this.state.customStyleIndex === 0 &&
                    <InsideDashboard/>}
                {this.state.customStyleIndex === 1 &&
                    <Trips/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        // padding: 10
    },
    tabViewText: {
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 18
    },
    titleText: {
        color: '#444444',
        padding: 20,
        fontSize: 14,
        fontWeight: '500'
    },
    headerText: {
        padding: 8,
        fontSize: 14,
        color: '#444444'
    },
    tabContent: {
        color: '#444444',
        fontSize: 18,
        margin: 24
    },
    Seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24
    }
})

module.exports = SegmentedDasboard;
