import {NEW_DATA, UPDATE} from '../actions/data';

export const data = (state = [], action) => {
  if (action.type === NEW_DATA) return [...state, action.payload];
  if (action.type === UPDATE) return action.payload;
  return state;
};
