/*
 * @file reducers for editor
 */

import * as ActionTypes from '../actions';

const initialState = {
  fetching: false,
  mainMotto: "",
  subMotto: "",
  section: "global",
  segmentId: null,
  options: [[], [], [],],
  artists: {},

  notification: {},
  following: [],
  follower: []
};

const {fulfilledOf, pendingOf} = ActionTypes;

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case fulfilledOf(ActionTypes.FETCH_ARTIST_OPTIONS):
      return {...state, ...payload, fetching: false};

    case pendingOf(ActionTypes.FETCH_ARTIST_OPTIONS):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_ARTISTS):
      return {...state, ...payload, artists: {...state.artists, ...payload.artists}, fetching: false};

    case pendingOf(ActionTypes.FETCH_ARTISTS):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_ARTIST): {
      let res = {...state, fetching: false};
      res.artists[payload.id] = payload;
      return res;
    }

    case pendingOf(ActionTypes.FETCH_ARTIST):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_FOLLOWER): {
      return {...state, follower: payload, fetching: false};
    }

    case pendingOf(ActionTypes.FETCH_FOLLOWER):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_FOLLOWING): {
      return {...state, following: payload, fetching: false};
    }

    case pendingOf(ActionTypes.FETCH_FOLLOWING):
      return {...state, fetching: true};

    case fulfilledOf(ActionTypes.FETCH_NOTIFICATION):
      return {...state, notification: payload, fetching: false};

    case pendingOf(ActionTypes.FETCH_NOTIFICATION):
      return {...state, fetching: true};

    default:
      return state;
  }
}
