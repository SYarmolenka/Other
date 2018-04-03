const E_MAIL = 'E_MAIL';
const PASSWORD = 'PASSWORD';
const MODAL_REGISTER = 'MODAL_REGISTER';

const changeEmail = (data) => ({
  type: E_MAIL,
  payload: data
});

const changePassword = (data) => ({
  type: PASSWORD,
  payload: data
});

const modalRegister = (data) => ({
  type: MODAL_REGISTER,
  payload: data
});

export {E_MAIL, PASSWORD, MODAL_REGISTER, changeEmail, changePassword, modalRegister};
