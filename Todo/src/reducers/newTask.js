import {getStrFromDate} from '../handleDate';
import {NEW_TASK_PRIORITY, NEW_TASK_DATE} from '../actions/newTask';

const initState = {
  priority: `1`,
  date: getStrFromDate(new Date())
};

export const newTask = (state = initState, action) => {
  if (action.type === NEW_TASK_PRIORITY) return Object.assign({}, state, {priority: action.payload});
  if (action.type === NEW_TASK_DATE) return Object.assign({}, state, {date: action.payload});
  return state;
};