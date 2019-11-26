import React, { Component } from "react";

class Hourly extends Component {
  parsingDate = time => {
    const date = new Date(time * 1000);
    // Get hours from date
    const hours = date.getHours();
    // Get minutes from date
    const minutes = "0" + date.getMinutes();
    // Get seconds from date
    const seconds = "0" + date.getSeconds();
    // Display time in 10:30:23 format
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };

  render() {
    const { data, convertTemp } = this.props;
    console.log("data", data);

    return (
      <div>
        {data.map((hourly, index) => (
          <div key={hourly.time}>
            <div>{console.log(index)}</div>
            <div>Time: {this.parsingDate(hourly.time)}</div>
            <div>Temperature: {convertTemp(hourly.temperature).toFixed(2)}</div>
            <div>
              Real feel: {convertTemp(hourly.apparentTemperature).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Hourly;
