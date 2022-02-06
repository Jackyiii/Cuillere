/**
 * Created by zhaojunbo on 2017/5/29.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";

class EmailInfo extends React.Component {
  render () {
    return (
      <div style={emailInfoStyle.container}>
        <div style={emailInfoStyle.info}>
          {"验证码已发送到" + this.props.userRegisterEmail} <br/>
          {"请在下方输入验证码，以确认您可以访问该邮箱"}
        </div>
      </div>
    );
  }
}

EmailInfo.propTypes = {
  userRegisterEmail: PropTypes.string
};

let emailInfoStyle = {
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "table"
  },
  info: {
    height: "85px",
    fontSize: "10px",
    fontFamily: "PingFang-SC",
    display: "table-cell",
    verticalAlign: "middle",
  },
};

EmailInfo = Radium(EmailInfo);

class VerifyAction extends React.Component {
  render () {
    return (
      <form style={actionStyle.container}>
        <div>
          <input style={actionStyle.input} type="text" key="verifyEmailCode"
                 placeholder={"六位数验证码"}/>
        </div>
        <div>
          <input style={actionStyle.commit.base} type="submit" key="submit" value={"进行验证"}/>
        </div>
      </form>
    );
  }
}

VerifyAction.propTypes = {
  userRegisterEmail: PropTypes.string,
};

let actionStyle = {
  container: {
    marginTop: "20px",
  },
  commit: {
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
  }
};

VerifyAction = Radium(VerifyAction);

class SendAgain extends React.Component {
  render () {
    return (
      <div style={needHelpStyle.base}>
        没有收到？
        <Link style={needHelpStyle.text} to={{pathname: '/login/help', state: {modal: true}}}>
          再发一次</Link>
        <div style={needHelpStyle.text} onClick={this.props.previousStep}>返回修改</div>
      </div>
    );
  }
}

let needHelpStyle = {
  base: {
    height: "24px",
    marginTop: "30px",
    textAlign: "center",
    fontSize: "10px",
  },
  text: {
    marginLeft: "6px",
    display: "inline-block",
    textDecoration: "none",
    cursor: "pointer",
    color: "#858585",
    transition: "all 300ms linear",

    ":hover": {
      color: "#4285f4"
    }
  }
};

SendAgain = Radium(SendAgain);

class LoginVerifyEmail extends React.Component {
  constructor (props) {
    super(props);
  }

  nextStep () {
    this.props.componentToGo(this.props.componentIndex + 1);
  }

  previousStep () {
    this.props.componentToGo(this.props.componentIndex - 1);
  }

  render () {
    if (this.props.componentIndex === this.props.contentToShow) {
      return (
        <div style={loginVerifyEmailStyle.base} onClick={(event) => { event.stopPropagation() }}>
          <div style={loginVerifyEmailStyle.title}>
            {Intl.get("verifyEmail", "Verify Email")}
          </div>
          <EmailInfo userRegisterEmail={this.props.userRegisterEmail}/>
          <VerifyAction userRegisterEmail={this.props.userRegisterEmail}/>
          <SendAgain previousStep={this.previousStep.bind(this)}/>
        </div>
      );
    } else {
      return null;
    }
  }
}

LoginVerifyEmail.propTypes = {
  componentIndex: PropTypes.number,
  contentToShow: PropTypes.number,
  componentToGo: PropTypes.func,
  userRegisterEmail: PropTypes.string
};

let loginVerifyEmailStyle = {
  base: {
    backgroundColor: "#ffffff",
    userSelect: "none",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15px",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    height: "30px",
    lineHeight: "30px",
    fontSize: "18px",
    color: "#020202",
    textAlign: "center"
  }
};

LoginVerifyEmail = Radium(LoginVerifyEmail);

export default LoginVerifyEmail;
