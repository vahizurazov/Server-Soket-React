import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
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

  render() {
    const { response } = this.state;
    console.log(response);

    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          // <p>
          //   The temperature in kharkiv is:{" "}
          //   {this.convertTemp(response.currently.temperature).toFixed(2)} °C
          // </p>
          <div>
            {response.columns.map(col => (
              <div key={col.id}>
                <p>{col.title}</p>
                <p>{col.id}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
export default App;
