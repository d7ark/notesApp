import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';

import NotePage from './NotePage';
import NotesPage from './NotesPage';
import Modal from './Modal';
import './App.css';
import './skeleton.css';


const client = new ApolloClient({
  uri: "https://8v9x78ppqq.lp.gql.zone/graphql"
});

class App extends Component {
  render() {
    // TODO: move SavedNotes to NotesPage (I guess)
    // const SavedNotes = () => (
    //   <Query
    //     query={gql`
    //       {
    //         notes {
    //           createdAt,
    //           id,
    //           text
    //         }
    //       }
    //     `}
    //   >
    //     {({ loading, error, data }) => {
    //       if (loading) return <p>loading ... </p>;
    //       if (error) return <p>error occured</p>;
    
    //       return <PreviousNotes
    //         notes={data.notes}
    //         onDeleteAll={this.handleDeleteAll}
    //         onDeleteNote={this.handleDeleteNote}
    //       />;
    //     }}
    //   </Query>
    // );

    return (
      <ApolloProvider client={client}>
        <div className="App container">
        <Switch>
          <Route exact path="/notes/:noteId" component={NotePage} />
          <Route exact path="/" component={NotesPage} />
        </Switch>
          <Modal />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
