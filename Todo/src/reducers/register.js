import {E_MAIL, PASSWORD, MODAL_REGISTER} from '../actions/register';

const initState = {
  email: ``,
  password: ``,
  modal: false
};

export const register = (state = initState, action) => {
  if (action.type === E_MAIL) return Object.assign({}, state, {email: action.payload});
  if (action.type === PASSWORD) return Object.assign({}, state, {password: action.payload});
  if (action.type === MODAL_REGISTER) return Object.assign({}, state, {modal: action.payload});
  return state;
};
