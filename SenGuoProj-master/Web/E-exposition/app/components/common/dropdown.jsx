import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Radium from "radium";
import {Link} from "react-router-dom";

class Dropdown extends Component {
  constructor (props) {
    super(props);
    let i = props.selected || 0;
    this.state = {
      selected: i,
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.selected && newProps.selected !== this.state.selected) {
      this.setState({selected: newProps.selected || 0})
    }
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

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  setValue (value, label, i) {
    let newState = {
      selected: i,
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.setState(newState)
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange || this.props.active === false) {
      this.props.onChange(this.props.options[newState.selected].value)
    }
  }

  renderOption (option, i) {
    let {linkTo} = this.props;
    let value = option.value;
    let label = option.label;

    if (linkTo) {
      return <Link style={styles.option}
                   key={value}
                   to={linkTo.replace(/`value`/g, value).replace(/`label`/g, label)}>
        {label}
      </Link>
    } else {
      return <div style={styles.option}
                  key={value}
                  onMouseDown={this.setValue.bind(this, value, label, i)}
                  onClick={this.setValue.bind(this, value, label, i)}>
        {label}
      </div>
    }
  }

  buildMenu () {
    let {options} = this.props;
    let ops = options.map((option, i) => {
      return this.renderOption(option, i)
    })

    return ops.length ? ops : <div>No options</div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({isOpen: false})
        }
      }
    }
  }

  render () {
    let placeHolderValue = "";
    try {
      placeHolderValue = this.props.options[this.state.selected].label
    } catch (err) {}

    let menu = this.state.isOpen ? <div style={styles.menu}>{this.buildMenu()}</div> : null;

    return (
      <div style={styles.root}>
        <div style={styles.control} onMouseDown={this.handleMouseDown.bind(this)}>
          <span style={[styles.text, this.props.active ? styles.tabItemSelected : null]}>
            <div style={styles.placeHolder}>{placeHolderValue}</div>
          </span>
          {this.props.noArrow ? null : <div style={styles.arrowWrapper}>
            <span style={{...styles.arrow, ...(this.state.isOpen ? styles.openArrow : {})}}/>
          </div>}
        </div>
        {menu}
      </div>
    )
  }
}

import PropTypes from 'prop-types';

Dropdown.propTypes = {
  options: PropTypes.array,
  active: PropTypes.bool,
  selected: PropTypes.number,
  onChange: PropTypes.func,
  linkTo: PropTypes.string
};

let styles = {
  root: {
    position: "relative"
  },
  control: {
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    cursor: "pointer",
    outline: "none",
    transition: "all 200ms ease",
    display: "inline-block",
    paddingLeft: "auto",
    paddingRight: "auto"
  },
  placeHolder: {},
  text: {
    float: "left"
  },
  arrowWrapper: {
    float: "left",
    marginLeft: "8px"
  },
  arrow: {
    display: "block",
    transform: "translate(0, 50%)",
    borderColor: "#999 transparent transparent",
    borderStyle: "solid",
    borderWidth: "10px 5px 0",
    content: "' '",
  },
  openArrow: {
    borderColor: "transparent transparent #999",
    borderWidth: "0 5px 10px",
  },
  menu: {
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
    boxSizing: "border-box",
    marginTop: "-1px",
    maxHeight: "500px",
    overflow: "hidden",
    position: "absolute",
    top: "100%",
    width: "100%",
    minWidth: "50px",
    zIndex: "1000",
    WebkitOverflowScrolling: "touch"
  },
  group: {},
  groupTitle: {
    padding: "8px 10px",
    color: "rgba(51,51,51,1.2)",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  option: {
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
  selectedOption: {
    backgroundColor: "#f2f9fc",
    color: "#333"
  },
  tabItemSelected: {
    borderBottom: "2px solid #000000",
    paddingBottom: "2px"
  },
};

export default Radium(Dropdown);
