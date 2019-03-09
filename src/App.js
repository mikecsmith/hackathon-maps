import React, { Component } from 'react';
import { CITIES } from './data/cities'
import { API_KEY } from './utils/key';
import { getDistanceFromLatLonInKm } from './utils/getDistanceFromLatLonInKm'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { mapStyles } from "./theme/mapStyles"

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
    alert(`You were within: ${Math.round(distance)}KM`);
  }

  render() {
    return (
      <div className="App" style={{ height: '100vh', width: '100%' }}>
        <div style={{height: "80%", position: "relative"}}>
          <Map
            zoomControl={false}
            streetViewControl={false}
            mapTypeControl={false}
            google={this.props.google}
            zoom={6}
            initialCenter={{
              lat: 53.8008,
              lng: -1.54
            }}
            onClick={this.mapClicked}
            styles={mapStyles}
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

export default GoogleApiWrapper({ apiKey: API_KEY })(App);
