import Composer from 'react-composer';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';

import { GET_NOTES_QUERY } from './queries';
import NoteForm from './NoteForm';
import PreviousNotes from './PreviousNotes';

//TODO: NoteForm shouldnt wait for previous notes

class NotesPage extends Component {
  // no deleteallnotes function in launchpad
  onDeleteAllNotes = () => {};
  render() {
    const notes = this.props.notes || [];
    return (
      <div>
        <header className="App-header">
          <h1>Notes App</h1>
        </header>
        <NoteForm />
        {!!notes.length && (
          <PreviousNotes
            notes={notes}
            onDelete={this.props.deleteNote}
            onDeleteAll={this.onDeleteAllNotes}
          />
        )}
      </div>
    );
  }
}

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNoteMutation($id: String!) {
    deleteNote(id: $id) {
      deletedId
    }
  }
`;

class NotesPageWithBonuses extends Component {
  render() {
    return (
      <Composer
        components={[
          ({ render }) => <Query query={GET_NOTES_QUERY} children={render} />,
          ({ render }) => <Mutation mutation={DELETE_NOTE_MUTATION} children={render} />,
        ]}
      >
        {([allNotesResult, deleteNoteBase]) => {
          if (allNotesResult.loading) return <p>loading...</p>;
          if (allNotesResult.error) return <p>error occured</p>;

          const deleteNote = input =>
            deleteNoteBase({
              variables: input,
              update: (store, { data: { deleteNote: deleteNoteResponse } }) => {
                let notesQuery;
                try {
                  notesQuery = store.readQuery({ query: GET_NOTES_QUERY });
                } catch (error) {
                  // empty
                }
                if (notesQuery) {
                  notesQuery.notes = notesQuery.notes.filter(
                    note => note.id !== deleteNoteResponse.deletedId
                  );
                  store.writeQuery({
                    query: GET_NOTES_QUERY,
                    data: notesQuery,
                  });
                }
              },
            });
          return (
            <NotesPage
              notes={allNotesResult.data.notes}
              deleteNote={deleteNote}
              {...this.props}
            />
          );
        }}
      </Composer>
    );
  }
}

export default NotesPageWithBonuses;
