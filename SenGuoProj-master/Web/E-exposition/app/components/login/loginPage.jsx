/**
 * Created by zhaojunbo on 2017/5/29.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";
import SocialAccounts from "./socialAccounts.jsx"

class LoginForm extends React.Component {
  constructor (props) {
    super(props);

    this.userName = "";
    this.userPassword = "";

    this.state = {
      userEditing: false
    }
  }

  handleEditInput (event) {
    if (!this.state.userEditing) {
      let newState = {};
      newState.userEditing = true;
      this.setState(newState);
    }
  }

  handleChangeEmail (event) {
    this.userName = event.target.value;
  }

  handleChangePassword (event) {
    this.userPassword = event.target.value;
  }

  handleSubmit (event) {
    event.preventDefault();

    let newState = {};
    newState.userEditing = false;
    this.setState(newState);

    this.props.loginUserInfo(this.userName, this.userPassword);
  }

  render () {

    {/*<div style={formStyle.hintText}>*/}
      {/*{this.state.userEditing ? null : this.props.userLoginError}*/}
    {/*</div>*/}

    return (
      <div>
        <form style={formStyle.base} onSubmit={(event) => { this.handleSubmit(event) }}>

          <input style={formStyle.input} type="text" key="inputEmail" placeholder={Intl.get("email", "Email")}
                 onChange={(event) => { this.handleEditInput(event) }}
                 onBlur={(event) => { this.handleChangeEmail(event) }}
          />

          <input style={formStyle.input} type="password" key="inputPassword"
                 placeholder={Intl.get("password", "Password")}
                 onChange={(event) => { this.handleEditInput(event) }}
                 onBlur={(event) => { this.handleChangePassword(event) }}
          />

          <input style={commitStyle.base} type="submit" key="submit" value={Intl.get("login", "Login")}/>
        </form>
      </div>

    );
  }
}

LoginForm.propTypes = {
  loginUserInfo: PropTypes.func,
  userLoginError: PropTypes.string
};

let formStyle = {
  base: {
  },
  hintText: {
    height: "20px",
    lineHeight: "20px",
    marginTop: "10px",
    color: "#ff5555"
  },
  input: {
    border: "1px solid #C2C2C2",
    borderRadius: "4px",
    width: "190px",
    paddingBottom: "6px",
    paddingTop: "5px",
    paddingLeft: "8px",

    userSelect: "none",
    marginTop: "5px",
    marginBottom: "6px",
    fontSize: "11px",
    outline: "none",
    transition: "all 300ms linear",
    "::place-holder": {
      fontFamily: "PingFangSC-Regular",
      color: "#505050"
    },
    ":hover": {
      border: "solid 1px #4285f4"
    }
  },

};

let commitStyle = {
  base: {
    opacity: "0.52",
    borderRadius: "100px",
    backgroundColor: "#6281A8",

    height: "31px",
    width: "195px",
    userSelect: "none",
    marginTop: "10px",
    cursor: "pointer",

    transition: "all 300ms linear",

    fontFamily: "PingFangSC-Regular",
    fontSize: "12px",
    color: "#FFFFFF",

    ":hover": {
      backgroundColor: "#4285f4",
      outline: "none"
    }
  },
  disable: {
    background: "#2F425A",
  }
};

LoginForm = Radium(LoginForm);

class LoginHelp extends React.Component {
  render () {
    return (
      <div style={loginHelpStyle.base}>
        <input id="remember" type="checkbox" name="rememberLogin" value="Remember"/>
        <div key={"rememberMe"} style={loginHelpStyle.rememberMe}>
          <label htmlFor="remember">{Intl.get("rememberMe", "Remember Me")}</label>
        </div>
        <div key={"loginProblem"} style={loginHelpStyle.loginProblem}>
          {Intl.get("loginProblem", "Problem?")}
        </div>
      </div>
    );
  }
}

let loginHelpStyle = {
  base: {
    width: "195px",
    marginTop: "10px",
    fontFamily: "PingFangSC-Regular",
    fontSize: "8px",
    color: "#969696",
    display: "flex",
    alignItems: "center",
  },
  rememberMe: {
    width: "50%",
    float: "left",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 300ms linear",

    ":hover": {
      color: "4285f4"
    }
  },
  loginProblem: {
    width: "50%",
    float: "right",
    textAlign: "right",
    cursor: "pointer",
    transition: "all 300ms linear",

    ":hover": {
      color: "4285f4"
    }
  }
};

LoginHelp = Radium(LoginHelp);

class Register extends React.Component {
  render () {
    return (
      <div style={registerStyle.base} onClick={(event) => {
        event.stopPropagation();
        this.props.nextStep()
      }}>
        {Intl.get("register", "Register")}
      </div>
    );
  }
}

Register.propTypes = {
  nextStep: PropTypes.func
};

let registerStyle = {
  base: {
    height: "34px",
    lineHeight: "34px",
    width: "260px",
    backgroundColor: "#050505",
    userSelect: "none",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "40px",
    borderRadius: "5px",
    color: "#ffffff",
    textAlign: "center",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 300ms linear",

    ":hover": {
      backgroundColor: "#101010",
      outline: "none"
    },

    ":active": {
      backgroundColor: "#050505",
    }
  }
};

Register = Radium(Register);

class LoginPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      couldLogin: false,
      errMsg: ""
    };
  }

  nextStep () {
    this.props.componentToGo(this.props.componentIndex + 1);
  }

  render () {
    if (this.props.componentIndex === this.props.contentToShow) {
      return (
        <div style={loginPageStyle.base} onClick={(event) => { event.stopPropagation() }}>
          <LoginForm loginUserInfo={this.props.loginUserInfo}
                     userLoginError={this.props.userLoginError}
          />
          <LoginHelp/>
          <SocialAccounts/>
        </div>
      );
    } else {
      return null;
    }
  }
}

LoginPage.propTypes = {
  componentIndex: PropTypes.number,
  contentToShow: PropTypes.number,
  componentToGo: PropTypes.func,
  loginUserInfo: PropTypes.func,
  userLoginError: PropTypes.string
};

let loginPageStyle = {
  base: {
    width: "195px",
    backgroundColor: "#ffffff",
    userSelect: "none",
    marginTop: "15px",
  }
};

LoginPage = Radium(LoginPage);

export default LoginPage;
