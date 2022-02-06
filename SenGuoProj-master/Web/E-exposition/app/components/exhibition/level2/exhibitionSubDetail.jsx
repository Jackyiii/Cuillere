import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import Intl from "../../intl/intl.jsx";
import Nav from "../../navbar/normalNav"
import Comments from "../comments"
import CarouselImageList from "./carousel"

class ExhibitionSubDetail extends React.Component {
  constructor (props) {
    super(props);

    this.state = {index: 0};
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (nextProps) {
    do {
      try {
        if (nextProps.state.exhibitionDetails[nextProps.id] || nextProps.state.fetching) break
      } catch (err) {}

      this.props.actions.fetchExhibitionDetails(nextProps.section, nextProps.id);
    } while (0);

    do {
      try {
        if (nextProps.state.exhibitionDetails[nextProps.id].halls[nextProps.index] || nextProps.state.fetching) break
      } catch (err) {}

      this.props.actions.fetchExhibitionSubDetails(nextProps.section, nextProps.id, nextProps.index);
    } while (0);
  }

  goTo (i) {
    this.props.history.push(`/exhibition/${this.props.section}/${this.props.id}/detail/${i}`)
  }

  render () {
    let state = this.props.state;
    if (state.fetching) {
      return null
    }

    let item = null;
    try {
      item = this.props.state.exhibitionDetails[this.props.id].halls[this.props.index];
      if (!item) return null;
    } catch (err) {
      return null;
    }

    let prev = parseInt(this.props.index) - 1;
    prev = prev === -1 ? null : prev;
    let next = item.end ? null : parseInt(this.props.index) + 1;

    // onClick={() => {this.props.history.push(`/exhibition/${this.props.section}/${this.props.id}`)}}
    return (
      <div style={style.base}>
        <Nav/>

        {prev && <div style={style.prev} onClick={(event) => {
          event.stopPropagation();
          this.goTo(prev)
        }}/>}

        {next && <div style={style.next} onClick={(event) => {
          event.stopPropagation();
          this.goTo(next)
        }}/>}

        <div style={style.modal}>
          <div style={style.hall}>
            <img src={item.images[this.state.index]} style={style.hallItem}/>
            <div style={style.carousel}>
              <CarouselImageList images={item.images} index={this.state.index} onChange={(index) => {window.scrollTo(0,0); this.setState({index})}}/></div>
          </div>

          <Comments comments={item.comments}/>
        </div>
      </div>
    );
  }
}

let style = {
  base: {
    position: "absolute",
    width: "100%",
    top: "70px",
    backgroundColor: "#343434",
  },
  prev: {
    position: "fixed",
    height: "100%",
    width: "100px",
    margin: "0px",
    left: "0px",
    backgroundImage: `url(${require("../prev.png")})`,
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",

    userSelect: "none",
    cursor: "pointer",
  },
  next: {
    position: "fixed",
    height: "100%",
    width: "100px",
    margin: "0px",
    right: "0px",
    backgroundImage: `url(${require("../next.png")})`,
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",

    userSelect: "none",
    cursor: "pointer",
  },
  modal: {
    position: "relative",
    backgroundColor: "#ffffff",
    margin: "0 100px 100px 100px",
    textAlign: "center"
  },
  hall: {
    background: "#ACACAC",
  },
  hallItem: {
    width: "100%"
  },
  carousel: {
    padding: "20px 212px",
  }
};

import {connect} from 'react-redux';
import * as actionCreators from '../../../actions';
import {bindActionCreators} from "redux";

ExhibitionSubDetail = connect(
  state => ({state: state.exhibition}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(Radium(ExhibitionSubDetail));

ExhibitionSubDetail = withRouter(ExhibitionSubDetail);

export default ExhibitionSubDetail;
