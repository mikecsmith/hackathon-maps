import React, { Component } from "react";
import { API_KEY } from "./utils/key";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { mapStyles } from "./theme/mapStyles";
class App extends Component {
  mapClicked(mapProps, map, clickEvent) {
    console.log("mapProps", mapProps);
    console.log("map", map);
    console.log("clickEvent", clickEvent);
    console.log("clickEvent", clickEvent.latLng.toJSON());
  }

  render() {
    return (
      <div className="App" style={{ height: "100vh", width: "100%" }}>
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
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: API_KEY })(App);
