import React, { Component } from 'react';
import ScrollMonitor from 'react-scrollmonitor';
import play from './img/play.png';

export default class Videos extends Component {

  constructor(props){
    super(props);
    this.renderVideoSection = this.renderVideoSection.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
  }

  renderVideoSection(videoSection, index){
    return(
        <div className="mainSection" key={index}>
          <h1 className="mainSectionTitle">{videoSection.section}</h1>
          {videoSection.videos.map(this.renderVideo)}
        </div>
    )
  }

  renderVideo(video, index){
    return(
      <Video video={video} key={index} changeSelected={this.props.changeSelected}/>
    )
  }

  render() {
    return (
      <div className="videos">
        {this.props.videoData.map(this.renderVideoSection)}
      </div>
    )
  }
}

class Video extends Component {
  //&nbsp;<i>Credits: {this.props.video.credits}</i>
  constructor(props){
    super(props);
    this.state = {
      active: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, parent){
    this.setState({
      active: true
    });
  }

  renderAccolade(accolade, index){
    return (
      <span className="mainVideoAccolade" key={index}>
        {accolade}
      </span>
    )
  }

  render() {
    let passSelected = this.props.changeSelected.bind(this, this.props.video.id, "SCROLL");
    let thumb = '';
    if (this.props.video.thumb){
      thumb = this.props.video.thumb;
    } else {
      let id = this.props.video.url.split('/').pop().split('?')[0];
      thumb = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
    }
    return (
      <ScrollMonitor fullyEnterViewport={passSelected}>
      <div className="mainVideo" id={this.props.video.id}>
        <h4 className="mainVideoTitle">
          {this.props.video.title}
        </h4>
        <p className="mainVideoAccolades">
          {this.props.video.accolades &&
            this.props.video.accolades.map(this.renderAccolade)
          }
        </p>
        <p className="mainVideoDescription">
          {this.props.video.description}
          <br />{this.props.video.credits}
        </p>
        <div className="auto-resizable-iframe">
          <div>
            {this.state.active ? (
              <iframe className="videoEmbed" src={this.props.video.url} frameBorder="0" allowFullScreen title={this.props.video.title}></iframe>
            ) : (
              <div className="videoEmbed videoImage">
                <img className="videoImageImage" src={thumb} alt={this.props.video.title} onClick={this.handleClick} width="100%" height="100%"/>
                <img src={play} className="videoPlay" alt="Play Button" onClick={this.handleClick}/>
              </div>
            )}
          </div>
        </div>
      </div>
      </ScrollMonitor>
    )
  }
};
