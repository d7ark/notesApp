import React, { Component, Fragment } from 'react';
import Note from './Note';

class PreviousNotes extends Component {
  renderNote = note => {
    return (
      <Note key={note.id} note={note} onDeleteNote={this.props.onDeleteNote} />
    );
  };

  render() {
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
        <div>{this.props.notes.map(this.renderNote)}</div>
      </Fragment>
    );
  }
}

export default PreviousNotes;
