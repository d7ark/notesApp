import React, { Component } from 'react';
import Note from './Note';


class PreviousNotes extends Component {

    render () {
        const notes = (this.props.notes).map((note) =>
            <Note text={note.text} date={note.date} key={note.date} handleDeleteNote={this.props.handleDeleteNote} />
        );
        return (
            <div>
                <div className="row">
                    <div className="one-half column"><h2>Previous Notes</h2></div>
                    <div className="one-half column"><button onClick={ () => this.props.handleDeleteAll() }>Delete all</button></div>
                </div>
                <div>
                    {notes}
                </div>
            </div>
        );
    }
}

export default PreviousNotes;
