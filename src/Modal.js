import React, { Component } from 'react';
import ReactModal from 'react-modal';

import NoteForm from './NoteForm';

const M_CODE_POINTS = new Set(['m'.codePointAt(0), 'M'.codePointAt(0)]);

class Modal extends Component {
  state = {
    open: false,
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleKeyDown = event => {
    if (event.ctrlKey && M_CODE_POINTS.has(event.keyCode)) {
      event.preventDefault();
      this.setState({ open: true });
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, false);
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
