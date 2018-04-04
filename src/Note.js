import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Remarkable from 'remarkable';

class Note extends Component {
  getRawMarkup() {
    const md = new Remarkable();
    return { __html: md.render(this.props.note.text) };
  }

  handleDelete = () => {
    const { note, onDelete } = this.props;
    onDelete(note.id);
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
        <Link to={`/notes/${note.id}`}>
          <p className="Note-foot">Created {formatedDate}</p>
        </Link>
      </div>
    );
  }
}

export default Note;
