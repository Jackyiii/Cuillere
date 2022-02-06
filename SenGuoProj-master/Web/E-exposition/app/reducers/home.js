/*
 * @file reducers for editor
 */

import * as ActionTypes from '../actions';

const initialState = {
  fetching: false,
  poster: {
    mainMotto: "",
    subMotto: "",
    list: []
  },
  publicExhibitions: {
    mainMotto: "",
    list: []
  },
  individualExhibition: {
    mainMotto: "",
    list: []
  },
  event: {
    mainMotto: "",
    list: []
  },
  schoolExhibition: {
    mainMotto: "",
    list: []
  },
  person: {
    mainMotto: "",
    subMotto: "",
    list: []
  },
};

const {fulfilledOf, pendingOf} = ActionTypes;

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case fulfilledOf(ActionTypes.FETCH_HOME):
      return {...state, ...payload, fetching: false};

    case pendingOf(ActionTypes.FETCH_HOME):
      return {...state, fetching: true};

    default:
      return state;
  }
}
