import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';

import NotePage from './NotePage';
import NotesPage from './NotesPage';
import Modal from './Modal';
import './App.css';
import './skeleton.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Switch>
          <Route path="/notes/:noteId" component={NotePage} />
          <Route exact path="/" component={NotesPage} />
        </Switch>
        <Modal />
      </div>
    );
  }
}

export default App;
