import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Radium from "radium";
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class OneEvent extends React.Component {
  render() {
    if (this.props.eventLeft) {
      return (
        <div style={oneEventInfoStyle.base}>
          <div style={oneEventInfoStyle.titleLeft}>
            {this.props.eventTitle}
          </div>
          <div style={oneEventInfoStyle.detailLeft}>
            {this.props.eventPublisher + " " + this.props.eventTime}
          </div>
          <div style={oneEventInfoStyle.abstractLeft}>
            {this.props.eventAbstract}
          </div>
        </div>
      )
    } else {
      return (
        <div style={oneEventInfoStyle.base}>
          <div style={oneEventInfoStyle.titleRight}>
            {this.props.eventTitle}
          </div>
          <div style={oneEventInfoStyle.detailRight}>
            {this.props.eventPublisher + " " + this.props.eventTime}
          </div>
          <div style={oneEventInfoStyle.abstractRight}>
            {this.props.eventAbstract}
          </div>
        </div>
      )
    }
  }
}

OneEvent.propTypes = {
  eventLeft: PropTypes.bool,
  eventTitle: PropTypes.string,
  eventTime: PropTypes.string,
  eventPublisher: PropTypes.string,
  eventAbstract: PropTypes.string
};

let oneEventInfoStyle = {
  base: {
    width: "100%",
    height: "180px",
    color: "#3a3a3a"
  },
  titleLeft: {
    height: "20px",
    marginTop: "30px",
    marginLeft: "25px",
    textAlign: "left"
  },
  detailLeft: {
    height: "14px",
    fontSize: "12px",
    marginTop: "10px",
    marginLeft: "25px",
    textAlign: "left"
  },
  abstractLeft: {
    height: "60px",
    fontSize: "12px",
    marginTop: "10px",
    marginLeft: "25px",
    textAlign: "left"
  },
  titleRight: {
    height: "20px",
    marginTop: "30px",
    marginRight: "25px",
    textAlign: "right"
  },
  detailRight: {
    height: "14px",
    fontSize: "12px",
    marginTop: "10px",
    marginRight: "25px",
    textAlign: "right"
  },
  abstractRight: {
    height: "60px",
    fontSize: "12px",
    marginTop: "10px",
    marginRight: "25px",
    textAlign: "right"
  }
};

OneEvent = Radium(OneEvent);
export default OneEvent;
