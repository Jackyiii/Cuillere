import Radium from "radium";
import React from "react";
import PropTypes from "prop-types";

class Tabs extends React.Component {
  constructor (props) {
    super(props);
  }

  handleItemClick (index) {
    this.props.handleIndexChanged(index);
  }

  renderItems (content, index) {
    let itemStyle = [style.tabItem,
      (index === this.props.index) && style.tabItemSelected
    ];

    return (
      <span style={itemStyle} onClick={() => { this.handleItemClick(index) }}>
        {content}
      </span>
    )
  }

  render () {
    return (
      <div style={style.base}>
        {this.renderItems(this.props.text[0], 0)}
        {this.renderItems(this.props.text[1], 1)}
        {this.renderItems(this.props.text[2], 2)}
      </div>
    )
  }
}

let style = {
  base: {
    height: "30px",
    marginTop: "60px",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000000",
    textAlign: "center"
  },
  tabItem: {
    height: "30px",
    lineHeight: "30px",
    marginLeft: "70px",
    marginRight: "70px",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  tabItemSelected: {
    borderBottom: "2px solid #000000",
    paddingBottom: "2px"
  },
};

Tabs.propTypes = {
  handleIndexChanged: PropTypes.func
};

export default Tabs = Radium(Tabs);
