import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";

class RegisterInput extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      edited: false
    };
  }

  handleFocus (event) {
    this.setState({edited: false});
  };

  handleBlur (event) {
    this.setState({edited: true});
    this.props.callbackContentChange(event.target.value);
    console.log("login register blurred!");
  };

  render () {
    let inputStyle = [style.input.base,
      (this.state.edited && (this.props.errMsg || this.props.err)) && style.input.error,
      this.props.halfWidth && {float: "left", width: "85px"}
    ];

    let type = this.props.inputKey.includes("assword") ? "password" : "text";
    return (
      <div>
        <input style={inputStyle} type={type} placeholder={this.props.holder}
               onFocus={(event) => { this.handleFocus(event) }}
               onBlur={(event) => { this.handleBlur(event) }}
        />

        <div style={style.hint}>
          {this.props.errMsg}
        </div>
      </div>
    );
  }
}

RegisterInput.propTypes = {
  halfWidth: PropTypes.bool,
  inputKey: PropTypes.string,
  holder: PropTypes.string,
  errMsg: PropTypes.string,
  callbackContentChange: PropTypes.func
};

let style = {
  input: {
    base: {
      border: "1px solid #C2C2C2",
      borderRadius: "4px",
      width: "190px",
      paddingBottom: "6px",
      paddingTop: "5px",
      paddingLeft: "8px",

      userSelect: "none",
      marginTop: "4px",
      marginBottom: "4px",
      fontSize: "11px",
      outline: "none",
      transition: "all 300ms linear",
      "::place-holder": {
        fontFamily: "PingFangSC-Regular",
        fontSize: "9px",
        color: "#505050"
      },
      ":hover": {
        border: "solid 1px #4285f4"
      }
    },
    error: {
      background: "#FFEDED",
      border: "1px solid #AD6868"
    }
  },
  hint: {
    textAlign: "left",
    fontFamily: "PingFangSC-Regular",
    fontSize: "6px",
    color: "#870707"
  },
};

RegisterInput = Radium(RegisterInput);
export default RegisterInput;
