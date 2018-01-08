import React, { Component } from 'react';
import logo from './logo.png';
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
        change_color: 'white',
        change_1h: '',
        change_1h_color: 'white'
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
        let change_1h = data[0]['percent_change_1h'];
        let mBTC = btc * 1000;
        mBTC = mBTC.toFixed(6);
        //console.log(usd);

        if ( change >= 0 ) {
          this.setState({change_color: 'green'});
        } else {
          this.setState({change_color: 'red'});
        };

        if ( change_1h >= 0 ) {
          this.setState({change_1h_color: 'green'});
        } else {
          this.setState({change_1h_color: 'red'});
        };

        this.setState({usd_price: usd, btc_price: mBTC, change: change, change_1h: change_1h});
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
    this.interval = setInterval(() => this.updatePrice(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
          {
            this.state.prices_loaded ? (
              <div>
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <div className="prices">
                  <div className="usd">${this.state.usd_price} </div>
                  <div className="change"><span style={{color: this.state.change_1h_color}}>{this.state.change_1h}%</span> in 1h || <span style={{color: this.state.change_color}}>{this.state.change}%</span> in 24h</div>
                  <br /> <br />
                  <div className="prices.additional">
                    <div className="btc">{this.state.btc_price} mBTC</div>
                    <div className="btc">{this.state.eth_price} mETH</div>
                  </div> 
                </div>
              </div>
            ) : null
          }
      </div>
    );
  }
}

export default App;
