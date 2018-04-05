import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';

import NoteForm from './NoteForm';
import PreviousNotes from './PreviousNotes';

//TODO: NoteForm shouldnt wait for previous notes

class NotesPage extends Component {
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
            onDelete={this.onDeleteAllNotes}
            onDeleteAll={this.onDeleteNote}
          />
        )}
      </div>
    );
  }
}

class NotesPageWithState extends React.Component {
  render() {
    const SavedNotes = () => (
      <Query
        query={gql`
          {
            notes {
              createdAt
              id
              text
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>loading ... </p>;
          if (error) return <p>error occured</p>;

          return <NotesPage notes={data.notes} />;
        }}
      </Query>
    );
    return <SavedNotes {...this.props} />;
  }
}

export default NotesPageWithState;
