import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Message as Letter} from 'semantic-ui-react';

class Message extends Component {
  getCoords (elem) {
    if (elem.matches(`.delete`)) return;
    elem = elem.closest(`td`);
    const coords = elem.getBoundingClientRect();
    const x = coords.left + window.pageXOffset - 1;
    const y = coords.bottom + window.pageYOffset - 1;
    const width = elem.parentNode.getBoundingClientRect().right - x;
    return {x, y, width};
  };
  render () {
    if (!this.props.message) return null;
    const data = this.props.message;
    const coords = this.getCoords(data.elem);
    if (!coords) return null;
    return (
      <Letter
        className='message'
        style={{top: `${coords.y}px`, left: `${coords.x}px`, maxWidth: `${coords.width}px`}}>
        <Letter.Header>
          {data.title}
        </Letter.Header>
        <p>
          {data.message}
        </p>
      </Letter>
    );
  };
};

Message = connect(
  state => ({
    message: state.main.message
  }),
)(Message);

export {Message};