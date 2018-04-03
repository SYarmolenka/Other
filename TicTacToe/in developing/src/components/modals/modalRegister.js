import React, {Component} from 'react';
import {Modal, Input, Button, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {change} from '../../actions/register';
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
  };
  render () {
    return (
      <Modal size='mini' className='register' open={true} onClose={false}>
        <Modal.Header>
          Registration
        </Modal.Header>
        <Modal.Content>
          <Input fluid type='text' value={this.props.email} placeholder='E-mail...' onChange={e => this.props.change('email', e.target.value)} />
          <Input fluid type='password' value={this.props.password} placeholder='Password...' onChange={e => this.props.change(e.value)} />
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
    password: state.register.password
  }),
  {change}
)(Register);