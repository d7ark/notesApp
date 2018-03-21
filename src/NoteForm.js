import React, { Component } from 'react';

let nextId = 0;

class NoteForm extends Component {
  state = {
    value: 'Add a note in **markdown**',
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onAddNote({
      text: this.state.value,
      date: Date.now(),
      id: ++nextId,
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

export default NoteForm;
