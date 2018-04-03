import {combineReducers} from 'redux';
import {newTask} from './newTask';
import {data} from './data';
import {main} from './main';
import {filter} from './filter';
import {register} from './register';

export default combineReducers({
  main,
  data,
  newTask,
  filter,
  register
});
