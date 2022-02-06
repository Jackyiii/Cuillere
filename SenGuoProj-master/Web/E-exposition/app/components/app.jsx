import "./mainStyle.css";
import "./slick.css";
import "./slick-theme.css";

import React from "react";
import PropTypes from 'prop-types';
import Radium from "radium";
import ReactDOM from "react-dom";
import {Switch, Route} from "react-router-dom";
import Intl from "./intl/intl.jsx";
import Foot from "./foot";
import Home from "./home";
import Exhibition from "./exhibition";
import Artist from "./artist";
import CreateExhibition from "./exhibition/create";

class Main extends React.Component {
  constructor (props) {
    super(props);
    // set default languages from browser cookie
    Intl.updateLanguage();
  }

  render () {
    return (
      <div style={mainBodyStyle.defaultStyle}>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/exhibition**" component={Exhibition}/>
            <Route path="/artist/:id"  component={(props) => {
              return <Artist {...props.match.params}/>
            }}/>
            <Route exact path="/home" component={(props) => {
              return <Artist id={"0"}/>
            }}/>
            <Route exact path="/notification" component={(props) => {
              return <Artist id={"0"}/>
            }}/>
            <Route path="/upload"  component={(props) => {
              return <CreateExhibition/>
            }}/>
            <Route component={() => {return <div> 404 </div>}}/> //TODO 404 page
          </Switch>
        </div>
        <Foot/>
      </div>
    );
  }
}

let mainBodyStyle = {
  defaultStyle: {
    fontFamily: "Helvetica arial, sans-serif",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginLeft: "0px",
    marginRight: "0px",
    overflowX: "hidden"
  }
};
Main = Radium(Main);

import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers';
import {Provider} from 'react-redux';
import {withRouter} from "react-router"

const history = createHistory();

let prevLocation = {};
history.listen(location => {
  const pathChanged = prevLocation.pathname !== location.pathname;
  const hashChanged = prevLocation.hash !== location.hash;
  if (pathChanged || hashChanged) window.scrollTo(0, 0);
  prevLocation = location;
});

// create store with middlewares
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
    routerMiddleware(history)
  )),
);

const NonBlockMain = withRouter(Main);

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} onUpdate={() => window.scrollTo(0, 0)}>
          <NonBlockMain/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
