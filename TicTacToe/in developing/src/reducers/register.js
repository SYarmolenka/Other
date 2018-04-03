import {CHANGE_REG} from '../actions/register';

export const changeValue = (state = {email: '', password: ''}, action) => {
  if (action.type === CHANGE_REG) return {...state, [action.name]: action.value};
  return state;
};
