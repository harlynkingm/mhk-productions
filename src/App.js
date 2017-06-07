import React, { Component } from 'react';
import './css/normalize.css';
import './css/skeleton.css';
import VideoData from './VideoData.json';
import Nav from './Nav';
import Videos from './Videos';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videoData: VideoData
    };
  }

  render() {
    return (
      <div>
        <Nav videoData={this.state.videoData.data}/>
        <Videos videoData={this.state.videoData.data}/>
      </div>
    );
  }
}

export default App;
