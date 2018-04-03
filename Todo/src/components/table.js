import React, {Component} from 'react';
import {connect} from 'react-redux';
import local from '../local';
import {update} from '../actions/data';
import {message, delMessage, modal, currentUser} from '../actions/main';
import {getDate} from '../handleDate';
import {Icon, Checkbox} from 'semantic-ui-react';
import {Table as Excel} from 'semantic-ui-react';
import firebase from 'firebase';

class Table extends Component {
  constructor (props) {
    super(props);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        local.read(`data`, user.uid).then(obj => {
          if (obj !== null) this.props.update(obj.data);
        });
      } else {
        this.props.setUser(false);
        local.read(`data`).then(obj => {
          if (obj !== null) this.props.update(obj.data);
        });
      }
    });
    this.arr = [`Done`, `Title`, `Priority`, `Date`];
  };
  saveRemote(newData) {
    let user;
    if (this.props.main.user) user = this.props.main.user.uid;
    local.write(`data`, {data: newData}, user);
  };
  clickThead = (e) => {
    if (e.target.closest(`.up`)) {
      this.sort(e.target.closest(`th`).id.toLowerCase(), `up`);
    };
    if (e.target.closest(`.down`)) {
      this.sort(e.target.closest(`th`).id.toLowerCase(), `down`);
    };
  };
  changeDone (key) {
    let arr = [...this.props.data];
    arr.forEach(obj => {
      if (obj.key === key) {obj.done = !obj.done};
    });
    this.saveRemote(arr);
    this.props.update(arr);
  };
  dataFilter () {
    const filters = this.props.filter;
    const from = filters.from === `` ? false : getDate(filters.from);
    const to = filters.to === `` ? false : getDate(filters.to);
    const search = filters.search.toLowerCase();
    let data = this.props.data
      .filter(obj => {
        if(!obj.done || (obj.done && filters.completed)) return true;
      })
      .filter(obj => {
        if (getDate(obj.date) >= from && !to) return true;
        if (!from && getDate(obj.date) <= to) return true;
        if (getDate(obj.date) >= from && getDate(obj.date) <= to) return true;
        if (!from && !to) return true;
        return false;
      })
      .filter(obj => {
        if (search !== ``) {
          if (obj.title.toLowerCase().indexOf(search) >= 0 || obj.description.toLowerCase().indexOf(search) >= 0) return true;
        } else {
          return true;
        };
      });
      return data
  };
  sort (name, dir) {
    let data = [...this.props.data];
    if (name !== `date`) {
      data.sort((a, b) => {
        let res = a[name] <= b[name] ? 1 : -1;
        if (dir === `up`) res *= -1;
        return res;
      });
    } else {
      data.sort((a, b) => {
        let res = getDate(a[name]) >= getDate(b[name]) ? 1 : -1;
        if (dir === `up`) res *= -1;
        return res;
      });
    }
    this.props.update(data);
  }
  delete = (key) => {
    let arr = this.props.data.filter(obj => {
      if (obj.key !== key) return true;
    });
    this.saveRemote(arr);
    this.props.update(arr);
  }
  createHead () {
    let arr = [];
    this.arr.forEach(name => {
      arr.push(
        <Excel.HeaderCell
          className='theadCell'
          id={name}
          key={name}>
          <div
            className='thead'>
            <span>
              {name}
            </span>
            <span>
              <label
                className='up'>
                <Icon name='caret up' />
              </label>
              <label
                className='down'>
                <Icon name='caret down' />
              </label>
            </span>
          </div>
        </Excel.HeaderCell>
      );
    });
    return arr;
  };
  createBody () {
    let arr = [];
    this.dataFilter().forEach((obj) => {
      arr.push(
        <Excel.Row key={obj.key}>
          <Excel.Cell
            textAlign='center'
            width='2'>
            <Checkbox
              className='done'
              defaultChecked={obj.done}
              onChange={_ => { this.changeDone(obj.key); }}/>
          </Excel.Cell>
          <Excel.Cell
            onMouseOver={e => this.props.showMessage(e.target, obj.title, obj.description)}
            onMouseOut={this.props.hideMessage}
            onDoubleClick={e => this.props.showModal(obj.key, obj.title, obj.description)}>
            <div className='title'>
              {obj.title}
              <label onClick={_ =>this.delete(obj.key)}>
                <Icon
                  className='delete'
                  name='remove circle'
                  inverted
                  color='red'/>
              </label>
            </div>
          </Excel.Cell>
          <Excel.Cell
            width='3'
            textAlign='center'>{
            (() => {
              if (obj.priority === `1`) return `Hight`;
              if (obj.priority === `2`) return `Medium`;
              if (obj.priority === `3`) return `Low`;
            })()}
          </Excel.Cell>
          <Excel.Cell
            width='3'
            textAlign='center'>
            {obj.date}
          </Excel.Cell>
        </Excel.Row>
      );
    });
    return arr;
  };
  render () {
    return (
      <Excel celled inverted>
        <Excel.Header onClick={this.clickThead}>
          <Excel.Row>
            {this.createHead()}
          </Excel.Row>
        </Excel.Header>
        <Excel.Body onClick={this.clickThead}>
          {this.createBody()}
        </Excel.Body>
      </Excel>
    );
  };
};

Table = connect(
  state => ({
    data: state.data,
    filter: state.filter,
    main: state.main
  }),
  dispatch => ({
    update(...args) {dispatch(update(...args))},
    showMessage(...args) {dispatch(message(...args))},
    hideMessage() {dispatch(delMessage())},
    showModal(...args) {dispatch(modal(...args))},
    setUser(user) {dispatch(currentUser(user))}
  })
)(Table);

export {Table};