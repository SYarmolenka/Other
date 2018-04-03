const NEW_TASK_PRIORITY = `NEW_TASK_PRIORITY`;
const NEW_TASK_DATE = `NEW_TASK_DATE`;

const priority = (value) => ({
  type: NEW_TASK_PRIORITY,
  payload: value
});

const date = (value) => ({
  type: NEW_TASK_DATE,
  payload: value
});

export {NEW_TASK_PRIORITY, NEW_TASK_DATE, priority, date};