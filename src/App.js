import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';


class App extends Component {

  constructor() {
      super();
      this.state = {
        prices_loaded: true,
        change: '',
        change_color: 'white',
        countdown: ''
      };

      this.updateTime = this.updateTime.bind(this);
  }

  updateTime() {
    let countDownDate = new Date("Dec 9, 2019 03:00:00 UTC").getTime()
    let today = new Date().getTime();
    let distance = countDownDate - today;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.setState({countdown: days});
  }

  componentDidMount() {
    this.updateTime();
    this.interval = setInterval(() => this.updateTime(), 60000);
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
                  <div className="usd">{this.state.countdown}</div>
                  {/*<div className="change">До конца OKR осталось <span style={{color: this.state.change_color}}>{this.state.change}%</span> in 24h</div>*/}
                  <br /> <br />
                </div>
              </div>
            ) : null
          }
      </div>
    );
  }
}

export default App;
