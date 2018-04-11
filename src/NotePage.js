import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Note from './Note';
import { NoteFormForEditting } from './NoteForm';

export class NotePage extends Component {
  handleDelete = noteId => {
    // this.props.deleteNoteById(noteId);
    this.props.history.replace('/');
  };
  render() {
    const { loading, note } = this.props;
    if (loading) {
      return <p>loading ...</p>;
    }
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

export default graphql(GET_NOTE, {
  options({ match }) {
    return { variables: { id: match.params.noteId } };
  },
  props({ data }) {
    return {
      loading: data.loading,
      note: data.note,
    };
  },
})(NotePage);
