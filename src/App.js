import React, { Component } from "react";
import axios from "axios";

import Legend from "./components/Legend";
import Map from "./components/Map";

import "./App.css";

const initialState = {
  countries_data: [],
  data_loaded: false,
  query: "confirmed",
};
class App extends Component {
  state = initialState;

  componentDidMount() {
    this.fetchCountryData();
  }

  fetchCountryData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://corona-api.com/countries",
      });

      // console.log("country data retrieved", response.data.data);
      const countries_data = this.processData(response.data.data);

      this.setState({
        countries_data,
        data_loaded: true,
      });
    } catch (e) {
      console.log("unable to retrieve data", e);
    }
  };

  processData = (data) => {
    let processed = [];

    for (const d of data) {
      const obj = {
        name: d.name,
        code: d.code,
        coordinates: d.coordinates,
        flag: `https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/${d.code.toLowerCase()}.svg`,
        updated_at: d.updated_at,
        confirmed: d.latest_data.confirmed,
        deaths: d.latest_data.deaths,
        recovered: d.latest_data.recovered,
      };

      processed.push(obj);
    }

    return processed;
  };

  handleSetQuery = (query) => {
    this.setState({
      query,
    });
  };

  render() {
    const { countries_data, data_loaded, query } = this.state;

    return data_loaded ? (
      <div className="root">
        <Legend query={query} handleSelectLegend={this.handleSetQuery} />

        <Map data={countries_data} query={query} />
      </div>
    ) : null;
  }
}

export default App;
