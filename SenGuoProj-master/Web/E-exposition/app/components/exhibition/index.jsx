/**
 * Created by zhaojunbo on 2017/7/14.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import ExhibitionDetail from "./level1/exhibitionDetail.jsx";
import ExhibitionSubDetail from "./level2/exhibitionSubDetail.jsx";
import Exhibitions from "./level0";
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {bindActionCreators} from "redux"

class Exhibition extends React.Component {
  constructor (props) {
    super(props);

    this.preExhibitionLoc = props.location;
  }

  componentWillMount () {
    this.props.actions.fetchExhibitionOptions();
  }

  componentWillUpdate (nextProps) {
    if (nextProps.history.action !== 'POP' && !this.isModal()) {
      this.preExhibitionLoc = this.props.location;
    }
  }

  isModal () {
    const {pathname} = this.props.location;
    return (pathname.includes("/exhibition/") && !pathname.includes("/exhibitions/"))
  }

  render () {
    let state = this.props.state;
    if (state.fetching) {
      return null
    }

    const {location} = this.props;

    if (this.isModal())
      return <Switch>
        <Route path="/exhibition/:section/:id/">
          <div>
            <Route exact path="/exhibition/:section/:id/" component={(props) => {
              return <ExhibitionDetail {...props.match.params}/>
            }}/>
            <Route path="/exhibition/:section/:id/detail/:index" component={(props) => {
              return <ExhibitionSubDetail {...props.match.params}/>
            }}/>
          </div>
        </Route>
      </Switch>;
    else
      return <Switch location={this.isModal() ? this.preExhibitionLoc : location}>
        <Route exact path="/exhibitions/" render={() => {
          return <Exhibitions options={state.options} section={"global"}/>
        }}/>

        <Route path="/exhibitions/:section" render={(props) => {
          return <Exhibitions options={state.options} section={props.match.params.section}/>
        }}/>
      </Switch>;
  }
}

Exhibition.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

Exhibition = Radium(Exhibition);

Exhibition = connect(
  state => ({state: state.exhibition}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(Exhibition);

export default Exhibition;
