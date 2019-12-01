import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullSession = {
  currentUser: null
}

export default (state = _nullSession, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, { [action.user.id]: action.user });
      // return Object.assign({}, action.user );

    default:
      return state;
  }
}
