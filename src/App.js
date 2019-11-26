import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import Hourly from "./components/Hourly";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
      // params: { v: "3.exp", key: "AIzaSyCa8ClZ8ExSWNpIcpd3CKC24KkbtLFrjWU" }
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
  convertTemp = temp => {
    return (5 / 9) * (temp - 32);
  };
  // onMapCreated(map) {
  //   map.setOptions({
  //     disableDefaultUI: true
  //   });
  // }

  render() {
    const { response } = this.state;
    console.log(response);

    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          <div>
            <p>Timezone: {response.timezone}</p>
            <p>
              The temperature in Kharkiv is:{" "}
              {this.convertTemp(response.currently.temperature).toFixed(2)} °C
            </p>
            <Hourly
              data={response.hourly.data}
              convertTemp={this.convertTemp}
            />
            {/* <div>{this.parsingDate(response.hourly.data[0].time)}</div> */}
          </div>
        ) : (
          // <div>
          //   {response.columns.map(col => (
          //     <div key={col.id}>
          //       <p>{col.title}</p>
          //       <p>{col.id}</p>
          //     </div>
          //   ))}
          // </div>
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
export default App;
