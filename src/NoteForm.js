import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';

export class NoteForm extends Component {
  state = {
    value: 'Add a note in **markdown**',
  };

  textInput = React.createRef();

  componentDidMount() {
    const currentTextInput = this.textInput.current;
    if (currentTextInput) {
      currentTextInput.focus();
      currentTextInput.setSelectionRange(0, currentTextInput.value.length);
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit({
      text: this.state.value,
    });

    this.setState({ value: '' });
    if (this.textInput.current) {
      this.textInput.current.focus();
    }
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

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNoteMutation($input: NoteInput!) {
    createNote(input: $input) {
      note {
        id
        createdAt
        text
      }
    }
  }
`;

class NoteFormWithState extends Component {
  render() {
    return (
      <Mutation mutation={CREATE_NOTE_MUTATION}>
        {createNoteBase => {
          const createNote = input => createNoteBase({ variables: { input } });
          return <NoteForm onSubmit={createNote} />;
        }}
      </Mutation>
    );
  }
}

const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNoteMutation($id: String!, $input: NoteInput!) {
    updateNote(id: $id, input: $input) {
      note {
        id
        createdAt
        text
      }
    }
  }
`;

// TODO: change button text
// TODO: decorate data sent in handleSubmit to contain id + input
// TODO: sent noteId down or think of better way
export class NoteFormForEditting extends Component {
  render() {
    return (
      <Mutation mutation={UPDATE_NOTE_MUTATION}>
        {updateNote => (
          <NoteForm onSubmit={updateNote} startValue={this.props.startValue} />
        )}
      </Mutation>
    );
  }
}

export default NoteFormWithState;
