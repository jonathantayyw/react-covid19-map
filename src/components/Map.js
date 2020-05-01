import React, { Component } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

import Tooltip from "./Tooltip";

// Input your token here
const TOKEN =
  "pk.eyJ1Ijoiam9udGF5eXciLCJhIjoiY2s4aXcwbnA0MGFqYjNscDZicm9haXA3cCJ9.rI3D6Y4ZETQnYukX9RCOow";

const initialState = {
  map_data: [],
  tooltip: null,
  viewport: {
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 2,
  },
};
class Map extends Component {
  state = initialState;

  componentDidMount() {
    this.prepareData();
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (query !== prevProps.query) {
      this.prepareData();
    }
  }

  prepareData = () => {
    const { colors, data, query } = this.props;

    const map_data = data.filter((f) => f[query] > 0);
    const counts = map_data.map((e) => e[query]);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);
    const diff = maxCount - minCount;
    const div = diff * 0.2;
    const div2 = diff * 0.8;

    for (const d of map_data) {
      if (d[query] >= div2) {
        d.size = 55;
      } else if (d[query] < div2 && d[query] >= div) {
        d.size = 35;
      } else {
        d.size = 15;
      }

      switch (query) {
        case "confirmed":
          d.color = colors[0];
          break;
        case "deaths":
          d.color = colors[1];
          break;
        case "recovered":
          d.color = colors[2];
          break;
        default:
          d.color = colors[0];
      }
    }

    this.setState({
      map_data,
    });
  };

  handleCloseTooltip = () => {
    this.setState({ tooltip: null });
  };

  render() {
    const { map_data, tooltip, viewport } = this.state;
    const { fields } = this.props;

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {map_data.map((country, index) => {
          const longitude = Number(country.coordinates.longitude);
          const latitude = Number(country.coordinates.latitude);

          return (
            <Marker key={index} longitude={longitude} latitude={latitude}>
              <div
                className="map-marker"
                style={{
                  backgroundColor: country.color,
                  height: country.size,
                  width: country.size,
                }}
                onClick={() => this.setState({ tooltip: country })}
              />
            </Marker>
          );
        })}

        {tooltip && (
          <Tooltip
            details={tooltip}
            fields={fields}
            handleCloseTooltip={this.handleCloseTooltip}
          />
        )}

        <div className="map-nav">
          <NavigationControl
            onViewportChange={(viewport) => this.setState({ viewport })}
          />
        </div>
      </ReactMapGL>
    );
  }
}

export default Map;
