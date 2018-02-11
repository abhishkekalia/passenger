import React from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox';

import Places from './Places';

const styles = MapboxGL.StyleSheet.create({
  directionsLine: {
    lineWidth: 3,
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round,
  },
});

class Directions extends React.Component {
  static propTypes = {
    /**
     * Mapbox access token
     */
    accessToken: PropTypes.string.isRequired,

    /**
     * Origin coordinate in [longitude, latitude] format
     */
    origin: PropTypes.arrayOf(PropTypes.number),

    /**
     * Destination coordinate in [longitude, latitude] format
     */
    destination: PropTypes.arrayOf(PropTypes.number),

    stops: PropTypes.arrayOf(PropTypes.array),

    /**
     * Callback that get fired anytime directions are fetched from API.
     */
    onDirectionsFetched: PropTypes.func,

    /**
     * Type of directions that are fetched from API. Possible choices are
     * walking, driving, cycling. Defaults to driving
     */
    type: PropTypes.oneOf([
      'mapbox/driving-traffic',
      'mapbox/walking',
      'mapbox/cycling',
      'mapbox/driving-traffic',
    ]),

    style: PropTypes.object,
  };

  constructor (props) {
    super(props);

    //console.log(JSON.stringify(this.props.stops));

    this.state = {
      mapboxClient: null,
      directions: null,
    };

    this._mapboxClient = null;
  }

  async componentDidMount () {
    this.setState({ mapboxClient: new MapboxClient(this.props.accessToken) }, () => {
      this.fetchDirections(this.props.origin, this.props.destination, this.props.stops);
    });
  }

  componentWillReceiveProps (nextProps) {
    const origin = this.props.origin;
    const dest = this.props.destination;

    if (this.state.directions && (!origin || !dest)) {
      this.setState({ directions: null });
      return;
    }

    const nextOrigin = nextProps.origin;
    const nextDest = nextProps.destination;

    if (this.areCoordinatesEqual(origin, nextOrigin) && this.areCoordinatesEqual(dest, nextDest)) {
      return;
    }

    if (nextOrigin && nextDest) {
      this.fetchDirections(nextOrigin, nextDest, this.props.stops);
    }
  }

  areCoordinatesEqual (c1, c2) {
    if (!c1 || !c2) {
      return false;
    }
    const dLng = Math.abs(c1[0] - c2[0]);
    const dLat = Math.abs(c1[1] - c2[1]);
    return dLng <= 6e-6 && dLat <= 6e-6;
  }

  async fetchDirections (origin, dest, stops) {
    
    var stopArr = stops;
    //stopArr.push([-0.189340, 5.595885])
    //stopArr.push([-0.170682, 5.608908])

    if (!origin || !dest || !this.state.mapboxClient) {
      return;
    }

    const originLatLng = {
      latitude: origin[1],
      longitude: origin[0],
    };

    const destLatLng = {
      latitude: dest[1],
      longitude: dest[0],
    };

    const stopsLatLng = [];
    for(i in stopArr){
      obj = {};
      obj.latitude = stopArr[i][1];
      obj.longitude = stopArr[i][0];
      stopsLatLng.push(obj);
    }

    const latlnArr = [];
    latlnArr.push(originLatLng);
    const finallatlnArr = latlnArr.concat(stopsLatLng);
    finallatlnArr.push(destLatLng);


    const requestOptions = {
      profile: this.props.type,
      geometry: 'polyline',
    };

    let res = null;
    try {
      res = await this.state.mapboxClient.getDirections(finallatlnArr, requestOptions);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    if (res == null) {
      return;
    }

    const directions = res.entity.routes[0];
    if (!directions) {
      return;
    }

    if (this.props.onDirectionsFetched) {
      this.props.onDirectionsFetched(directions);
    }

    this.setState({ directions: directions });
  }

  render () {
    if (!this.state.directions) {
      return null;
    }
    return (
      <MapboxGL.ShapeSource id='mapbox-directions-source' shape={this.state.directions.geometry}>
        <MapboxGL.LineLayer
          id='mapbox-directions-line'
          belowLayerID={Places.UnselectedSymbolID}
          style={[styles.directionsLine, this.props.style]} />
      </MapboxGL.ShapeSource>
    );
  }
}

export default Directions;
