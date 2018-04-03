import {CHANGE_REG} from '../actions/register';

export const register = (state = {email: '', password: '', user: false}, action) => {
  if (action.type === CHANGE_REG) return {...state, [action.name]: action.value};
  return state;
};
