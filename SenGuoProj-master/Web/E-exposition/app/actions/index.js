/*
 * @file actions
 */

import {API as api} from '../externalStates/api';
// sync actions
// export const SELECT_ENTRY = 'SHOW_LOGIN';
// export const CREATE_NEW_ENTRY = 'CREATE_NEW_ENTRY';
// export const EDIT_ENTRY = 'EDIT_ENTRY';
// export const CANCEL_EDIT = 'CANCEL_EDIT';

// export function selectEntry(id) {
//   return dispatch => {
//     dispatch({
//       type: SELECT_ENTRY,
//       payload: id,
//     });
//
//     dispatch(fetchEntry(id));
//   };
// }
//
// export function createNewEntry() {
//   return { type: CREATE_NEW_ENTRY };
// }
//
// export function editEntry(id) {
//   return {
//     type: EDIT_ENTRY,
//     payload: id,
//   };
// }
//
// export function cancelEdit() {
//   return { type: CANCEL_EDIT };
// }

// default promiseTypeSuffixes of redux-promise-middleware:
// ['PENDING', 'FULFILLED', 'REJECTED']
export const pendingOf = actionType => `${actionType}_PENDING`;
export const fulfilledOf = actionType => `${actionType}_FULFILLED`;
export const rejectedOf = actionType => `${actionType}_REJECTED`;

// async actions generated with redux-promise-middleware:
export const FETCH_HOME = 'FETCH_HOME';
export const FETCH_EXHIBITION_OPTIONS = 'FETCH_EXHIBITION_OPTIONS';
export const FETCH_EXHIBITIONS = 'FETCH_EXHIBITIONS';
export const FETCH_EXHIBITION_DETAILS = 'FETCH_EXHIBITION_DETAILS';
export const FETCH_EXHIBITION_SUB_DETAILS = 'FETCH_EXHIBITION_SUB_DETAILS';
export const FETCH_ARTIST_OPTIONS = 'FETCH_ARTIST_OPTIONS';
export const FETCH_ARTISTS = 'FETCH_ARTISTS';
export const FETCH_ARTIST = 'FETCH_ARTIST';
export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION';
export const FETCH_COUNTRY = 'FETCH_COUNTRY';
export const FETCH_AREA = 'FETCH_AREA';
export const FETCH_FOLLOWER = 'FETCH_FOLLOWER';
export const FETCH_FOLLOWING = 'FETCH_FOLLOWING';

export const LOGIN = 'LOGIN';
// export const SAVE_ENTRY = 'SAVE_ENTRY';
// export const DELETE_ENTRY = 'DELETE_ENTRY';
//
// export function fetchEntry(id) {
//   return {
//     type: FETCH_ENTRY,
//     payload: {
//       promise: storage.getEntry(id),
//       data: id,
//     },
//   };
// }
//
export function fetchHome() {
  return {
    type: FETCH_HOME,
    payload: api.fetch.home(),
  };
}
export function fetchExhibitionOptions() {
  return {
    type: FETCH_EXHIBITION_OPTIONS,
    payload: api.fetch.exhibitionOptions(),
  };
}
export function fetchExhibitions(section) {
  return {
    type: FETCH_EXHIBITIONS,
    payload: api.fetch.exhibitions(section),
  };
}
export function fetchExhibitionDetails(section, id) {
  return {
    type: FETCH_EXHIBITION_DETAILS,
    payload: api.fetch.exhibitionDetails(section, id),
  };
}
export function fetchExhibitionSubDetails(section, id, index) {
  return {
    type: FETCH_EXHIBITION_SUB_DETAILS,
    payload: api.fetch.exhibitionSubDetails(section, id, index),
  };
}
export function fetchArtistOptions() {
  return {
    type: FETCH_ARTIST_OPTIONS,
    payload: api.fetch.artistOptions()
  };
}
export function fetchArtists(section, segId) {
  return {
    type: FETCH_ARTISTS,
    payload: api.fetch.artists(section, segId)
  };
}
export function fetchArtist(id) {
  return {
    type: FETCH_ARTIST,
    payload: api.fetch.artist(id)
  };
}
export function fetchCountry() {
  return {
    type: FETCH_COUNTRY,
    payload: api.fetch.country()
  };
}
export function fetchArea(country) {
  return {
    type: FETCH_AREA,
    payload: api.fetch.area(country)
  };
}
export function clearArea() {
  return {
    type: FETCH_AREA,
    payload: Promise.resolve([{label: "Area", value: "-"}])
  };
}
export function fetchNotification(id) {
  return {
    type: FETCH_NOTIFICATION,
    payload: api.fetch.notification(id)
  };
}
//
// export function saveEntry(entry) {
//   const promise = entry.id
//     ? storage.updateEntry(
//       entry.id,
//       entry.title,
//       entry.content
//     )
//     : storage.insertEntry(
//       entry.title,
//       entry.content
//     );
//
//   return dispatch => {
//     dispatch({
//       type: SAVE_ENTRY,
//       payload: {
//         promise,
//         data: entry,
//       },
//     });
//
//     promise.then(
//       () => dispatch(fetchEntryList())
//     );
//   };
// }
//
// export function deleteEntry(id) {
//   const promise = storage.deleteEntry(id).then(() => id);
//
//   return dispatch => {
//     dispatch({
//       type: DELETE_ENTRY,
//       payload: {
//         promise,
//         data: id,
//       },
//     });
//
//     promise.then(
//       () => dispatch(fetchEntryList())
//     );
//   };
// }
