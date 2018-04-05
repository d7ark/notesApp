import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import './index.css';
import App from './App';
import State from './State';

const root = document.getElementById('root');
ReactModal.setAppElement(root);
ReactDOM.render(
  <Router>
    <State>
      <App />
    </State>
  </Router>,
  root
);
