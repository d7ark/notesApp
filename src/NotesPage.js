import React, { Component } from 'react';

import NoteForm from './NoteForm';
import PreviousNotes from './PreviousNotes';
import {StateConsumer} from './State';

class NotesPage extends Component {
    render() {
        const {appState} = this.props;
        const notes = appState.getAllNotes();
        return (
            <div>
                <header className="App-header">
                    <h1>Notes App</h1>
                </header>
                <NoteForm />
                {!!notes.length && <PreviousNotes notes={notes} onDeleteAll={appState.deleteAllNotes} onDelete={appState.deleteNoteById} />}
            </div>
        )
    }
}

class NotesPageWithState extends React.Component {
    render() {
        return (
            <StateConsumer>
                {appState => (<NotesPage appState={appState} />)}
            </StateConsumer>
        )
    }
}

export default NotesPageWithState;