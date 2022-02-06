/**
 * Created by zhaojunbo on 2017/7/16.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../intl/intl.jsx";

class PersonalAuthEditor extends React.Component {

  render () {
    return (
      <div>
        this is auth editor
      </div>
    );
  }
}

let authEditorStyle = {
  base: {
    height: "552px",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: "-276px",
    marginLeft: "-365px",
    backgroundColor: "rgba(0,230,0,1)",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
  }
};

PersonalAuthEditor = Radium(PersonalAuthEditor);

export default PersonalAuthEditor;
