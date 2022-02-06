/**
 * Created by zhaojunbo on 2017/6/14.
 */

import React from "react";
import Radium from "radium";
import Poster from "./poster.jsx";
import MainNav from "../navbar/mainNav.jsx";
import PublicExhibitions from "./recommend/publicExhibition.jsx";
import IndividualExhibitions from "./recommend/individualExhibition.jsx";
import Events from "./recommend/event/events.jsx";
import SchoolExhibition from "./recommend/schoolExhibition.jsx";
import Person from "./recommend/artist/index.jsx";
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.actions.fetchHome();
  }

  render () {
    let state = this.props.state;
    if (state.fetching) {
      return null
    }

    return (
      <div>
        <MainNav {...state.nav}/>
        <Poster {...state.poster}/>
        <PublicExhibitions {...state.publicExhibitions}/>
        <IndividualExhibitions {...state.individualExhibition}/>
        <Events {...state.event}/>
        <SchoolExhibition {...state.schoolExhibition}/>
        <Person {...state.person}/>
        <div style={{padding: "40px"}}/>
      </div>
    )
  }
}

import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {bindActionCreators} from "redux"

Home.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

Home = Radium(Home);

Home = connect(
  state => ({state: state.home}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(Home);

export default Home;
