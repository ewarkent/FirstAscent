import React, {Component} from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import * as keys from '../constants/keys';

class PostMap extends Component {
  static defaultProps = {
    title: 'Cool Mountain',
    GpsCoords: { lat: 37.746495, lng: -119.533156 }
  }
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  
  render() {
    const style = {
      width: '50vw',
      height: '350px',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    const GpsCoords = {
      lat: this.props.GpsCoordsLat, 
      lng: this.props.GpsCoordsLng
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 16 }
        //initialCenter = {{ lat: 37.746495, lng: -119.533156 }}
        initialCenter = {GpsCoords}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { this.props.title }
          position = {GpsCoords}
          //name = { 'mountain' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
          content = { this.props.title }
        >  
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: (keys.GOOGLE_MAPS_KEY)
})(PostMap)