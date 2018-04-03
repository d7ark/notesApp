import React, { Component } from 'react';
import Remarkable from 'remarkable';

class Note extends Component {
  getRawMarkup() {
    const md = new Remarkable();
    return { __html: md.render(this.props.note.text) };
  }

  handleDelete = () => {
    const { note, onDeleteNote } = this.props;
    onDeleteNote(note.id);
  };

  render() {
    const { note } = this.props;
    const formatedDate = new Date(note.date).toLocaleString();
    return (
      <div>
        <hr className="Note-hr" />
        <div className="Note-row row">
          <div className="nine columns">
            <p dangerouslySetInnerHTML={this.getRawMarkup()} />
          </div>
          <div className="three columns">
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        </div>
        <p className="Note-foot">Created {formatedDate}</p>
      </div>
    );
  }
}

export default Note;
