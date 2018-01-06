import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';


class App extends Component {
  constructor() {
      super();
      this.state = {
        usd_price: '',
        btc_price: '',
        eth_price: '',
        prices_loaded: false,
        change: '',
        change_color: 'white'
      };

      this.updatePrice = this.updatePrice.bind(this);
  }

  async updatePrice() {
    await fetch('https://api.coinmarketcap.com/v1/ticker/cindicator/', {header: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        let usd = data[0]['price_usd'];
        let btc = data[0]['price_btc'];
        let change = data[0]['percent_change_24h'];
        let mBTC = btc * 1000;
        mBTC = mBTC.toFixed(6);
        //console.log(usd);

        if ( change >= 0 ) {
          this.setState({change_color: 'green'});
        } else {
          this.setState({change_color: 'red'});
        };

        this.setState({usd_price: usd, btc_price: mBTC, change: change});
    })
    .catch((error) => {
      console.error(error);
    });

    await fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/', {header: {'Access-Control-Allow-Origin': '*'}})
    .then((response) => response.json())
    .then((data) => {
        let usd = data[0]['price_usd'];
        console.log(usd);
        let eth = parseFloat(this.state.usd_price) / usd * 1000;
        let finney = eth.toFixed(6);
        console.log(finney);
        this.setState({eth_price: finney});
    })
    .catch((error) => {
      console.error(error);
    });

    this.setState({prices_loaded: true});
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
          {
            this.state.prices_loaded ? (
              <div>
                <h1 className="App-title">$ {this.state.usd_price} <span style={{color: this.state.change_color}}>{this.state.change}%</span></h1>
                <h1 className="App-title">{this.state.btc_price} mBTC</h1>
                <h1 className="App-title">{this.state.eth_price} mETH</h1> 
              </div>
            ) : null
          }
        </header>
      </div>
    );
  }
}

export default App;
