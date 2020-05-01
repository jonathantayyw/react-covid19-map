import React, { Component } from "react";

class Legend extends Component {
  handleSelectLegend = (label) => {
    this.props.handleSelectLegend(label);
  };

  render() {
    const { query } = this.props;

    return (
      <div className="legend">
        <div
          className="legend-field"
          onClick={this.handleSelectLegend.bind(this, "confirmed")}
        >
          <div
            className={`legend-icon ${
              query === "confirmed" ? "legend-icon-active" : ""
            }`}
            style={{
              backgroundColor: "rgba(5, 155, 247, 0.7)",
            }}
          />
          <div
            className={`legend-label ${
              query === "confirmed" ? "legend-label-active" : ""
            }`}
          >
            Confirmed
          </div>
        </div>

        <div
          className="legend-field"
          onClick={this.handleSelectLegend.bind(this, "deaths")}
        >
          <div
            className={`legend-icon ${
              query === "deaths" ? "legend-icon-active" : ""
            }`}
            style={{
              backgroundColor: "rgba(233,30,99,0.7)",
            }}
          />
          <div
            className={`legend-label ${
              query === "deaths" ? "legend-label-active" : ""
            }`}
          >
            Deaths
          </div>
        </div>

        <div
          className="legend-field"
          onClick={this.handleSelectLegend.bind(this, "recovered")}
        >
          <div
            className={`legend-icon ${
              query === "recovered" ? "legend-icon-active" : ""
            }`}
            style={{
              backgroundColor: "rgba(53,211,156,0.7)",
            }}
          />
          <div
            className={`legend-label ${
              query === "recovered" ? "legend-label-active" : ""
            }`}
          >
            Recovered
          </div>
        </div>
      </div>
    );
  }
}

export default Legend;
