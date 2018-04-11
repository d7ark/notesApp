import React, { Component, Fragment } from 'react';

import Note from './Note';

class PreviousNotes extends Component {
  renderNote = note => (
    <Note key={note.id} note={note} onDelete={this.props.onDelete} />
  );

  render() {
    let notes = [...this.props.notes];
    return (
      <Fragment>
        <div className="row">
          <div className="one-half column">
            <h2>Previous Notes</h2>
          </div>
          <div className="one-half column">
            <button onClick={this.props.onDeleteAll}>Delete all</button>
          </div>
        </div>
        <div>
          {notes
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map(this.renderNote)}
        </div>
      </Fragment>
    );
  }
}

export default PreviousNotes;
