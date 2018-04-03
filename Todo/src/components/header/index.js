import React, { Component } from 'react';
import {Header, Image, Button} from 'semantic-ui-react';
import Register from './modal';
import {connect} from 'react-redux';
import {modalRegister} from '../../actions/register';
import firebase from 'firebase';

class HeaderToDo extends Component {
  signOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      alert(`${error.code}
        ${error.message}`
      );
    });
  };
  render() {
    return (
      <Header inverted as='h5' block className='headerToDo'>
        <Image circular src={(_ => {
          if (this.props.user && this.props.user.photoURL) return this.props.user.photoURL;
          return `data:image/png;base64,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`;
        })()}/>
        <span>{(_ => {
          if (this.props.user) return this.props.user.displayName || this.props.user.email;
          return `The user is not register`;
        })()}</span>
        <Header.Content className='HeadButtons'>
          {(_ => {if (!this.props.user) return <Button inverted onClick={this.props.showModal}>Sign In</Button>})()}
          <Button inverted onClick={this.signOut}>Sign Out</Button>
        </Header.Content>
        <Register />
      </Header>
    );
  };
};

export default connect(
  state => ({
    user: state.main.user
  }),
  dispatch => ({
    showModal() {dispatch(modalRegister(true))}
  }))(HeaderToDo);
