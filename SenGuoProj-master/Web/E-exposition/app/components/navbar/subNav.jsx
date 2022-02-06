/**
 * Created by zhaojunbo on 2017/8/30.
 */
import React from 'react';
import {ReactDOM} from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Radium from "radium";
import PropTypes from 'prop-types';

class SubNav extends React.Component {
  constructor (props) {
    super(props);
  }

  showHint (index) {
    if (index === this.props.index) {
      return (
        <div style={subNavStyle.tabHint}/>
      )
    } else {
      return null;
    }
  }

  render () {
    return (
      <div style={subNavStyle.container}>
        <div style={subNavStyle.recommendTab}>
          <Link to={"/"} style={subNavStyle.tabText}>
              <span style={subNavStyle.tabText}>
              RECOMMEND</span>
          </Link>
          {this.showHint(0)}
        </div>
        <div style={subNavStyle.exhibitionTab}>
          <Link to={"/exhibitions"} style={subNavStyle.tabText}>
            <span style={subNavStyle.tabText}>
              EXHIBITION</span>
          </Link>
          {this.showHint(1)}
        </div>
      </div>
    )
  }
}

SubNav.propTypes = {
  showRecommendHint: PropTypes.bool,
  selectExhibition: PropTypes.func,
  selectRecommend: PropTypes.func
};

let subNavStyle = {
  container: {
    width: "300px",
    height: "30px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  recommendTab: {
    float: "left",
    width: "105px",
    height: "30px",
    lineHeight: "20px",
    textAlign: "center"
  },
  exhibitionTab: {
    float: "left",
    width: "105px",
    height: "30px",
    marginLeft: "90px",
    lineHeight: "20px",
    textAlign: "center",
  },
  tabHint: {
    height: "3px",
    marginTop: "7px",
    backgroundColor: "#000000",
    cursor: "pointer",
    userSelect: "none"
  },
  tabText: {
    height: "20px",
    lineHeight: "20px",
    textAlign: "center",
    userSelect: "none",
    textDecoration: "none",
    fontSize: "14px",
    cursor: "pointer",
    color: "#000000",
  }
};

SubNav = Radium(SubNav);

export default SubNav;
