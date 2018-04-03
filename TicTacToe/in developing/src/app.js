import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {MainMenu} from './components/mainMenu/mainMenu';
import {About} from './components/about';
import GameField from './components/field/gameField';
import ModalPlayerAI from './components/modals/modalPlayerAI';
import GameOver from './components/modals/gameOver';
import ModalPlPl from './components/modals/modalP&P';
import firebase from 'firebase';

export default class App extends Component {
  constructor (props) {
    super(props);
    const config = {
      apiKey: "AIzaSyAyKqRH2TjBtft8sIVpEcvvEXO9fhCT3Ag",
      authDomain: "tictactoe-32a88.firebaseapp.com",
      databaseURL: "https://tictactoe-32a88.firebaseio.com",
      projectId: "tictactoe-32a88",
      storageBucket: "tictactoe-32a88.appspot.com",
      messagingSenderId: "477675755906"
    };
    firebase.initializeApp(config);
  };
  render() {
    return (
      <div>
        <Route exact path='/' component={MainMenu} />
        <Route path='/about' component={About} />
        <Route path='/game' component={GameField} />
        <Route path='/modalpa' component={ModalPlayerAI} />
        <Route path='/over' component={GameOver} />
        <Route path='/modalpp' component={ModalPlPl} />
      </div>
    );
  };
};
