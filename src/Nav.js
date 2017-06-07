import React, { Component } from 'react';
import $ from 'jquery';
import Scrollchor from 'react-scrollchor';

export default class Nav extends Component {

  constructor(props){
    super(props);
    this.state = {
      sliding: false
    };
    this.renderSections = this.renderSections.bind(this);
    this.renderVideos = this.renderVideos.bind(this);
    this.setupJquery = this.setupJquery.bind(this);
  }

  componentDidMount() {
    this.setupJquery();
  }

  componentDidUpdate() {
    this.setupJquery();
  }

  setupJquery() {
    // $(".sectionTitle").click(function(){
    //   $(this).next().slideToggle(200, "linear");
    // });
    let parent = this;
    $(".sectionTitle").mouseenter(function(){
      if (!parent.state.sliding && !$(this).next().hasClass("sectionVideosDown")){
        parent.setState({
          sliding: true
        });
        $(".sectionVideosDown").slideUp(200, function(){
          $(this).removeClass("sectionVideosDown");
        });
        $(this).next().slideDown(200, function(){
          parent.setState({
            sliding: false
          });
        });
        $(this).next().addClass("sectionVideosDown");
      }
    });
  }

  renderSections(section, index) {
    return(
      <div className="section" key={index}>
        <p className="sectionTitle">{section.section}</p>
        <div className="sectionVideos">
          {section.videos.map(this.renderVideos)}
        </div>
      </div>
    )
  }

  renderVideos(video, index) {
    return(
      <Scrollchor to={video.id} key={index}>
        <p className="videoTitle">{video.title}</p>
      </Scrollchor>
    )
  }

  render() {
    return (
      <div className="nav">
        <h5 className="pageTitle">MHK Productions</h5>
        {this.props.videoData.map(this.renderSections)}
      </div>
    )
  }
}
