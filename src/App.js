import React, { Component } from 'react';
import './App.css';
import './normalize.css';
import './skeleton.css';
import NoteForm from './NoteForm';
import PreviousNotes from './PreviousNotes';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            notes: [],
        }
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
    }

    handleAddNote (note) {
        this.setState(prevState => {
            const notes = prevState.notes.concat(note);
            return { notes }
        });
    }

    handleDeleteNote (date) {
        this.setState(prevState => {
            const notes = prevState.notes.filter(oldNote => oldNote.date !== date);
            return { notes };
        });
    }

    handleDeleteAll () {
        this.setState({ notes: [] });
    }

    render () {
        const previousNotes = this.state.notes.length ? <PreviousNotes notes={this.state.notes} handleDeleteNote={this.handleDeleteNote} handleDeleteAll={this.handleDeleteAll} /> : '';
        return (
            <div className="App container">
                <header className="App-header">
                    <h1>Notes App</h1>
                </header>
                <NoteForm handleAddNote={this.handleAddNote} />
                {previousNotes}
            </div>
        );
    }
}

export default App;
