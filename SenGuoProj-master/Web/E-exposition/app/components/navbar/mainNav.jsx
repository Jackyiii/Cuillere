/**
 * Created by zhaojunbo on 2017/8/30.
 */
import React from 'react';
import {ReactDOM} from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Radium from "radium";
import PropTypes from 'prop-types';
import SubNav from "./subNav";
import SearchBtn from "./searchBtn";
import LoginArea from "./loginArea"

class MainNav extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div style={[mainNavStyle.base, {backgroundImage: this.props.backgroundImage}]}>
        <div style={mainNavStyle.tools}>
          <div style={mainNavStyle.search}>
            <SearchBtn/>
          </div>
          <div style={mainNavStyle.login}>
            <LoginArea/>
          </div>
        </div>

        <div style={mainNavStyle.mainTitle}>
          OUILINE
        </div>
        <div style={mainNavStyle.subTitle}>
          ONLINE EXHIBITION
        </div>

        <div style={{paddingTop: "62px"}}>
          <SubNav index={0}/>
        </div>

        <div style={mainNavStyle.avatar}/>
      </div>
    )
  }
}

MainNav.propTypes = {
  backgroundImage: PropTypes.string,
};

let mainNavStyle = {
  base: {
    fontFamily: "Avenir-Heavy",
    height: "280px",
    backgroundSize: "cover"
  },
  tools: {
    paddingTop: "47px",
    height: "25px",
    fontSize: "18px",
    color: "#000000",
  },
  search: {
    float: "left",
    height: "30px",
    marginLeft: "60px",
    textAlign: "left"
  },
  login: {
    float: "right",
    height: "30px",
    marginRight: "60px",
    textAlign: "right"
  },
  mainTitle: {
    fontSize: "36px",
    height: "49px",
    lineHeight: "40px",
    paddingTop: "9px",
    textAlign: "center"
  },
  subTitle: {
    fontSize: "25px",
    height: "34px",
    paddingTop: "4px",
    lineHeight: "25px",
    textAlign: "center"
  },
  avatar: {
    zIndex: "1",
    position: "absolute",
    left: "53px",
    top: "240px",
    height: "83px",
    width: "83px",
    backgroundColor: "#000000"
  },
};

MainNav = Radium(MainNav);

export default MainNav;
