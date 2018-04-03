import React, {Component} from 'react';
import {Modal, Input, Button, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {changeEmail, changePassword, modalRegister} from '../../actions/register';
import firebase from 'firebase';

class Register extends Component {
  registerEmail = () => {
    const email = this.props.email;
    const password = this.props.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(function(error) {
            alert(`Mistake!
            Your name of email or password have mistake
            or
            A user with such email is already exist
            or
            You sign in with password, but you have already registered without the password early`
            );
        });
      });
    this.props.changeEmail(``);
    this.props.changePassword(``);
    this.props.hideModal();
  };
  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    this.props.hideModal();
  };
  render () {
    return (
      <Modal size='mini' className='register' open={this.props.modal} onClose={_ => this.props.hideModal()}>
        <Modal.Header>
          Registration
        </Modal.Header>
        <Modal.Content>
          <Input ref={(elem) => this.input = elem} fluid type='text' value={this.props.email} placeholder='E-mail...' onChange={(a, e) => this.props.changeEmail(e.value)} />
          <Input fluid type='password' value={this.props.password} placeholder='Password...' onChange={(a, e) => this.props.changePassword(e.value)} />
          <Button fluid color='green' onClick={this.registerEmail}>Register/Sign In</Button>
          <Divider horizontal>Or</Divider>
          <Button color='red' fluid onClick={this.signInWithGoogle}>Sign in with Google+</Button>
        </Modal.Content>
      </Modal>
    );
  };
};

export default connect(
  state => ({
    email: state.register.email,
    password: state.register.password,
    modal: state.register.modal
  }),
  dispatch => ({
    hideModal() {dispatch(modalRegister(false))},
    changeEmail(data) {dispatch(changeEmail(data))},
    changePassword(data) {dispatch(changePassword(data))}
  })
)(Register);