import {MESSAGE, MODAL, NO_MESSAGE, NO_MODAL, CURRENT_USER} from '../actions/main';

const initState = {
  message: false,
  modal: false
};

export const main = (state = initState, action) => {
  if (action.type === MESSAGE) return Object.assign({}, state, {message: action.payload});
  if (action.type === NO_MESSAGE) return Object.assign({}, state, {message: false});
  if (action.type === MODAL) return Object.assign({}, state, {modal: action.payload});
  if (action.type === NO_MODAL) return Object.assign({}, state, {modal: false});
  if (action.type === CURRENT_USER) return Object.assign({}, state, {user: action.payload});
  return state;
};
