import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'https://8v9x78ppqq.lp.gql.zone/graphql',
  // uri: 'https://p0394j90j0.lp.gql.zone/graphql',
});

const root = document.getElementById('root');
ReactModal.setAppElement(root);
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  root
);
