import React from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";
import Login from "../login"

// Login Component
class LoginBtn extends React.Component {
  render () {
    return (
      <div>
        <div onClick={() => {this.setState({modal: true})}} style={loginBtnStyle.base}> <span>
          {Intl.get("login", "Login")}
        </span></div>

        {this.state.modal ? <Login close={() => {this.setState({modal: false})}}/> : null}
      </div>
    )
  }
}

let loginBtnStyle = {
  base: {
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",
  }
};

LoginBtn = Radium(LoginBtn);
export default LoginBtn;
