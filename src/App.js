import React, { Component } from 'react';
import { CITIES } from './data/cities'
import { API_KEY } from './utils/key';
import { getDistanceFromLatLonInKm } from './utils/getDistanceFromLatLonInKm'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class App extends Component {
  state = {
    currentMarker: {},
    currentCity: CITIES[0],
    cities: CITIES
  }

  

  mapClicked = (mapProps, map, clickEvent) => {
    const clickLocation = clickEvent.latLng.toJSON()
    this.setState({
      currentMarker: clickLocation
    })
  }

  handleSubmit = () => {
    const { lat: clickedLat, lng: clickedLong } = this.state.currentMarker
    const { lat: currentLat, lng: currentLong } = this.state.currentCity
    let distance = getDistanceFromLatLonInKm(clickedLat, clickedLong, currentLat, currentLong);
    alert(distance);
  }

  render() {
    return (
      <div className="App" style={{ height: '100vh', width: '100%' }}>
        <div style={{height: "80%", position: "relative"}}>
          <Map google={this.props.google} zoom={6} initialCenter={{
              lat: 53.8008,
              lng: -1.54
            }}
            style={{height: "100%"}}
            styles={styles}
            onClick={this.mapClicked}
          >
          { this.state.currentMarker === {} ? null : <Marker position={this.state.currentMarker} />}
          </Map>
        </div>
        <div style={{height: "30px"}}>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const styles = [
  {
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
]

export default GoogleApiWrapper({apiKey: API_KEY, styles: styles})(App);
