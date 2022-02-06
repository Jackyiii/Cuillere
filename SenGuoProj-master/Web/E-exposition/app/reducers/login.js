/*
 * @file reducers for editor
 */

import * as ActionTypes from '../actions';

const initialState = {
  userId: "1",   // TODO turn to null when truly implemented
  avatar: require("../components/defaultAvatar.png"),
  country: [],
  area: [],
  fetching: false
};

const {fulfilledOf, pendingOf} = ActionTypes;

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ActionTypes.LOGIN:
      return {...state, ...payload};

    case fulfilledOf(ActionTypes.FETCH_COUNTRY):
      return {...state, fetching: false, country:payload};

    case pendingOf(ActionTypes.FETCH_COUNTRY):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_AREA):
      return {...state, fetching: false, area:payload};

    case pendingOf(ActionTypes.FETCH_AREA):
      return {...state, fetching: true};

    default:
      return state;
  }
}
