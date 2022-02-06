import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";
import Dropdown from "../common/dropdown"

class RegisterDropdown extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      edited: false
    };
  }

  handleBlur (value) {
    this.setState({edited: true});
  };

  render () {
    let inputStyle = [style.input.base,
      (this.state.edited && (this.props.errMsg || this.props.err)) && style.input.error,
      this.props.halfWidth && {float: "left", width: "85px"}
    ];

    return (
      <div>
        <div style={inputStyle}>
          <Dropdown options={this.props.options} onChange={(value)=>{this.handleBlur(); this.props.callbackContentChange(value)}}/>
        </div>
      </div>
    );
  }
}

RegisterDropdown.propTypes = {
  options: PropTypes.array,
  halfWidth: PropTypes.bool,
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

RegisterDropdown = Radium(RegisterDropdown);
export default RegisterDropdown;
