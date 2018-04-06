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
    onDelete({ variables: { id: note.id } });
  };

  render() {
    const { note } = this.props;
    const formatedDate = new Date(note.createdAt).toLocaleString();
    return (
      <div>
        <hr className="Note-hr" />
        <div className="Note-row row">
          <div className="nine columns">
            <div dangerouslySetInnerHTML={this.getRawMarkup()} />
          </div>
          <div className="three columns">
            <button onClick={this.handleDelete}>Delete</button>
            <Link to={`/notes/${note.id}/edit`}>
              <button>Edit</button>
            </Link>
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
