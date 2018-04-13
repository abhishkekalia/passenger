//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';
import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import SnapCarousel from 'react-native-snap-carousel';
import findDistance from '@turf/distance';

const GOOGLE_API_KEY = 'AIzaSyBSMiwipX_H_Dg5p81BeJ7unyGcDeHfmI4'
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class Search extends React.Component {
    static propTypes = {
        /**
        * Array of GeoJSON features that represent all locations on the map
        */
        data: PropTypes.array.isRequired,
        onFindingDirections: PropTypes.func,
        /**
        * Current location on map
        */
        origin: PropTypes.arrayOf(PropTypes.number),

        /**
        * Theme object that represent current theme displayed on map,
        * see Theme.js for more information
        */
        theme: PropTypes.object.isRequired,
        /**
        * Active card index, starts from 0
        */
        activeIndex: PropTypes.number,

        /**
        * Callback for events that change the active index
        */
        onActiveIndexChange: PropTypes.func,

        /**
        * Custom render for Search.
        */
        renderItem: PropTypes.func,

        /**
        * Custom card height
        */
        itemHeight: PropTypes.number,
    };
    static defaultProps = {
        itemHeight: 75,
    };
    constructor (props) {
        super(props);
        this.state = {
            sliderWidth: null,
            itemWidth: null,
        };
        this.renderDefaultItem = this.renderDefaultItem.bind(this);
        this.onScrollViewLayout = this.onScrollViewLayout.bind(this);
        this.onSnapToItem = this.onSnapToItem.bind(this);
    }
    onScrollViewLayout (e) {
        const layout = e.nativeEvent.layout;
        this.setState({ sliderWidth: layout.width, itemWidth: (layout.width + 4) - 50 });
    }
    onSnapToItem (updatedActiveIndex) {
        if (this.props.onActiveIndexChange) {
            this.props.onActiveIndexChange(updatedActiveIndex);
        }
    }
    renderDefaultItem ({ item }) {
        const feature = item;
        const props = feature.properties;

        const style = {
            backgroundColor: 'transparent',
            width: this.state.itemWidth,
            height: this.props.itemHeight,
        };
        let distance = findDistance(
            MapboxGL.geoUtils.makePoint(this.props.origin),
            feature,
            { units: 'miles' },
        );
        distance = Math.round(distance * 10) / 10;

        return (
            <View key={feature.id} style={style}>
                <View style={styles.slideStyle}>
                    <View style={[styles.slideTopRow, { backgroundColor: '#45AAE9'}]}>
                        <View style={styles.slideMeta}>
                            <View style={styles.slideMetaRow}>
                                <Text style={styles.header}>{props.name}</Text>
                                <Text style={styles.header}>{distance}</Text>
                            </View>
                            <View style={styles.slideMetaRow}>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={[styles.subheader, { flex: 0.9 }]}>{props.addressFormatted}</Text>
                                <Text style={[styles.subheader, { paddingRight: 4 }]}>mi</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    get renderItem () {
        return this.props.renderItem ? this.props.renderItem : this.renderDefaultItem;
    }
    renderCarousel () {
        return (
            <GooglePlacesAutocomplete
                placeholder='Destination Address'
                placeholderTextColor='#666'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                enablePoweredByContainer={false}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    //console.log(data);
                    //console.log(details.geometry.location);
                    this.props.onFindingDirections(details.geometry.location);
                }}
                getDefaultValue={() => {
                    return ''; // text input default value
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: GOOGLE_API_KEY,
                    language: 'en', // language of the results
                    //types: '(cities)', // default: 'geocode'
                    components: 'country:gh'
                }}
                styles={{
                    description: {
                        fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    }
                }}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                //currentLocationLabel="Current location"
                //nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                //GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    //}}
                    /*GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}*/

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                //predefinedPlaces={[homePlace, workPlace]}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={() => <Text></Text>}
                renderRightButton={() => <Text></Text>}
                />
        );
    }
    render () {
        return (
            <ScrollView
                style={styles.scrollView}>
                {this.renderCarousel()}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    scrollView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 80,
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
        flex: 1,
        borderRadius: 10,
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
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 22,
        flex: 0.40,
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
    }
});
export default Search;
