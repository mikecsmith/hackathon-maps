import React, { Component } from "react";
import { CITIES } from "./data/cities";
import { API_KEY } from "./utils/key";
import { getDistanceFromLatLonInKm } from "./utils/getDistanceFromLatLonInKm";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { mapStyles } from "./theme/mapStyles";
import { createGlobalStyle } from "styled-components";
import GuiWrapper from "./components/GuiWrapper";
import "normalize.css";
import "tachyons/css/tachyons.css";

class App extends Component {
  state = {
    currentMarker: {},
    currentCity: { ...CITIES[0], index: 0 },
    cities: CITIES,
    answered: []
  };

  mapClicked = (mapProps, map, clickEvent) => {
    const clickLocation = clickEvent.latLng.toJSON();
    this.setState({
      currentMarker: clickLocation
    });
  };

  handleSubmit = () => {
    const { currentMarker, currentCity, answered, cities } = this.state;
    const { lat: clickedLat, lng: clickedLong } = currentMarker;
    const { lat: currentLat, lng: currentLong } = currentCity;
    let distance = Math.round(
      getDistanceFromLatLonInKm(
        clickedLat,
        clickedLong,
        currentLat,
        currentLong
      )
    );

    this.setState(prevState => {
      const { currentMarker, currentCity, answered } = prevState;
      return {
        answered: [
          ...answered,
          {
            city: currentCity.city,
            coords: currentMarker,
            distance
          }
        ],
        currentCity: {
          ...CITIES[currentCity.index + 1],
          index: currentCity.index + 1
        }
      };
    });

    if (cities.length === answered.length) {
      alert(`Final city! You were within: ${distance}KM`);
    } else {
      alert(`You were within: ${distance}KM`);
    }
  };

  render() {
    const {
      answered,
      currentCity: { city }
    } = this.state;
    const GlobalStyle = createGlobalStyle`
    html, body {
      width: 100%;
      height: 100%;
      @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono');
      font-family: 'IBM Plex Mono'
    }
  `;

    return (
      <div
        className="App"
        style={{ height: "100vh", width: "100%", position: "relative" }}
      >
        <GuiWrapper
          className="w50"
          answered={answered}
          city={city}
          handleSubmit={this.handleSubmit}
        />
        <GlobalStyle />
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
          {this.state.currentMarker === {} ? null : (
            <Marker position={this.state.currentMarker} />
          )}
          {answered.map(answer => (
            <Marker name={answer.city} position={answer.coords} />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: API_KEY })(App);
