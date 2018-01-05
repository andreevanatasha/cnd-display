import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';


class App extends Component {
  constructor() {
      super();
      this.state = {
          usd_price: '',
          btc_price: '',
          eth_price: ''
      };

      this.updatePrice = this.updatePrice.bind(this);
  }

  updatePrice() {
    fetch('https://api.coinmarketcap.com/v1/ticker/cindicator/', {header: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        let usd = data[0]['price_usd'];
        let btc = data[0]['price_btc'];
        let mBTC = btc * 1000;
        mBTC = mBTC.toFixed(6);
        //console.log(usd);
        this.setState({usd_price: usd, btc_price: mBTC});
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/', {header: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => response.json())
    .then((data) => {
        let usd = data[0]['price_usd'];
        console.log(usd);
        let eth = parseFloat(this.state.usd_price) / usd;
        let finney = eth.toFixed(9) * 1000;
        console.log(finney);
        this.setState({eth_price: finney});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.updatePrice();
    this.interval = setInterval(() => this.updatePrice(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.usd_price} USD</h1>
          <h1 className="App-title">{this.state.btc_price} mBTC</h1>
          <h1 className="App-title">{this.state.eth_price} mETH</h1>
        </header>
      </div>
    );
  }
}

export default App;
