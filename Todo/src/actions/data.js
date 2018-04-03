const NEW_DATA = `NEW_DATA`;
const UPDATE = `UPDATE`;


const newData = (newData) => ({
  type: NEW_DATA,
  payload: newData
});

const update = (data) => ({
  type: UPDATE,
  payload: data
});

export {NEW_DATA, UPDATE, newData, update};
