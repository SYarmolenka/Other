import React, {Component} from 'react';
import HeaderToDo from './components/header/index';
import {NewTask} from './components/newTask';
import {Filter} from './components/filter';
import {Table} from './components/table';
import {Message} from './components/message';
import {ModalWindow} from './components/modal';
import firebase from 'firebase';

export class App extends Component {
  constructor (props) {
    super(props);
    const config = {
      apiKey: "AIzaSyBW53NKAHfUPSBUH-gKm1FJwcnEgyLR_GU",
      authDomain: "todoyarmolenka.firebaseapp.com",
      databaseURL: "https://todoyarmolenka.firebaseio.com",
      projectId: "todoyarmolenka",
      storageBucket: "",
      messagingSenderId: "941077675011"
    };
    firebase.initializeApp(config);
  }
  render () {
    return (
      <div id="todo">
        <HeaderToDo />
        <NewTask />
        <Filter />
        <Table />
        <Message />
        <ModalWindow />
      </div>
    );
  };
};
