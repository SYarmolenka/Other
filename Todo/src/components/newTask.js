import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStrFromDate, aDay} from '../handleDate';
import {Form, Divider} from 'semantic-ui-react';
import {priority, date} from '../actions/newTask';
import {newData} from '../actions/data';
import local from '../local';

class NewTask extends Component {
  dateInArr () {
    let arrDays = [];
    let count = 0;
    for (let i = 0; i < 365; i++) {
      let day = getStrFromDate(new Date(Date.now() + count));
      count += aDay;
      arrDays.push({key: i, value: day, text: day});
    }
    this.defaultDate = arrDays[0].text;
    return arrDays;
  };
  addNewData = (e) => {
    e.preventDefault();
    let form = document.querySelector(`#add`);
    let title = document.querySelector(`#title`);
    if (title.value.trim() !== ``) {
      let obj = {};
      obj.done = false;
      obj.key = `${Date.now()}`;
      obj.title = title.value;
      title.value = ``;
      obj.priority = this.props.priority;
      obj.date = this.props.date;
      let task = form.querySelector(`#task`);
      obj.description = task.value;
      task.value = ``;
      let user;
      if (this.props.user) user = this.props.user.uid;
      local.write(`data`, {data: [...this.props.data, obj]}, user);
      this.props.addData(obj);
    }
  };
  render () {
    const priority = [
      {key: `1`, value: `1`, text: `Hight`},
      {key: `2`, value: `2`, text: `Medium`},
      {key: `3`, value: `3`, text: `Low`}
    ];
    return (
      <Form id='add' name='add'>
        <Divider inverted horizontal>New Task</Divider>
        <Form.Group widths='equal'>
          <Form.Input
            id='title'
            name='title'
            placeholder='Title...' />
          <Form.Select
            value={this.props.priority}
            name='priority'
            options={priority}
            onChange={(e, elem) => this.props.changePriority(elem.value)}/>
          <Form.Select
            value={this.props.date}
            name='date'
            options={this.dateInArr()}
            onChange={(e, elem) => this.props.changeDate(elem.value)}/>
        </Form.Group>
        <Form.TextArea
          id='task'
          widths='equal'
          name='description'
          placeholder='Description...'/>
        <Form.Field style={{textAlign: `right`}}>
          <Form.Button
            color='teal'
            type='submit'
            onClick={this.addNewData}>
            Add
          </Form.Button>
        </Form.Field>
      </Form>
    );
  };
};

NewTask = connect(
  state => ({
    data: state.data,
    priority: state.newTask.priority,
    date: state.newTask.date,
    user: state.main.user
  }),
  dispatch => ({
    changePriority(...args) {dispatch(priority(...args))},
    changeDate(...args) {dispatch(date(...args))},
    addData(...args) {dispatch(newData(...args))}
  })
)(NewTask);

export {NewTask};