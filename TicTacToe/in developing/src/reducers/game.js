import {PLAYER_STEP, SET_MODE, UPDATE} from '../actions/game';
import {judge} from '../game/judge';
import {improveArray} from '../game/changeArray';
import local from '../game/local';

// const history = [];

const initState = {
  field: new Array(5).fill(0).map(elem => new Array(5).fill(0)),
  cell: 30,
  lastCell: new Array(2),
  currentFigure: 'X',
  gameOver: false,
  offsetField: [0, 0],
  player1: false,
  player2: false,
  AI1: false,
  AI2: false,
  online: false,
  level: false,
  names: new Array(2)
};

export const game = (state = initState, action) => {
  if (action.type === PLAYER_STEP) {
    if (state.field[action.y][action.x] === 'X' || state.field[action.y][action.x] === 'O' || state.gameOver) return state;
    let offsetField, lastCell;
    const arr = JSON.parse(JSON.stringify(state.field));
    let currentFigure = state.currentFigure;
    arr[action.y][action.x] = currentFigure;
    const gameOver = judge(action.x, action.y, currentFigure, arr);
    if (gameOver) {
      lastCell = new Array(2);
      offsetField = [0, 0];
    } else {
      offsetField = improveArray(action.x, action.y, arr, true);
      lastCell = [action.x + offsetField[0], action.y + offsetField[1]];
      currentFigure = currentFigure === 'O' ? 'X' : 'O';
    };
    const total = {...state, field: arr, lastCell, offsetField, gameOver, currentFigure};
    local('tictactoe', total);
    local('tictactoe_history', arr, true);
    return total;
  };
  if (action.type === UPDATE) return action.payload;
  if (action.type === SET_MODE) return {...state, [action.name]: action.value};
  return state;
};

// export const game = (state = initState, action) => {
//   if (action.type === PLAYER_STEP) {
//     let offset = [0, 0];
//     let currentFigure = state.currentFigure;
//     const arr = JSON.parse(JSON.stringify(state.field));
//     arr[action.y][action.x] = currentFigure;
//     const gameOver = judge(action.x, action.y, currentFigure, arr);
//     if (!gameOver) {
//       offset = improveArray(action.x, action.y, arr, true);
//       currentFigure = currentFigure === 'O' ? 'X' : 'O';
//     };
//     const total = {...state, field: arr, player: !state.player, gameOver, offset, currentFigure};
//     local('game', total);
//     return total;
//   };
//   if (action.type === UPDATE) return Object.assign({}, state, action.payload);
//   return state;
// };
