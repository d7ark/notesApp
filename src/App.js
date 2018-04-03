import React, { Component } from 'react';
import 'normalize.css/normalize.css';

import NoteForm from './NoteForm';
import PreviousNotes from './PreviousNotes';
import './App.css';
import './skeleton.css';

class App extends Component {
  state = {
    notes: [],
  };

  handleAddNote = note => {
    this.setState(prevState => {
      const notes = [note, ...prevState.notes];
      return { notes };
    });
  };

  handleDeleteNote = id => {
    this.setState(prevState => {
      const notes = prevState.notes.filter(oldNote => oldNote.id !== id);
      return { notes };
    });
  };

  handleDeleteAll = () => {
    this.setState({ notes: [] });
  };

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <h1>Notes App</h1>
        </header>
        <NoteForm onAddNote={this.handleAddNote} />
        {!!this.state.notes.length && (
          <PreviousNotes
            notes={this.state.notes}
            onDeleteNote={this.handleDeleteNote}
            onDeleteAll={this.handleDeleteAll}
          />
        )}
      </div>
    );
  }
}

export default App;
