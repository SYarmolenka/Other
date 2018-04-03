import {COMPL, FROM, TO, SEARCH} from '../actions/filter';

const initState = {
  completed: false,
  from: ``,
  to: ``,
  search: ``
};

export const filter = (state = initState, action) => {
  if (action.type === COMPL) return Object.assign({}, state, {completed: action.payload});
  if (action.type === FROM) return Object.assign({}, state, {from: action.payload});
  if (action.type === TO) return Object.assign({}, state, {to: action.payload});
  if (action.type === SEARCH) return Object.assign({}, state, {search: action.payload});
  return state;
};