import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import Note from './Note';
import { NoteFormForEditting } from './NoteForm';

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
    return (
      <div>
        <Note note={note} onDelete={this.handleDelete} />
        <Route
          exact
          path={this.props.match.path + '/edit'}
          render={() => <NoteFormForEditting note={note} />}
        />
      </div>
    );
  }
}

const GET_NOTE = gql`
  query note($id: String!) {
    note(id: $id) {
      id
      createdAt
      text
    }
  }
`;

class NotePageWithState extends Component {
  render() {
    return (
      <Query
        query={GET_NOTE}
        variables={{ id: this.props.match.params.noteId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>loading ...</p>;
          if (error) return <p>error occured</p>;
          return (
            <NotePage
              {...this.props}
              deleteNoteById={() => {}}
              note={data.note}
            />
          );
        }}
      </Query>
    );
  }
}

export default NotePageWithState;
