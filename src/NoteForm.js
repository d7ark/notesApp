import React, { Component } from 'react';

import { StateConsumer } from './State';

let nextId = 0;

export class NoteForm extends Component {
  state = {
    value: 'Add a note in **markdown**',
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.addNote({
      date: Date.now(),
      id: ++nextId,
      text: this.state.value,
    });

    this.setState({ value: '' });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea
            className="NoteForm-textArea"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </label>
        <input type="submit" value="Add note" />
      </form>
    );
  }
}

class NoteFormWithState extends Component {
  render() {
    return (
      <StateConsumer>
        {appState => <NoteForm addNote={appState.addNote} />}
      </StateConsumer>
    );
  }
}

export default NoteFormWithState;
