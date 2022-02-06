import React from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";
import LoginBtn from "./loginBtn";
import Login from "../login"

// Login Component
class LoginArea extends React.Component {
  constructor (props) {
    super(props);
    this.state = {show: null};
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.loggedIn = Math.random() < 0.7;  // TODO should judge in render
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.show) {
          this.setState({show: null})
        }
      }
    }
  }

  renderOption (option, i, callback) {
    let value = option.value;
    let label = option.label;
    let img = option.img;

    return <div style={style.option}
                key={value}
                onClick={() => {
                  this.setState({show: null});
                  callback(value)
                }}>
      {img ? <span><img style={style.optionImg} src={img}/></span> : null}
      <span>{label}</span>
    </div>
  }

  render () {
    let state = this.props.state;
    if (!this.loggedIn) {  // TODO
      return <LoginBtn/>
    }

    return <div>
      <div style={{position: "relative"}}>
        <div style={[style.btn, {overflow: "visible"}]} onClick={() => {
          if (this.state.show !== "Lang")
            this.setState({show: "Lang"});
          else this.setState({show: null})
        }}>
          {Intl.LOCALE}
        </div>

        <div style={style.btn} onClick={() => {
          if (this.state.show !== "Personal")
            this.setState({show: "Personal"});
          else this.setState({show: null})
        }}>
          <img style={style.img} src={state.avatar}/>
        </div>

        <div style={style.btn} onClick={() => {this.props.history.push("/upload")}}>
          <img style={style.img} src={require("./upload.png")}/>
        </div>

        {this.state.show === "Lang" ?
          <div style={style.menu}>{
            [{label: "FR", value: "fr"}, {label: "EN", value: "en"}, {label: "ZH", value: "zh"}].map((option, i) => {
              return this.renderOption(option, i, (value) => {
                Intl.updateLanguage(value);
              })
            })}</div> : null}

        {this.state.show === "Personal" ? <div style={style.menu}>{[
          {img: require("./home.png"), label: "我的主页", value: "home"},
          {img: require("./wallet.png"), label: "我的钱包", value: "wallet"},
          {img: require("./notification.png"), label: "消息", value: "notification"},
          {img: require("./setting.png"), label: "设置", value: "setting"},
          {img: require("./logout.png"), label: "注销", value: "logout"},].map((option, i) => {
          return this.renderOption(option, i, (value) => {
            this.props.history.push("/" + value)
          })
        })}</div> : null}
      </div>

      <div style={{float: "right"}}><LoginBtn/></div>
    </div>
  }
}

let style = {
  btn: {
    float: "right",
    marginLeft: "25px",
    fontSize: "20px",
    height: "25px",
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  img: {
    color: "inherit",
    width: "25px",
  },
  menu: {
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "absolute",
    top: "43px",
    minWidth: "130px",
    zIndex: "1000",
    WebkitOverflowScrolling: "touch",
    border: "1px solid #AFADAD",
    borderRadius: "5px"
  },
  option: {
    textAlign: "left",
    textDecoration: "none",
    userSelect: "false",
    boxSizing: "border-box",
    color: "rgba(51,51,51,0.8)",
    cursor: "pointer",
    display: "block",
    padding: "8px 10px",
    ":hover": {
      backgroundColor: "#f2f9fc",
      color: "#333"
    },
  },
  optionImg: {
    marginRight: "3px",
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    width: "18px",
    height: "18px"
  }
};

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions';
import {bindActionCreators} from "redux"
import ReactDOM from "react-dom";

LoginArea.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

import {withRouter} from "react-router-dom";

LoginArea = Radium(LoginArea);
LoginArea = withRouter(connect(
  state => ({state: state.login}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(LoginArea));

export default LoginArea;
