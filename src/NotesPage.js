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

class NotesPageWithState extends React.Component {
  render() {
    return (
      <Query query={GET_NOTES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>loading ... </p>;
          if (error) return <p>error occured</p>;
          return <NotesPage notes={data.notes} {...this.props} />;
        }}
      </Query>
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

class NotesPageWithStateAndMutation extends React.Component {
  render() {
    return (
      <Mutation mutation={DELETE_NOTE_MUTATION}>
        {deleteNoteBase => {
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
          return <NotesPageWithState deleteNote={deleteNote} {...this.props} />;
        }}
      </Mutation>
    );
  }
}

export default NotesPageWithStateAndMutation;
