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
  constructor() {
    super()
    this.initialState = {
      currentMarker: {},
      disabled: true,
      currentCity: { ...CITIES[0], index: 0 },
      cities: CITIES,
      answered: [],
      finished: false
    }
    this.state = {...this.initialState}
  }

  resetState = () => {
    this.setState(this.initialState)
  }

  mapClicked = (mapProps, map, clickEvent) => {
    const clickLocation = clickEvent.latLng.toJSON();
    this.setState({
      currentMarker: clickLocation,
      disabled: false
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

    let finished = false;

    if (answered.length === cities.length-1) {
      finished = true;
    }

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
        },
        currentMarker: {},
        finished: finished,
        disabled: true
      };
    });
  };

  render() {
    const {
      answered,
      currentCity: { city },
      finished,
      currentMarker
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
          finished={finished}
          disabled={this.state.disabled}
          resetState={this.resetState}
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
          {currentMarker === {} ? null : (
            <Marker position={currentMarker} />
          )}
          {answered.map(answer => (
            <Marker name={answer.city} position={answer.coords} icon={{url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}} />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: API_KEY })(App);
