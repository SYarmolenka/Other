const MESSAGE = `MESSAGE`;
const MODAL = `MODAL`;
const NO_MESSAGE = `NO_MESSAGE`;
const NO_MODAL = `NO_MODAL`;
const CURRENT_USER = `CURRENT_USER`;

const message = (elem, title, message) => {
  let args = {elem, title, message};
  return ({
    type: MESSAGE,
    payload: args
  });
};

const delMessage = () => ({type: NO_MESSAGE});

const modal = (key, title, message) => {
  let args = {key, title, message};
  return ({
    type: MODAL,
    payload: args
  });
};

const delModal = () => ({type: NO_MODAL});

const currentUser = (user) => ({
  type: CURRENT_USER,
  payload: user
});

export {MESSAGE, MODAL, NO_MESSAGE, NO_MODAL, CURRENT_USER, message, modal, delMessage, delModal, currentUser};
