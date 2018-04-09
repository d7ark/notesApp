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

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextValue = nextProps.note ? nextProps.note.text : '';
    if (nextValue === prevState.value) {
      return null;
    }
    return { value: nextValue };
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
        <input
          type="submit"
          value={this.props.buttonText ? this.props.buttonText : 'Add note'}
        />
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

export class NoteFormForEditting extends Component {
  render() {
    return (
      <Mutation mutation={UPDATE_NOTE_MUTATION}>
        {updateNoteBase => {
          const updateNote = input =>
            updateNoteBase({
              variables: {
                id: this.props.note.id,
                input: { text: input.text },
              },
              optimisticResponse: {
                __typename: 'Mutation',
                updateNote: {
                  __typename: 'UpdateNotePayload',
                  note: {
                    __typename: 'Note',
                    id: this.props.note.id,
                    text: input.text,
                  },
                },
              },
            });
          return (
            <NoteForm
              buttonText="Save note"
              note={this.props.note}
              onSubmit={updateNote}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default NoteFormWithState;
