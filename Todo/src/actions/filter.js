const COMPL = `COMPLETED`;
const FROM = `FROM`;
const TO = `TO`;
const SEARCH = `SEARCH`;

const completed = (state) => ({
  type: COMPL,
  payload: state
});

const from = (date) => ({
  type: FROM,
  payload: date
});

const to = (date) => ({
  type: TO,
  payload: date
});

const search = (text) => ({
  type: SEARCH,
  payload: text
});

export {COMPL, FROM, TO, SEARCH, completed, from, to, search};