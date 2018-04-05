import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import State from './State';

ReactDOM.render(
  <Router>
    <State>
      <App />
    </State>
  </Router>,
  document.getElementById('root')
);
