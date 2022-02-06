/**
 * Created by zhaojunbo on 2017/9/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";
import PersonSelect from "./nav.jsx";

class Person extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  handleMouseEnter () {
    let newState = {};
    newState.hover = true;
    this.setState(newState);
  }

  handleMouseLeave () {
    let newState = {};
    newState.hover = false;
    this.setState(newState);
  }

  render () {
    let baseStyle = personalItemStyle.base;
    baseStyle["background"] = "url(" + this.props.imageUrl + ")";

    return (
      <Link style={baseStyle} to={"/artist/" + this.props.personId}>
        <div key={"personalItem_" + this.props.personId + "_FullInfo"}
             style={personalItemStyle.infoFull}
             onMouseEnter={(event) => { this.handleMouseEnter() }}
             onMouseLeave={(event) => { this.handleMouseLeave() }}>

          <div style={personalItemStyle.mark}>
            <img src={require(this.props.marked ? './mark.png' : './mark.png')}/></div>
          <div style={personalItemStyle.personName}>

            {this.props.personName}
          </div>
          <div style={personalItemStyle.personAbstract}>
            {this.props.personAbstract}
          </div>
        </div>
      </Link>
    )
  }
}

Person.protoType = {
  personId: PropTypes.string,
  imageUrl: PropTypes.string,
  personName: PropTypes.string,
  personAbstract: PropTypes.string,
  marked: PropTypes.bool
};

let personalItemStyle = {
  base: {
    float: "left",
    position: "relative",
    height: "174px",
    width: "181px",
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "9px",
    marginRight: "9px",
    color: "#ffffff",
    userSelect: "none",
    cursor: "pointer"
  },
  infoFull: {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "174px",
    width: "181px",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
    opacity: "0",
    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      opacity: "1",
      backgroundColor: "rgba(0,0,0,0.46)"
    }
  },
  infoShortTakePlace: {
    height: "204px",
    width: "100%"
  },
  infoShortContent: {
    height: "100px",
    width: "100%",
    paddingTop: "16px",
    backgroundColor: "rgba(165,172,180, 0.61)",
    textAlign: "center"
  },
  mark: {
    height: "30px",
    width: "30px",
    marginLeft: "134px",
    marginTop: "10px",
  },
  personName: {
    height: "30px",
    lineHeight: "30px",
    marginTop: "35px",
    fontSize: "20px"
  },
  personAbstract: {
    height: "21px",
    lineHeight: "21px",
    fontSize: "16px"
  },
};

Person = Radium(Person);

class PersonalPage extends React.Component {
  constructor (props) {
    super(props);
  }

  renderItemArray () {
    return (
      this.props.pageArray.map(function (item, index) {
        return (
          <Person key={"personalItem" + item.personId}
                  personId={item.personId}
                  imageUrl={item.imageUrl}
                  personName={item.personName}
                  personAbstract={item.personAbstract}
          />
        )
      })
    )
  }

  render () {
    return (
      <div style={personalPageStyle.base}>
        {this.renderItemArray()}
      </div>
    )
  }
}

PersonalPage.propTypes = {
  pageArray: PropTypes.array
};

let personalPageStyle = {
  base: {
    width: "1194px",
    height: "792px",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden"
  }
};

PersonalPage = Radium(PersonalPage);

class PersonalSlick extends React.Component {
  constructor (props) {
    super(props);

    this.pageSize = 24;
    this.indexSize = 10;
    this.state = {
      currPageIndex: 1
    }
  }

  handleIndexClick (index) {
    let newState = {};
    newState.currPageIndex = index;
    this.setState(newState);
  }

  renderPageArray () {
    let pageDataArray = [];

    for (let index = 0; index < this.props.list.length; index += this.pageSize) {
      pageDataArray.push(this.props.list.slice(index, Math.min(index + this.pageSize, this.props.list.length)));
    }

    let pageIndex = this.state.currPageIndex - 1;
    if (pageIndex < pageDataArray.length) {
      return (
        <PersonalPage key={"exhibitionPage" + pageIndex}
                      pageArray={pageDataArray[pageIndex]}/>
      )
    } else {
      return null;
    }
  }

  renderSlickIndex () {
    let count = Math.ceil(this.props.list.length / this.pageSize);

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
            <span key={"slickIndex" + item} style={personalSlickStyle.slickIndexItem}
                  onClick={(event) => { self.handleIndexClick(item) }}>
              <u>
                {item}
              </u>
            </span>
          )
        } else {
          return (
            <span key={"slickIndex" + item} style={personalSlickStyle.slickIndexItem}
                  onClick={(event) => { self.handleIndexClick(item) }}>
              {item}
            </span>
          )
        }
      })
    )
  }

  renderSlickIndexBackward () {
    let arrowStyle = [(this.state.currPageIndex === 1) && personalSlickStyle.slickArrowDisplay];

    return (
      <span key={"slickbackward"} style={personalSlickStyle.slickIndexItem}>
        <p style={arrowStyle} onClick={(event) => { this.handleIndexClick(Math.max(0, this.state.currPageIndex - 1)) }}>
          {"<"}
        </p>
      </span>
    )

  }

  renderSlickIndexForward () {
    let maxPage = Math.ceil(this.props.list.length / this.pageSize);

    let arrowStyle = [(this.state.currPageIndex === maxPage) && personalSlickStyle.slickArrowDisplay];

    return (
      <span key={"slickforward"} style={personalSlickStyle.slickIndexItem}>
        <p style={arrowStyle}
           onClick={(event) => { this.handleIndexClick(Math.min(maxPage, this.state.currPageIndex + 1)) }}>
          {">"}
        </p>
      </span>
    )
  }

  render () {
    return (
      <div style={personalSlickStyle.base}>
        {this.renderPageArray()}
        <div style={personalSlickStyle.slickIndex}>
          {this.renderSlickIndexBackward()}
          {this.renderSlickIndex()}
          {this.renderSlickIndexForward()}
        </div>
      </div>
    )
  }
}

PersonalSlick.propTypes = {
  list: PropTypes.array
};

let personalSlickStyle = {
  base: {
    width: "1194px",
    height: "871px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "60px",
    textAlign: "center"
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

PersonalSlick = Radium(PersonalSlick);

class CompleteList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {section: "global"}
  }

  componentWillMount () {
    this.props.actions.fetchArtistOptions();
    this.componentWillUpdate(this.props, this.state);
  }

  componentWillUpdate (nextProps, nextState) {
    try {
      if (nextProps.state.section === this.state.section && nextProps.state.section === nextState.section &&
        nextProps.state.artists && nextProps.state.artists[this.state.section] &&
        nextProps.state.artists[this.state.section].length > 0 || nextProps.state.fetching) {
        return
      }
    } catch (err) {}

    this.props.actions.fetchArtists(nextState.section, 0);
  }

  selectionChange (value) {
    this.setState({section: value});
  }

  render () {
    let state = this.props.state;
    if (state.fetching) {
      return null
    }

    let list = state.artists[state.section];
    if (!list) return null;

    return (
      <div style={completePersonalStyle.base}>
        <div style={completePersonalStyle.title}>
          RECOMMEND PERSON
        </div>
        <div style={completePersonalStyle.motto}>
          <div style={completePersonalStyle.mottoWrapper}>
            <div style={completePersonalStyle.mottoText}>
              {state.mainMotto}
            </div>
            <div style={completePersonalStyle.mottoText}>
              {state.subMotto}
            </div>
          </div>
          <div style={completePersonalStyle.selector}>
            <PersonSelect
              section={state.section}
              options={state.options}
              selectionChange={this.selectionChange.bind(this)}/>
          </div>
        </div>
        <PersonalSlick list={list}/>
      </div>
    )
  }
}

let completePersonalStyle = {
  base: {
    width: "100%",
    minWidth: "1050px",
    marginTop: "100px"
  },
  title: {
    height: "25px",
    lineHeight: "25px",
    marginLeft: "260px",
    fontSize: "20px"
  },
  motto: {
    height: "30px",
    lineHeight: "15px",
    width: "1194px",
    marginTop: "60px",
    marginLeft: "260px",
  },
  mottoWrapper: {
    float: "left",
    height: "30px",
    width: "500px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  mottoText: {
    height: "15px",
    font: "15px"
  },
  selector: {
    float: "right",
    paddingRight: "125px",
    width: "460px",
    marginTop: "5px"
  }
};

import {connect} from 'react-redux';
import * as actionCreators from '../../../../actions';
import {bindActionCreators} from "redux"

CompleteList.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

CompleteList = Radium(CompleteList);

CompleteList = connect(
  state => ({state: state.artist}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(CompleteList);


export default CompleteList;
