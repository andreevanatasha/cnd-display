import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';


class App extends Component {
  constructor() {
      super();
      this.state = {
          eth_price: '',
      };
  }

  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/cindicator/', {header: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let price = data[0]['price_usd'];
        console.log(price);
        this.setState({eth_price: price});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.eth_price}</h1>
        </header>
      </div>
    );
  }
}

export default App;
