/**
 * Created by zhaojunbo on 2017/8/30.
 */
import React from 'react';
import {ReactDOM} from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Radium from "radium";
import PropTypes from 'prop-types';

class NavBar extends React.Component {
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
        <div style={subNavStyle.tab}>
          <div style={subNavStyle.tabText}
               onClick={(event) => {
                 event.stopPropagation();
                 this.props.componentToGo(0)
               }}>
            登录
          </div>
          {this.showHint(0)}
        </div>
        <div style={subNavStyle.tab}>
          <div style={subNavStyle.tabText}
               onClick={(event) => {
                 event.stopPropagation();
                 this.props.componentToGo(1)
               }}>
            注册
          </div>
          {this.showHint(1)}
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  index: PropTypes.number,
  componentToGo: PropTypes.func
};

let subNavStyle = {
  container: {
    display: "inline-block"
  },
  tab: {
    float: "left",
    marginLeft: "35px",
    marginRight: "35px",
    lineHeight: "20px",
    textAlign: "center"
  },
  tabHint: {
    height: "3px",
    marginTop: "7px",
    backgroundColor: "#000000",
    cursor: "pointer",
    userSelect: "none"
  },
  tabText: {fontFamily: "PingFangSC-Regular",
    fontSize: "15px",
    color: "#000000",

    height: "20px",
    lineHeight: "20px",
    textAlign: "center",
    userSelect: "none",
    textDecoration: "none",
    cursor: "pointer",
  }
};

NavBar = Radium(NavBar);

export default NavBar;
