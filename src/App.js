import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Header from './containers/Header';

class App extends React.PureComponent {
  render(){
    return (
    <Router>
      <div className="App">
        <Helmet>
          <title>The Calculator App</title>
          <link rel="canonical" href="https://dibolsoni.github.com" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  };
};

export default App;
