/**
 * Created by zhaojunbo on 2017/5/22.
 */

import React from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import SearchBtn from "./searchBtn.jsx";
import Intl from "../intl/intl.jsx";
import LoginArea from "./loginArea.jsx";

//nav bar component
class NavBar extends React.Component {
  render () {
    return (
      <div style={navBarStyle.wrapper}>
        <div style={navBarStyle.tools}>
          <div style={navBarStyle.center}>
            <Link to={"/"} style={navBarStyle.link}>
              RECOMMEND
            </Link>
            <div style={navBarStyle.mainTitle}>
              Ouiline
            </div>
            <Link to={"/exhibitions"} style={navBarStyle.link}>
              EXHIBITION
            </Link>
          </div>
        </div>

        <div style={navBarStyle.search}>
          <SearchBtn/>
        </div>
        <div style={navBarStyle.login}>
          <LoginArea/>
        </div>
      </div>
    );
  }
}

let navBarStyle = {
  wrapper: {
    position: "fixed",
    left: "0px",
    right: "0px",
    top: "0px",
    zIndex: "100",
    height: "70px",
    background: "#ffffff",
    fontSize: "18px",
    color: "#000000",
    textAlign: "center",
    border: "1px solid #979797"
  },
  tools: {
    marginTop: "14px",
    height: "55px",
    display: "inline-block",
    marginRight: "auto",
    marginLeft: "auto"
  },
  search: {
    width: "185px",
    float: "left",
    marginLeft: "60px",
    marginTop: "28px",
    textAlign: "left",
  },
  login: {
    width: "185px",
    float: "right",
    marginRight: "60px",
    marginTop: "28px",
    textAlign: "right",
  },
  link: {
    float: "left",
    paddingTop: "15px",
    paddingLeft: "57px",
    paddingRight: "57px",
    textAlign: "center",
    fontFamily: "ArialMT",
    fontSize: "18px",
    color: "#5D5D5D",
    height: "20px",
    lineHeight: "20px",
    userSelect: "none",
    textDecoration: "none",
    cursor: "pointer",
  },
  mainTitle: {
    float: "left",
    fontFamily: "Avenir-Medium",
    fontSize: "40px",
    height: "55px",
    lineHeight: "40px",
    textAlign: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
};

NavBar = Radium(NavBar);

export default NavBar;
