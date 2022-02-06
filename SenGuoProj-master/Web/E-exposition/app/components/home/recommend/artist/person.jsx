import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";
import Slider from 'react-slick';

class Person extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let backgroundStyle = style.base;
    backgroundStyle["background"] = "url(" + this.props.imageUrl + ")";

    return (
      <Link to={"/artist/" + this.props.personId}>
        <div style={backgroundStyle}>
          <div style={style.info}>
            <div style={style.content}>
              <div style={style.name}>
                {this.props.personName}
              </div>
              <div style={style.abstract}>
                {this.props.personAbstract}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

Person.propTypes = {
  personId: PropTypes.string,
  imageUrl: PropTypes.string,
  personName: PropTypes.string,
  personAbstract: PropTypes.string
};

let style = {
  base: {
    display: "table",
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  info: {
    display: "table-cell",
    verticalAlign: "middle",
    backgroundColor: "#3b3b3b",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    opacity: "0.0",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      opacity: "0.6",
    },

    ":active": {
      opacity: "0.6",
    }
  },
  content: {
    width: "60%",
    height: "120px",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden"
  },
  name: {
    height: "20px",
    lineHeight: "20px",
    fontSize: "20px"
  },
  abstract: {
    height: "60px",
    lineHeight: "12px",
    fontSize: "12px",
    marginTop: "25px"
  }
};

Person = Radium(Person);
export default Person;
