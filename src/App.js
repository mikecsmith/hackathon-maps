import React, { Component } from "react";
import { CITIES } from "./data/cities";
import { API_KEY } from "./utils/key";
import { getDistanceFromLatLonInKm } from "./utils/getDistanceFromLatLonInKm";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { mapStyles } from "./theme/mapStyles";
import styled, { createGlobalStyle } from "styled-components";
import "normalize.css";
import "tachyons/css/tachyons.css";

class App extends Component {
  state = {
    currentMarker: {},
    currentCity: CITIES[0],
    cities: CITIES
  };

  mapClicked = (mapProps, map, clickEvent) => {
    const clickLocation = clickEvent.latLng.toJSON();
    this.setState({
      currentMarker: clickLocation
    });
  };

  handleSubmit = () => {
    const { lat: clickedLat, lng: clickedLong } = this.state.currentMarker;
    const { lat: currentLat, lng: currentLong } = this.state.currentCity;
    let distance = getDistanceFromLatLonInKm(
      clickedLat,
      clickedLong,
      currentLat,
      currentLong
    );
    alert(`You were within: ${Math.round(distance)}KM`);
  };

  render() {
    const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono');
    font-family: 'IBM Plex Mono'    
  }
`;

    const Gui = styled.div.attrs({
      className: "flex absolute top0 left0 absolute top0 z-1"
    })``;
    const Results = styled.div.attrs({
      className: "h50 bg-green w50 white ma2 pa3 z-1 "
    })``;

    return (
      <div
        className="App"
        style={{ height: "100vh", width: "100%", position: "relative" }}
      >
        <Gui>
          <Results>Where the @*!!! is London?</Results>
        </Gui>

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
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: API_KEY })(App);
