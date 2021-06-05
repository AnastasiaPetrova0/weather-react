import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      zipcode: 10003,
      temp: 20,
      name: "Lisbon",
      humidity: 50,
      sunrise: 7,
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ zipcode: this.state.value });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode}&appid=4398ca985b90b09bb540560e9dd6b60e`
    )
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          name: res.name,
          temp: Math.round((parseInt(res.main.temp - 273) * 9) / 5 + 32),
        })
      );
    if (this.state.temp > 80) {
      document.getElementById("temp").style.color = "red";
    } else if (this.state.temp < 50) {
      document.getElementById("temp").style.color = "blue";
    }
  }
  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <h1>Enter zip and press enter</h1>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
          </form>
          <h1>City: {this.state.name}</h1>
          <h2 id="temp">Temp: {this.state.temp} &#x2109;</h2>
          <h2>Humidity: {this.state.humidity}%</h2>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

