import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";
import Dropdown from "../../../common/dropdown"

class PersonSelect extends React.Component {
  render() {
    let options = this.props.options;

    let index = 0;
    let subIndex = 0;
    for (let i = 0; i < options.length; i++) {
      let section = options[i];

      for (let j = 0; j < section.length; j++) {
        if (section[j].value === this.props.section) {
          index = i;
          subIndex = j;
        }
      }
    }

    let dropdowns = this.props.options.map((options, i) => {
      return <div key={"artistDropdown" + i} style={expSelectStyle.selector}>
              <Dropdown options={this.props.options[i]}
                        active={index == i}
                        selected={index == i ? subIndex : 0}
                        onChange={(value) => {
                          this.props.selectionChange(value)
                        }}/>
      </div>
    });

    return (
      <div style={expSelectStyle.base}>
        {dropdowns}
      </div>
    )
  }
}

PersonSelect.propTypes = {
  options: PropTypes.array,
  section: PropTypes.string,
  selectionChange: PropTypes.func
};

let expSelectStyle = {
  base: {
    height: "24px",
    width: "450px",
    fontSize :"17px",
    lineHeight: "17px",
    textAlign: "center"
  },
  selector: {
    float: "left",
    width: "150px",
    height: "24px",
  }
};

PersonSelect = Radium(PersonSelect);

export default PersonSelect;
