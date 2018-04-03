import React, {Component} from 'react';
import {connect} from 'react-redux';
import {completed, from, to, search} from '../actions/filter';
import {getDate, getStrFromDate, aDay} from '../handleDate';
import {Form, Divider} from 'semantic-ui-react';

class Filter extends Component {
  clickFilter = (e) => this.props.changeCompleted(e.target.checked);
  insertDates (from, to) {
    let arr = [];
    let dates = [];
    this.props.data.forEach(obj => arr.push(getDate(obj.date)));
    arr.sort((a, b) => a - b);
    from = from ? getDate(from) : arr[0];
    to = to ? getDate(to) : arr[arr.length - 1];
    for (let i = from; i <= to; i += aDay) {
      dates.push({key: i, value: getStrFromDate(new Date(i)), text: getStrFromDate(new Date(i))});
      if (i === arr[0]) this.defaultFrom = getStrFromDate(new Date(i));
      if (i === arr[arr.length - 1]) this.defaultTo = getStrFromDate(new Date(i));
    };
    return dates;
  }
  defineLimit (e, elem) {
    this[elem.name] = elem.value;
  }
  render () {
    this.insertDates();
    const from = this.from || this.defaultFrom;
    const to = this.to || this.defaultTo;
    return (
      <Form inverted name="filter" id="filter">
      <Divider inverted horizontal>Filter</Divider>
        <Form.Group widths='equal'>
          <Form.Checkbox
            id='completed'
            label='Show completed'
            onClick={(e, elem) => this.props.changeCompleted(elem.checked)}/>
          <Form.Select
            name='from'
            placeholder='From'
            value={from}
            options={this.insertDates(undefined, this.to)}
            onChange={(e, elem) => {this.defineLimit(e, elem); this.props.changeFrom(elem.value)}}/>
          <Form.Select
            name='to'
            placeholder='To'
            value={to}
            options={this.insertDates(this.from)}
            onChange={(e, elem) => {this.defineLimit(e, elem); this.props.changeTo(elem.value)}}/>
        </Form.Group>
        <Form.Input
          name="search"
          placeholder='Search...'
          onInput={e => this.props.changeSearch(e.target.value)}/>
      </Form>
    );
  };
};

Filter = connect(
  state => ({
    data: state.data,
    filter: state.filter
  }),
  dispatch => ({
    changeCompleted(...args) {dispatch(completed(...args))},
    changeFrom(...args) {dispatch(from(...args))},
    changeTo(...args) {dispatch(to(...args))},
    changeSearch(...args) {dispatch(search(...args))}
  })
)(Filter);

export {Filter};