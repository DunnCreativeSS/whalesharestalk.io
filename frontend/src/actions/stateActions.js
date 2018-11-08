import * as types from './actionTypes';
//import * as steem from 'steem';
//import steem from 'steem';
import * as steem from '@whaleshares/wlsjs';


export function getState(path) {
  return dispatch => {
    steem.api.getState(path, function(err, data) {
      dispatch(getStateResolved(data))
    })
  }
}

export function getStateResolved(payload) {
  return {
    type: types.STATE_RESOLVED,
    payload: payload
  }
}
