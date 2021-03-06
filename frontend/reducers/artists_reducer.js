import {RECEIVE_ARTISTS} from '../actions/artist_actions';

export default (state= {}, action) => {
  Object.freeze(state);
  let newState = { ...state } 
  switch (action.type) {
    case RECEIVE_ARTISTS:
      return action.artists
    default: 
      return state;
  }
}