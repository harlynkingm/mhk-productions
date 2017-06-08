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
      videoData: VideoData,
      selected: "1"
    };
    this.scrolling = false;
    this.changeSelected = this.changeSelected.bind(this);
  }

  changeSelected(newSelected, source){
    //console.log("changed to " + newSelected);
    let parent = this;
    if (source === "NAV" & !this.scrolling){
      parent.scrolling = true;
      parent.setState({
        selected: newSelected
      });
      window.setTimeout(function(){
        parent.scrolling = false;
      }, 400);
    } else if (!this.scrolling) {
      parent.setState({
        selected: newSelected
      });
    }
  }

  render() {
    return (
      <div>
        <Nav videoData={this.state.videoData.data} selected={this.state.selected} changeSelected={this.changeSelected}/>
        <Videos videoData={this.state.videoData.data} changeSelected={this.changeSelected}/>
      </div>
    );
  }
}

export default App;
