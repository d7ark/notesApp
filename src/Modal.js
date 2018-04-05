import React, { Component } from 'react';
import ReactModal from 'react-modal';

import NoteForm from './NoteForm';

class Modal extends Component {
  state = {
    open: false,
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  listenKeyCombination = event => {
    const mCodePoints = ['m'.codePointAt(0), 'M'.codePointAt(0)];
    if (event.ctrlKey && mCodePoints.indexOf(event.keyCode) !== -1) {
      event.preventDefault();
      this.setState({ open: true });
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.listenKeyCombination, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenKeyCombination, false);
  }

  render() {
    return (
      <div>
        <ReactModal
          contentLabel="Minimal Modal"
          isOpen={this.state.open}
          onRequestClose={this.handleCloseModal}
        >
          <NoteForm />
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
