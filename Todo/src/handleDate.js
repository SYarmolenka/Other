let getDate = (str) => {
  let match = str.match(/(\d+)\.(\d+)\.(\d+)/);
  return +new Date(+match[3], +match[2] - 1, +match[1]);
};
let getStrFromDate = (date) => {
  return date.toLocaleString(`ru`, {day: `numeric`, month: `numeric`, year: `numeric`});
};
let aDay = new Date(2018, 1, 12) - new Date(2018, 1, 11);

export {getDate, getStrFromDate, aDay};
