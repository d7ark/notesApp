import React, { Component } from 'react';

import { StateConsumer } from './State';

let nextId = 0;

export class NoteForm extends Component {
  state = {
    value: 'Add a note in **markdown**',
  };

  textInput = React.createRef();

  componentDidMount () {
    const currentTextInput = this.textInput.current;
    currentTextInput.focus();
    currentTextInput.setSelectionRange(0, currentTextInput.value.length);
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.addNote({
      date: Date.now(),
      id: ++nextId,
      text: this.state.value,
    });

    this.setState({ value: '' });
    this.textInput.current.focus();
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
            ref={this.textInput}
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
