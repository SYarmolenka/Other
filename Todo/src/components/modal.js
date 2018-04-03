import React, {Component} from 'react';
import {connect} from 'react-redux';
import {delModal} from '../actions/main';
import {update} from '../actions/data';
import local from '../local';
import {Form, Header, Button, Dimmer, Divider} from 'semantic-ui-react';

class ModalWindow extends Component {
  saveData = () => {
    let arr = this.props.data.map(obj => {
      if (obj.key === this.props.modal.key) {
        return Object.assign({}, obj, {description: this.message});
      }
      return obj;
    });
    let user;
    if (this.props.user) user = this.props.user.uid;
    local.write(`data`, {data: arr}, user);
    this.props.saveChanges(arr);
    this.props.hideModal();
  }
  render () {
    if (!this.props.modal) return null;
    const data = this.props.modal;
    data.dimmer = true;
    return (
      <Dimmer
        inverted
        active={data.dimmer}
        onClickOutside={this.props.hideModal}
        page>
        <Form id='modal' widths='equal'>
          <Divider
            inverted
            horizontal>
            Change Task
          </Divider>
          <Header
            textAlign='left'
            inverted
            content={`Title: ${data.title}`}/>
          <label
            className='white'>
            Description:
          </label>
          <Form.TextArea
            defaultValue={data.message}
            onChange={e => this.message = e.target.value}/>
          <Form.Field inline>
            <Button
              color='pink'
              onClick={this.props.hideModal}>
              Cancel
            </Button>
            <Button
              color='teal'
              onClick={this.saveData}>
              Save
            </Button>
          </Form.Field>
        </Form>
      </Dimmer>
    );
  };
};

ModalWindow = connect(
  state => ({
    data: state.data,
    modal: state.main.modal,
    user: state.main.user
  }),
  dispatch => ({
    hideModal() {
      dispatch(delModal());
    },
    saveChanges(...args){
      dispatch(update(...args));
    }
  })
)(ModalWindow);

export {ModalWindow};