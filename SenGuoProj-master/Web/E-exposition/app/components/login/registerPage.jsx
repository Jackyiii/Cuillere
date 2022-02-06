/**
 * Created by zhaojunbo on 2017/5/29.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";
import RegisterInput from "./registerInput";
import Dropdown from "../common/dropdown"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import RegisterDropdown from "./registerDropdown";

class RegisterPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      couldRegister: false,
      userFamilyName: "",
      userGivenName: "",
      userEmail: "",
      confirmEmail: "",
      userPassword: "",
      errMsg: ""
    };
  }

  componentWillMount () {
    this.props.actions.clearArea();
    this.props.actions.fetchCountry();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.registerUserInfo();
  };

  nextStep () {
    this.props.componentToGo(this.props.componentIndex + 1);
  }

  previousStep () {
    this.props.componentToGo(this.props.componentIndex - 1);
  }

  countrySelectionChange (country) {
    this.props.actions.fetchArea(country);
  }

  render () {
    if (this.props.componentIndex === this.props.contentToShow) {
      return (
        <form style={formStyle.base} onSubmit={this.handleSubmit}>
          <RegisterInput halfWidth={true} inputKey={"familyName"} holder={Intl.get("firstName", "First Name")}
                         callbackContentChange={this.props.setUserFamilyName}
                         err={this.props.userRegisterFamilyNameError}/>
          <div style={{float: "left", width: "10px", height: "1px"}}/>
          <RegisterInput halfWidth={true} inputKey={"givenName"} holder={Intl.get("givenName", "Given Name")}
                         callbackContentChange={this.props.setUserGivenName}
                         err={this.props.userRegisterGivenNameError}/>

          <div style={formStyle.hint}>
            {this.props.userRegisterFamilyNameError || this.props.userRegisterGivenNameError}
          </div>

          <RegisterInput inputKey={"email"} holder={Intl.get("registerMail", "Register EMail")}
                         callbackContentChange={this.props.setUserEmail}
                         errMsg={this.props.userRegisterEmailError}/>

          <RegisterInput inputKey={"password"} holder={Intl.get("passwordTips", "Password Tips")}
                         callbackContentChange={this.props.setPassword}
                         errMsg={this.props.userRegisterPasswordError}/>

          <RegisterInput inputKey={"repeatPassword"} holder={Intl.get("confirmPassword", "Repeat Password")}
                         callbackContentChange={this.props.setRepeatPassword}
                         errMsg={this.props.userRepeatPasswordError}/>

          <RegisterDropdown halfWidth={true} options={this.props.state.country} err={this.props.userCountryError}
                            callbackContentChange={(value) => {
                              this.countrySelectionChange(value);
                              this.props.setCountry(value);
                            }}/>

          <div style={{float: "left", width: "10px", height: "1px"}}/>

          <RegisterDropdown options={this.props.state.area} halfWidth={true}/>
          <div style={formStyle.hint}>
            {this.props.userCountryError}
          </div>

          <div style={formStyle.helper}>注册即表示您同意并愿意遵守我们的<br/>
            <Link style={formStyle.link} to={"/"}>用户协议</Link> 及 <Link
              style={formStyle.link} to={"/"}>隐私政策</Link></div>

          <input style={formStyle.commit} type="submit" key="submit" value={Intl.get("register", "Register")}/>
        </form>
      );
    } else {return null;}
  }
}

RegisterPage.propTypes = {
  setUserEmail: PropTypes.func,
  setPassword: PropTypes.func,
  setRepeatPassword: PropTypes.func,
  setUserGivenName: PropTypes.func,
  setUserFamilyName: PropTypes.func,
  registerUserInfo: PropTypes.func,
  userRegisterFamilyNameError: PropTypes.string,
  userRegisterGivenNameError: PropTypes.string,
  userRegisterEmailError: PropTypes.string,
  userRepeatPasswordError: PropTypes.string,
  userRegisterPasswordError: PropTypes.string
};

let formStyle = {
  hint: {
    clear: "both",
    textAlign: "left",
    fontFamily: "PingFangSC-Regular",
    fontSize: "6px",
    color: "#870707"
  },
  base: {},
  helper: {
    fontFamily: "PingFangSC-Regular",
    fontSize: "6px",
    color: "#000000",
    paddingBottom: "13px",
    paddingTop: "13px",
  },
  link: {
    textDecoration: "none",
    color: "#949494"
  },
  commit: {
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
  }
};

RegisterPage = Radium(RegisterPage);

RegisterPage = connect(
  state => ({state: state.login}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(RegisterPage);

export default RegisterPage;
