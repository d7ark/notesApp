import React from 'react';

const { Provider, Consumer } = React.createContext();

class State extends React.Component {
  state = {
    notes: [],
  };

  addNote = note => {
    this.setState(prevState => {
      const notes = [note, ...prevState.notes];
      return { notes };
    });
  };

  deleteAllNotes = () => this.setState({ notes: [] });

  deleteNoteById = id => {
    this.setState(prevState => {
      const notes = prevState.notes.filter(oldNote => oldNote.id !== id);
      return { notes };
    });
  };

  getAllNotes = () => this.state.notes;

  getNoteById = id => {
    id = Number(id);
    return this.state.notes.find(note => note.id === id);
  }

  render() {
    return (
      <Provider
        value={{
          addNote: this.addNote,
          deleteAllNotes: this.deleteAllNotes,
          deleteNoteById: this.deleteNoteById,
          getAllNotes: this.getAllNotes,
          getNoteById: this.getNoteById,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer as StateConsumer };
export default State;
