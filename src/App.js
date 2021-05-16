import React from 'react';
import { Helmet } from 'react-helmet-async';

import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

class App extends React.PureComponent {
  render(){
    return (
    <div className="App">
      <Helmet>
        <title>The Calculator App</title>
        <link rel="canonical" href="https://dibolsoni.github.com" />
      </Helmet>
      <SignIn />
      {/* <Home /> */}
    </div>
    );
  };
};

export default App;
