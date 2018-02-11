import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

const styles = MapboxGL.StyleSheet.create({
  icon: {
    iconAllowOverlap: true,
    iconSize: Platform.OS === 'android' ? 0.20 : 0.15,
  },
});

class Busses extends React.Component {
  static SelectedSymbolID = 'bus-locator-selected-symbol';
  static UnselectedSymbolID = 'bus-locator-places-unselected-symbols';

  static propTypes = {
    /**
     * busCollection of points that we want to appear on the map.
     */
    busCollection: PropTypes.object.isRequired,

    /**
     * Active ID of feature
     */
    //activeID: PropTypes.any,

    /**
     * Active feature index
     */
    //activeIndex: PropTypes.number,

    /**
     * Override any default styles on the inactive marker layer
     */
    style: PropTypes.any,

    /**
     * Override any default styles on the active marker layer
     */
    //activeStyle: PropTypes.any,
  };

  static defaultProps = {
    //activeIndex: 0,
  };

  constructor (props) {
    super(props);

    //alert(JSON.stringify(this.props.busCollection))
    this.state = {
      //activeIndex: props.activeIndex,
      //activeID: props.activeID,
    };
  }

  componentWillReceiveProps (nextProps) {
    //if (this.state.activeIndex !== nextProps.activeIndex) {
      this.setState({
        //activeIndex: nextProps.activeIndex,
        //activeID: this.props.busCollection.features[nextProps.activeIndex].id,
      });
    //}
  }

  render () {
    if (!this.props.busCollection) {
      return null;
    }
    return (
      <MapboxGL.ShapeSource id='busses' shape={this.props.busCollection} >
           <MapboxGL.SymbolLayer
            id={Busses.UnselectedSymbolID}
            //filter={['!=', '$id', this.state.activeID]}
            style={[styles.icon, this.props.style]} />
        </MapboxGL.ShapeSource>

    
    );
  }
}

export default Busses;
