/**
 * Created by zhaojunbo on 2017/5/29.
 */
import React from 'react';
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link, withRouter} from "react-router-dom";
import Intl from "../intl/intl.jsx";
import Auth from "./Auth.jsx";
import LoginPage from "./loginPage.jsx";
import LoginVerifyEmail from "./loginVerifyEmail.jsx";
import NavBar from "./nav.jsx";
import RegisterPage from "./registerPage";

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.minChildIndex = 0;
    this.maxChildIndex = 3;
    /*
     * currComponentIndex: child component needs to show now.
     * userLoginError: login error needs to show
     */

    this.state = {
      currComponentIndex: 0,
      userRegisterEmail: "",
      userRegisterGivenName: "",
      userRegisterFamilyName: "",
      userRegisterPassword: "",
      userLoginError: "",
      userRegisterFamilyNameError: "",
      userRegisterGivenNameError: "",
      userRegisterEmailError: "",
      userRegisterReEmailError: "",
      userRegisterPasswordError: ""
    };
  }

  loginUserInfoCallback (statusCode, detailMsg) {
    let newState = {};

    if (statusCode === 40000) {

      // invalid user name and password
      newState.userLoginError = "invalid user name and password";
    } else if (statusCode === 40400) {

      // user doesn't exists
      newState.userLoginError = "user doesn't exists";
    } else if (statusCode === 40003) {

      // user doesn't exists
      newState.userLoginError = "data base denied";
    } else if (statusCode === 20000) {

      // login success
      newState.userLoginError = "";

      // close login dialog
      history.back();
    } else {
      newState.userLoginError = "login failed";
    }

    this.setState(newState);

    console.log("login user result: " + statusCode + "  " + detailMsg);
  }

  loginUserInfo (userName, userPassword) {
    let newState = {};
    if (userName === "" || userPassword === "") {
      if (userName === "") {
        newState.userLoginError = "empty user email";
      } else {
        newState.userLoginError = "empty user password";
      }
    } else {
      newState.userLoginError = "";
      Auth.fetchUserLogin(userName, userPassword, this.loginUserInfoCallback.bind(this));
    }

    this.setState(newState);
  }

  setUserGivenName (givenNameString) {
    givenNameString = givenNameString.trim();

    let newState = {};
    if (givenNameString !== "") {
      newState.userRegisterGivenNameError = "";
      newState.userRegisterGivenName = givenNameString;
    } else {
      newState.userRegisterGivenNameError = "input given name was empty";
      newState.userRegisterGivenName = "";
    }
    this.setState(newState);
  }

  setCountry (country) {
    country = country.trim();

    let newState = {};
    if (country !== "-") {
      newState.userCountryError = "";
      newState.userCountry = country;
    } else {
      newState.userCountryError = "input country was empty";
      newState.userCountry = "";
    }
    this.setState(newState);
  }

  setUserFamilyName (familyNameString) {
    familyNameString = familyNameString.trim();

    let newState = {};
    if (familyNameString !== "") {
      newState.userRegisterFamilyNameError = "";
      newState.userRegisterFamilyName = familyNameString;
    } else {
      newState.userRegisterFamilyNameError = "input family name was empty";
      newState.userRegisterFamilyName = "";
    }
    this.setState(newState);
  }

  setUserEmail (emailString) {
    let newState = {};
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

    if (emailString.match(reg)) {
      newState.userRegisterEmailError = "";
      newState.userRegisterEmail = emailString;

      // verify if this email has been registered
      Auth.fetchUserVerifyEmail(emailString, this.verifyUserEmailCallback.bind(this));
    } else {
      newState.userRegisterEmailError = "input register email was invalid";
      newState.userRegisterEmail = "";
    }
    this.setState(newState);
  }

  setRepeatPassword (repeatPasswordString) {
    let newState = {};

    if (repeatPasswordString === this.state.userRegisterPassword ||
      this.state.userRegisterPassword === "") {
      newState.userRepeatPasswordError = "";
    } else {
      newState.userRepeatPasswordError = "passwrod not match";
    }
    this.setState(newState);
  }

  setPassword (password) {
    let newState = {};

    let reg = /^[A-Za-z0-9_]{6,20}$/;
    if (password.match(reg)) {
      newState.userRegisterPasswordError = "";
      newState.userRegisterPassword = password;
    } else {
      newState.userRegisterPasswordError = "6 to 20 characters with numbers";
      newState.userRegisterPassword = "";
    }

    this.setState(newState);
  }

  registerUserInfoCallback (statusCode, detailMsg) {
    let newState = {};

    if (statusCode === 40000) {

      newState.userRegisterEmailError = "invalid register parameter";
    } else if (statusCode === 40404) {

      newState.userRegisterEmailError = "user email already registered";
    } else if (statusCode === 40003) {

      newState.userRegisterEmailError = "register failed";
    } else if (statusCode === 20000) {

      newState.userRegisterEmailError = "";
      newState.currComponentIndex = 2;
    } else {
      console.error("Login::registerUserInfoCallback unknown status code " + statusCode + " " + detailMsg);
    }

    this.setState(newState);
    console.log("Login::registerUserInfoCallback: " + statusCode + "  " + detailMsg);
  }

  registerUserInfo () {
    do {
      if (!this.state.userRegisterFamilyName) {
        console.error("Login::registerUserInfo family name empty");
        break;
      }

      if (!this.state.userRegisterGivenName) {
        console.error("Login::registerUserInfo given name empty");
        break;
      }

      if (!this.state.userRegisterEmail) {
        console.error("Login::registerUserInfo register email empty");
        break;
      }

      if (!this.state.userRegisterPassword) {
        console.error("Login::registerUserInfo register password empty");
        break;
      }

      if (!this.state.userCountry) {
        console.error("Login::registerUserInfo register country empty");
        break;
      }

      Auth.fetchUserRegister(
        this.state.userRegisterFamilyName,
        this.state.userRegisterGivenName,
        this.state.userRegisterEmail,
        this.state.userRegisterPassword,
        this.state.userCountry,
        this.registerUserInfoCallback.bind(this));

    } while (false);


    this.componentToGo(2);   // TODO remove when connected to the backend
  }

  verifyUserEmailCallback (statusCode, detailMsg) {
    let newState = {};

    if (statusCode === 40000) {

      newState.userRegisterEmailError = "invalid register email";
    } else if (statusCode === 40005) {

      newState.userRegisterEmailError = "this email has already been registered";
    } else if (statusCode === 20000) {

      newState.userRegisterEmailError = "";
    } else {
      console.error("Login::verifyUserEmailCallback unknown status code " + statusCode + " " + detailMsg);
    }

    this.setState(newState);
    console.log("Login::verifyUserEmailCallback: " + statusCode + "  " + detailMsg);
  }

  verifyUserUpdateCallback (statusCode, detailMsg) {
    let newState = {};

    if (statusCode === 40000) {

      newState.userRegisterEmailError = "invalid update email";
    } else if (statusCode === 40005) {

      newState.userRegisterEmailError = "this email has already been registered";
    } else if (statusCode === 20000) {

      newState.userRegisterEmailError = "";
    } else {
      console.error("Login::verifyUserUpdateCallback unknown status code " + statusCode + " " + detailMsg);
    }

    //this.setState(newState);

    console.log("Login::verifyUserUpdateCallback: " + statusCode + "  " + detailMsg);
  }

  setUserUpdateEmail (emailString) {
    let newState = {};
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

    if (emailString.match(reg)) {
      newState.userRegisterEmailError = "";
      newState.userRegisterEmail = emailString;

      // verify if this email has been registered
      // Auth.fetchUserVerifyEmail(emailString, this.verifyUserUpdateCallback.bind(this));
    } else {
      newState.userRegisterEmailError = "input update email was invalid";
      newState.userRegisterEmail = "";
    }
    this.setState(newState);
  }

  updateUserEmail () {
    if (this.state.userRegisterEmail !== "") {
      this.props.history.push({pathname: '/welcome', state: {modal: true}});
    } else {
      console.error("Login::updateUserEmail invalid newEmail");
    }
  }

  back (event) {
    event.stopPropagation();
    this.props.close()
  };

  componentToGo (toIndex) {
    if (this.minChildIndex <= toIndex && toIndex <= this.maxChildIndex) {
      let newState = {};
      newState.currComponentIndex = toIndex;
      this.setState(newState);
    }
  }

  render () {
    let nav = null;
    if (this.state.currComponentIndex < 2) {
      nav = (
        <NavBar componentToGo={this.componentToGo.bind(this)} index={this.state.currComponentIndex}/>
      )
    }

    return (
      <div style={loginStyle.base}>
        <div style={loginStyle.modal}>
          <div style={loginStyle.title}>
            <span>欢迎加入Ouiline</span>
            <div style={loginStyle.close} onClick={this.back.bind(this)}>
              <img src={require('./close.png')}/>
            </div>
          </div>
          <hr style={{backgroundColor: "#fff", borderTop: "1px solid #979797"}}/>
          {nav}
          <LoginPage
            componentIndex={0}
            contentToShow={this.state.currComponentIndex}
            componentToGo={this.componentToGo.bind(this)}
            loginUserInfo={this.loginUserInfo.bind(this)}
            userLoginError={this.state.userLoginError}
          />
          <RegisterPage
            componentIndex={1}
            contentToShow={this.state.currComponentIndex}
            componentToGo={this.componentToGo.bind(this)}
            setUserGivenName={this.setUserGivenName.bind(this)}
            setUserFamilyName={this.setUserFamilyName.bind(this)}
            setUserEmail={this.setUserEmail.bind(this)}
            setPassword={this.setPassword.bind(this)}
            setRepeatPassword={this.setRepeatPassword.bind(this)}
            setCountry={this.setCountry.bind(this)}
            registerUserInfo={this.registerUserInfo.bind(this)}
            userRegisterFamilyNameError={this.state.userRegisterFamilyNameError}
            userRegisterGivenNameError={this.state.userRegisterGivenNameError}
            userRegisterEmailError={this.state.userRegisterEmailError}
            userRegisterPasswordError={this.state.userRegisterPasswordError}
            userRepeatPasswordError={this.state.userRepeatPasswordError}
            userCountryError={this.state.userCountryError}
          />
          <LoginVerifyEmail
            componentIndex={2}
            contentToShow={this.state.currComponentIndex}
            componentToGo={this.componentToGo.bind(this)}
            userRegisterEmail={this.state.userRegisterEmail}
          />
        </div>
      </div>
    );
  }
}

let loginStyle = {
  base: {
    height: "100%",
    width: "100%",
    position: "fixed",
    top: "0px",
    left: "0px",
    zIndex: "1000",
    userSelect: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.20)",
    border: "1px solid #979797"
  },
  modal: {
    position: "relative",
    backgroundColor: "#ffffff",
    paddingLeft: "105px",
    paddingRight: "90px",
    paddingTop: "30px",
    paddingBottom: "26px",
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    fontFamily: "PingFangSC-Regular",
    fontSize: "17px",
    color: "#505050",
    paddingBottom: "20px"
  },
  close: {
    position: "absolute",
    right: "31px",
    top: "30px"
  }
};

Login.protoTypes = {
  close: PropTypes.func
};

Login = Radium(Login);

export default Login;
