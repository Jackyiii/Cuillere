import React from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";

// Login Component
class UserArea extends React.Component {
  render () {
    let style = {...loginBtnStyle.base, ...this.props.style};
    return (
      <Link to={{pathname: "/login", state: {modal: true}}} style={style}>
        <span>
          {Intl.get("login", "Login")}
        </span>
      </Link>
    )
  }
}

let loginBtnStyle = {
  base: {
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    ":visited": {
      userSelect: "none",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    },
    ":hover": {
      userSelect: "none",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    },
    ":active": {
      userSelect: "none",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    }
  }
};

UserArea = Radium(UserArea);
export default UserArea;
