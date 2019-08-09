import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor() {
      super();
      this.state = {
        prices_loaded: true,
        usd_price: '',
        change: '',
        change_color: 'white',
        countdown: ''
      };

      this.updateTime = this.updateTime.bind(this);
  }

  async updatePrice() {
    const API_KEY = process.env.REACT_APP_COINMARKETCAP_API_KEY;
    console.log(API_KEY)
    await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=CND', {headers: {'Access-Control-Allow-Origin': '*', 'X-CMC_PRO_API_KEY':API_KEY}})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let usd = data['data']['CND']['quote']['USD']['price'];
        let change = data['data']['CND']['quote']['USD']['percent_change_7d'];
        usd = usd.toFixed(4);
        change = change.toFixed(1);
        console.log(usd);

        if ( change >= 0 ) {
          this.setState({change_color: '#3EECC8'});
        } else {
          this.setState({change_color: '#FF4B8C'});
        };

        this.setState({usd_price: usd, change: change});
    })
    .catch((error) => {
      console.error(error);
    });

    this.setState({prices_loaded: true});
  }

  updateTime() {
    let countDownDate = new Date("Dec 26, 2019 03:00:00 UTC").getTime()
    let today = new Date().getTime();
    let distance = countDownDate - today;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.setState({countdown: days});
  }

  componentDidMount() {
    this.updateTime();
    this.updatePrice();
    this.interval = setInterval(() => function () {
        this.updateTime();
        this.updatePrice();
    }, 600000);
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
                <div className="row">
                  <div className="column">
                     <div className="countdown">{this.state.countdown}</div>
                  </div>
                  <div className="column">
                  {/*<div className="change">${this.state.usd_price} <span style={{color: this.state.change_color}}>{this.state.change}%</span> </div>*/}
                  <div className="usd_price">${this.state.usd_price}<span className="change" style={{color: this.state.change_color}}> {this.state.change}%</span> </div>
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
