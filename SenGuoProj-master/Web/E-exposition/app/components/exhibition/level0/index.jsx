import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Radium from "radium";
import ExhibitionList from './exhibitionList';

class ExhibitionSlick extends React.Component {
  constructor (props) {
    super(props);

    this.pageSize = 20;
    this.indexSize = 10;
    this.state = {
      currPageIndex: 1,
    }
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (nextProps) {
    try {
      if (nextProps.section === this.props.section && nextProps.state.exhibitions[nextProps.section]  && nextProps.state.exhibitions[nextProps.section].length > 0 || nextProps.state.fetching) return
    } catch (err) {}

    this.props.actions.fetchExhibitions(nextProps.section);
  }

  handleIndexClick (index) {
    let newState = {};
    newState.currPageIndex = index;
    this.setState(newState);
  }

  renderPageArray () {
    let list = this.props.state.exhibitions[this.props.section];

    let pageDataArray = [];

    for (let index = 0; index < list.length; index += this.pageSize) {
      pageDataArray.push(list.slice(index, Math.min(index + this.pageSize, list.length)));
    }

    let pageIndex = this.state.currPageIndex - 1;
    if (pageIndex < pageDataArray.length) {
      return (
        <ExhibitionList key={"exhibitionPage" + pageIndex}
                        list={pageDataArray[pageIndex]}/>
      )
    } else {
      return null;
    }
  }

  renderSlickIndex () {
    let list = this.props.state.exhibitions[this.props.section];
    let count = Math.ceil(list.length / this.pageSize);

    let countComponent = [];

    let startIndex = Math.max(1, Math.floor(this.state.currPageIndex - this.indexSize / 2));
    let maxStartIndex = count - this.indexSize + 1;
    startIndex = Math.max(1, Math.min(startIndex, maxStartIndex));
    let endIndex = Math.min(startIndex + this.indexSize - 1, count);

    for (let index = startIndex; index <= endIndex; ++index) {
      countComponent.push(index);
    }

    let self = this;

    return (
      countComponent.map(function (item, index) {
        if (self.state.currPageIndex === item) {
          return (
            <span key={"slickIndex" + item} style={expSlickStyle.slickIndexItem}
                  onClick={(event) => { self.handleIndexClick(item) }}>
              <u>{item}</u>
            </span>
          )
        } else {
          return (
            <span key={"slickIndex" + item} style={expSlickStyle.slickIndexItem}
                  onClick={(event) => { self.handleIndexClick(item) }}>
              {item}
            </span>
          )
        }
      })
    )
  }

  renderSlickIndexBackward () {
    let arrowStyle = [(this.state.currPageIndex === 1) && expSlickStyle.slickArrowDisplay];

    return (
      <span key={"slickbackward"} style={expSlickStyle.slickIndexItem}>
        <p style={arrowStyle} onClick={(event) => { this.handleIndexClick(Math.max(0, this.state.currPageIndex - 1)) }}>
          {"<"}
        </p>
      </span>
    )
  }

  renderSlickIndexForward () {
    let list = this.props.state.exhibitions[this.props.section];
    let maxPage = Math.ceil(list.length / this.pageSize);
    let arrowStyle = [(this.state.currPageIndex === maxPage) && expSlickStyle.slickArrowDisplay];

    return (
      <span key={"slickforward"} style={expSlickStyle.slickIndexItem}>
        <p style={arrowStyle}
           onClick={(event) => { this.handleIndexClick(Math.min(maxPage, this.state.currPageIndex + 1)) }}>
          {">"}
        </p>
      </span>
    )
  }

  render () {
    let state = this.props.state;
    if (state.fetching) {
      return null
    }

    let list = this.props.state.exhibitions[this.props.section];
    if (!list) return null;

    return (
      <div style={expSlickStyle.base}>
        {this.renderPageArray()}
        <div style={expSlickStyle.slickIndex}>
          {this.renderSlickIndexBackward()}
          {this.renderSlickIndex()}
          {this.renderSlickIndexForward()}
        </div>
      </div>
    )
  }
}

let expSlickStyle = {
  base: {
    margin: "0",
    padding: "55px",
    backgroundColor: "#ECECEC",
  },
  slickIndex: {
    display: "inline-block",
    height: "23px",
    lineHeight: "23px",
    marginTop: "56px",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "16px",
    color: "#282828",
    userSelect: "none",

  },
  slickIndexItem: {
    display: "inline-block",
    width: "48px",
    height: "23px",
    cursor: "pointer",

    ":hover": {
      color: "#000000"
    }
  },
  slickArrowDisplay: {
    color: "rgba(0,0,0,0)"
  }
};

import {connect} from 'react-redux';
import * as actionCreators from '../../../actions';
import {bindActionCreators} from "redux"

ExhibitionSlick.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  section: PropTypes.string
};

ExhibitionSlick = Radium(ExhibitionSlick);

ExhibitionSlick = connect(
  state => ({state: state.exhibition}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(ExhibitionSlick);


import IndexNav from "./nav"
let Exhibitions = (props) => {
  return <div>
    <IndexNav {...props}/>
    <div style={{
      textAlign: "center",
      marginTop: "130px"}}>
      <ExhibitionSlick {...props}/>
    </div>
  </div>
};

export default Exhibitions;
