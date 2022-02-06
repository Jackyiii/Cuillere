import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";

class Exhibition extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  handleMouseEnter () {
    let newState = {};
    newState.hover = true;
    this.setState(newState);
  }

  handleMouseLeave () {
    let newState = {};
    newState.hover = false;
    this.setState(newState);
  }

  renderShortInfo () {
    if (!this.state.hover) {
      let time = this.props.expStartTime + " - " + this.props.expStopTime;

      return (
        <div key={"ListItem_" + this.props.expId + "_ShortInfo"} style={expItemStyle.infoShort}>
          <div style={expItemStyle.infoShortTakePlace}/>
          <div style={expItemStyle.infoShortContent}>
            <div style={expItemStyle.mainTitleShort}>
              {this.props.expTitle}
            </div>
            <div style={expItemStyle.subTitleShort}>
              {this.props.expAuthor}
            </div>
            <div style={expItemStyle.timeShort}>
              {time}
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  render () {
    let baseStyle = expItemStyle.base;
    baseStyle["background"] = "url(" + this.props.coverImage + ")";

    let time = this.props.expStartTime + " - " + this.props.expStopTime;

    return (
      <Link to={`/exhibition/${this.props.expSection}/${this.props.expId}`} style={{textDecoration: "none",}}>
        <div style={baseStyle}>
          {this.renderShortInfo()}
          <div key={"ListItem_" + this.props.expId + "_FullInfo"}
               style={expItemStyle.infoFull}
               onMouseEnter={(event) => { this.handleMouseEnter() }}
               onMouseLeave={(event) => { this.handleMouseLeave() }}>

            <div style={expItemStyle.mark}>
              <img src={require(this.props.marked ? '../mark.png' : '../mark.png')}/>
            </div>

            <div style={expItemStyle.mainTitleFull}>
              {this.props.expTitle}
            </div>
            <div style={expItemStyle.subTitleFull}>
              {this.props.expAuthor}
            </div>
            <div style={expItemStyle.timeFull}>
              {time}
            </div>
            <div style={expItemStyle.details}>
              <span style={expItemStyle.likeHint}>
                <img src={require('../like.png')}/>
              </span>
              <div style={expItemStyle.countInfo}>
                {this.props.expLikeCount}
              </div>
              <span style={expItemStyle.watchHint}>
                <img src={require('../seen.png')}/>
              </span>
              <div style={expItemStyle.countInfo}>
                {this.props.expSeenCount}
              </div>
              <span style={expItemStyle.share}>
              <img src={require('../share.png')}/>
            </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

Exhibition.propTypes = {
  expSection: PropTypes.string,
  expId: PropTypes.string,
  coverImage: PropTypes.string,
  expTitle: PropTypes.string,
  expAuthor: PropTypes.string,
  expStartTime: PropTypes.string,
  expStopTime: PropTypes.string,
  expSeenCount: PropTypes.number,
  expLikeCount: PropTypes.number,
  marked: PropTypes.bool,
};

let expItemStyle = {
  base: {
    fontFamily: "Avenir-Roman",
    float: "left",
    position: "relative",
    height: "319px",
    width: "237px",
    marginTop: "13px",
    marginBottom: "13px",
    marginLeft: "12px",
    marginRight: "12px",
    color: "#ffffff",
    userSelect: "none",
    cursor: "pointer"
  },
  infoShort: {
    height: "319px",
    width: "237px",
    color: "rgba(255,255,255,1)",
    opacity: "1",
    transition: "all 1000ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      opacity: "0",
      color: "rgba(255,255,255,0)",
    }
  },
  infoFull: {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "319px",
    width: "237px",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
    opacity: "0",
    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      opacity: "1",
      backgroundColor: "rgba(0,0,0,0.46)"
    }
  },
  infoShortTakePlace: {
    height: "204px",
    width: "100%"
  },
  infoShortContent: {
    height: "100px",
    width: "100%",
    paddingTop: "16px",
    backgroundColor: "rgba(165,172,180, 0.61)",
    textAlign: "center"
  },
  mainTitleShort: {
    height: "33px",
    lineHeight: "33px",
    fontSize: "24px"
  },
  subTitleShort: {
    height: "25px",
    lineHeight: "25px",
    fontSize: "18px"
  },
  timeShort: {
    height: "19px",
    lineHeight: "19px",
    marginTop: "7px",
    fontSize: "14px"
  },
  mark: {
    height: "30px",
    width: "30px",
    marginLeft: "187px",
    marginTop: "10px",
  },
  mainTitleFull: {
    height: "33px",
    lineHeight: "33px",
    marginTop: "70px",
    fontSize: "24px"
  },
  subTitleFull: {
    height: "25px",
    lineHeight: "25px",
    fontSize: "18px"
  },
  timeFull: {
    height: "19px",
    lineHeight: "19px",
    marginTop: "7px",
    fontSize: "14px"
  },
  details: {
    height: "22px",
    display: "inline-block",
    marginTop: "60px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  likeHint: {
    float: "left",
    height: "22px",
    width: "22px",
    padding: "3px"
  },
  watchHint: {
    top: "50%",
    transform: "translateY(-50%)",
    position: "relative",
    float: "left",
    height: "22px",
    width: "22px",
    padding: "3px"
  },
  share: {
    float: "left",
    height: "22px",
    width: "22px",
  },
  countInfo: {
    float: "left",
    height: "22px",
    width: "48px",
    textAlign: "left",
    fontSize: "14px"
  }
};

Exhibition = Radium(Exhibition);
export default Exhibition;
