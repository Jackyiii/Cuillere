/*
 * @file reducers
 */

import { combineReducers } from 'redux';

import {routerReducer} from 'react-router-redux'
import home from './home';
import exhibition from './exhibition'
import artist from './artist'
import login from './login'

// import * as ActionTypes from '../actions';
//
// const initialState = {
//   modal: false,  // or "login", "createExhibition", "warning", etc
// };
//
// const { fulfilledOf } = ActionTypes;
//
// export default function (state = initialState, action) {
//   const { type, payload } = action;
//
//   switch (type) {
//     case fulfilledOf(ActionTypes.FETCH_HOME):
//       return payload;
//
//     default:
//       return state;
//   }
// }

export default combineReducers({
  home,
  exhibition,
  artist,
  login,
  routing: routerReducer
});
