/**
 * Created by zhaojunbo on 2017/5/22.
 */

import React from "react";
import Radium from "radium";
import {withRouter} from "react-router-dom";
import SearchBtn from "../../navbar/searchBtn.jsx";
import SubNav from "../../navbar/subNav.jsx";
import Dropdown from "../../common/dropdown.jsx";
import LoginArea from "../../navbar/loginArea";
import PropTypes from 'prop-types';

//nav bar component
class NavBar extends React.Component {
  render () {
    let options = this.props.options;

    let index = 0;
    let subIndex = 0;
    for (let i = 0; i < options.length; i++) {
      let section = options[i];

      for (let j = 0; j < section.length; j++) {
        if (section[j].value === this.props.section) {
          index = i;
          subIndex = j;
        }
      }
    }

    let dropdowns = this.props.options.map((options, i) => {
      return <span style={navBarStyle.dropdown}>
              <Dropdown options={this.props.options[i]}
                        active={index == i}
                        selected={index == i ? subIndex : 0}
                        onChange={(value) => {
                          this.props.history.push("/exhibitions/" + value)
                        }}/>
      </span>
    });

    return (
      <div style={navBarStyle.wrapper}>
        <div style={navBarStyle.tools}>
          <div style={navBarStyle.center}>
            {dropdowns[0]}
            {dropdowns[1]}
            <div style={navBarStyle.mainTitle}>
              Ouiline
            </div>
            {dropdowns[2]}
            {dropdowns[3]}
          </div>
        </div>

        <div style={navBarStyle.search}><SearchBtn/></div>
        <div style={navBarStyle.login}><LoginArea/></div>

        <div style={{marginTop: "10px"}}>
          <SubNav index={1}/>
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
    height: "130px",
    background: "#ffffff",
    fontSize: "18px",
    color: "#000000",
    textAlign: "center",
    border: "1px solid #979797"
  },
  center: {
    display: "inline-block",
    height: "55px",
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
    textAlign: "left"
  },
  login: {
    width: "185px",
    float: "right",
    marginRight: "60px",
    marginTop: "28px",
    textAlign: "right"
  },
  dropdown: {
    float: "left",
    width: "100px",
    paddingTop: "15px",
    paddingLeft: "10px",
    paddingRight: "10px",
    textAlign: "center"
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

NavBar.propTypes = {
  options: PropTypes.array,
  section: PropTypes.string,
};

NavBar = Radium(NavBar);

NavBar = withRouter(NavBar);

export default NavBar;
