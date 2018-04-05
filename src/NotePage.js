import React, { Component } from 'react';

import Note from './Note';
import { StateConsumer } from './State';

export class NotePage extends Component {
  handleDelete = noteId => {
    this.props.deleteNoteById(noteId);
    this.props.history.replace('/');
  };
  render() {
    const { note } = this.props;
    if (!note) {
      return <p>Nie ma takiej podstrony. 404.</p>;
    }
    return <Note note={note} onDelete={this.handleDelete} />;
  }
}

class NotePageWithState extends Component {
  render() {
    return (
      <StateConsumer>
        {appState => (
          <NotePage
            {...this.props}
            deleteNoteById={appState.deleteNoteById}
            note={appState.getNoteById(this.props.match.params.noteId)}
          />
        )}
      </StateConsumer>
    );
  }
}

export default NotePageWithState;
