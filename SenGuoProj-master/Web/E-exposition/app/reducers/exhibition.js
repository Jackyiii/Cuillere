/*
 * @file reducers for editor
 */

import * as ActionTypes from '../actions';

const initialState = {
  fetching: false,
  options: [[], [], [], [],],
  exhibitions: {},
  exhibitionDetails: {},
};

const {fulfilledOf, pendingOf} = ActionTypes;

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case fulfilledOf(ActionTypes.FETCH_EXHIBITION_OPTIONS):
      return {...state, options: payload, fetching: false};

    case pendingOf(ActionTypes.FETCH_EXHIBITION_OPTIONS):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_EXHIBITIONS):
      return {...state, exhibitions: {...state.exhibitions, ...payload}, fetching: false};

    case pendingOf(ActionTypes.FETCH_EXHIBITIONS):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_EXHIBITION_DETAILS): {
      let res = {...state, fetching: false};
      res.exhibitionDetails[payload.expId] = payload;
      return res;
    }

    case pendingOf(ActionTypes.FETCH_EXHIBITION_DETAILS):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_EXHIBITION_SUB_DETAILS): {
      let res = {...state, fetching: false};
      if (!res.exhibitionDetails[payload.expId])
        res.exhibitionDetails[payload.expId] = {halls: []};

      if (!res.exhibitionDetails[payload.expId].halls)
        res.exhibitionDetails[payload.expId].halls = [];

      res.exhibitionDetails[payload.expId].halls[payload.hallIndex] = payload;
      return res;
    }

    case pendingOf(ActionTypes.FETCH_EXHIBITION_SUB_DETAILS):
      return {...state, fetching: true};

    default:
      return state;
  }
}
