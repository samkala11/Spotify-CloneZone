import { RECEIVE_ALBUMS } from '../actions/album_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = { ...state }
  switch (action.type) {
    case RECEIVE_ALBUMS:
      return action.albums
    default:
      return state;
  }

  
}