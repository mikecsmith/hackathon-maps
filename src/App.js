import React, { Component } from 'react';
import { CITIES } from './data/cities'
import { API_KEY } from './utils/key';
import { getDistanceFromLatLonInKm } from './utils/getDistanceFromLatLonInKm'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { mapStyles } from "./theme/mapStyles"

class App extends Component {
  state = {
    currentMarker: {},
    currentCity: { ...CITIES[0], index: 0},
    cities: CITIES,
    answered: []
  }

  mapClicked = (mapProps, map, clickEvent) => {
    const clickLocation = clickEvent.latLng.toJSON()
    this.setState({
      currentMarker: clickLocation
    })
  }

  handleSubmit = () => {
    const {currentMarker, currentCity, answered, cities } = this.state
    const { lat: clickedLat, lng: clickedLong } = currentMarker
    const { lat: currentLat, lng: currentLong } = currentCity
    let distance = Math.round(getDistanceFromLatLonInKm(clickedLat, clickedLong, currentLat, currentLong));

    this.setState(prevState => {
      const {currentMarker, currentCity, answered } = prevState
      return {
        answered: [
          ...answered,
          {
            city: currentCity.city,
            coords: currentMarker,
            distance
          }
        ],
        currentCity: {...CITIES[currentCity.index + 1], index: currentCity.index + 1}
      }
    })

    if (cities.length === answered.length) {
      alert(`Final city! You were within: ${distance}KM`);
    } else {
      alert(`You were within: ${distance}KM`);
    }
  };

  render() {
    const {currentMarker, answered } = this.state
    return (
      <div className="App" style={{ height: '98vh', width: '100%' }}>
        <div style={{height: "100px"}}>
          <p>Where is {this.state.currentCity.city}?</p>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div style={{height: "calc(100vh - 120px)", position: "relative"}}>
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
          { currentMarker === {} ? null : <Marker position={currentMarker} />}
          { answered.map( answer => <Marker name={answer.city} position={answer.coords} /> )}
          </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: API_KEY })(App);
