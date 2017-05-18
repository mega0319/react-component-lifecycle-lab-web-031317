import React from 'react';
import TweetWall from './TweetWall';

import { getTweets }from '../lib/mockAPI';
import { initialize, update } from '../lib/chart';

require('fbjs/lib/ExecutionEnvironment').canUseDOM = true

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      latestTweets: []
    };
    initialize();
    this.updateChart = this.updateChart.bind(this);
    this.fetchTweets = this.fetchTweets.bind(this);
  }

  // TODO: componentWillMount()
  componentWillMount(){
    this.fetchTweets()
  }
  // TODO: componentDidMount()
  componentDidMount(){
    this.startInterval()
  }
  // TODO: componentWillUnmount()
  componentWillUnmount(){
    this.cleanUpInterval(this.interval)
  }
  // TODO: componentDidUpdate()
  componentDidUpdate(){
    this.updateChart(this.state.latestTweets.length)
  }

  updateChart(numTweets) {
    update(numTweets);
  }

  startInterval() {
    this.interval = setInterval(this.fetchTweets, 2000);
  }

  cleanUpInterval() {
    clearInterval(this.interval);
  }

  fetchTweets() {
    const newTweets = getTweets();
    this.setState({
      latestTweets: newTweets
    });
  }

  render() {
    return (
      <div><TweetWall newTweets={this.state.latestTweets} /></div>
    )
  }
}
