import React, { Component } from 'react';
import $ from 'jquery';
import Scrollchor from 'react-scrollchor';
import menu from './img/menu.png';

export default class Nav extends Component {

  constructor(props){
    super(props);
    this.sliding = false;
    this.state = {
      menuOpen: false
    }
    this.renderSections = this.renderSections.bind(this);
    this.renderVideos = this.renderVideos.bind(this);
    this.setupJquery = this.setupJquery.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleIfOpen = this.toggleIfOpen.bind(this);
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
    $(".nav").bind('touchmove', function(e){
      e.preventDefault();
    });
    let parent = this;
    $(".sectionTitle").click(function(){
      parent.openSection($(this).next(), parent);
    });
  }

  openSection(section, parent){
    if (!section.hasClass("sectionVideosDown")){
      $(".sectionVideosDown").slideUp(200, function(){
        $(this).removeClass("sectionVideosDown");
      });
      section.slideDown(200);
      section.addClass("sectionVideosDown");
    }
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

  selectVideo(id){
    this.props.changeSelected(id, "NAV");
    this.toggleIfOpen();
  }

  renderVideos(video, index) {
    let passSelected = this.selectVideo.bind(this, video.id);
    var classes = "videoTitle";
    if (video.id === this.props.selected){
      classes += " active";
      this.openSection($(".vid" + video.id).parent(), this);
    }
    return(
      <Scrollchor to={video.id} key={index} className={"vid" + video.id} animate={{offset: -100}}>
        <p className={classes} onClick={passSelected}>{video.title}</p>
      </Scrollchor>
    )
  }

  toggleMenu() {
    $(".menuIcon").toggleClass("menuIconActive");
    $(".nav").toggleClass("navActive");
    $("body").toggleClass("noScroll");
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  toggleIfOpen(){
    if (this.state.menuOpen){
      this.toggleMenu();
    }
  }

  render() {
    return (
      <div className="nav">
        <img src={menu} className="menuIcon" alt="Menu" onClick={this.toggleMenu}/>
        <Scrollchor to="">
          <h5 className="pageTitle" onClick={this.toggleIfOpen}>
            MHK Productions
          </h5>
        </Scrollchor>
        {this.props.videoData.map(this.renderSections)}
      </div>
    )
  }
}
