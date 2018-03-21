import React, { Component } from 'react';
import './Note.css';

class Note extends Component {
    render () {
        const date = new Date(this.props.date);
        const formatedDate = date.toLocaleString();
        return (
            <div>
                <hr className="Note-hr" />
                <div className="Note-row row">
                    <div className="nine columns">
                        <p>{this.props.text}</p>
                    </div>
                    <div className="three columns">
                        <button onClick={ () => this.props.handleDeleteNote(this.props.date) }>Delete</button>
                    </div>
                </div>
                <p className="Note-foot">Created {formatedDate}</p>
            </div>
        )
    }
}

export default Note;
