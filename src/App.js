import React from 'react';
import { Helmet } from 'react-helmet-async';

import './App.css';
import Home from './pages/Home';

class App extends React.PureComponent {
  render(){
    return (
    <div className="App">
      <Helmet>
        <title>The Calculator App</title>
        <link rel="canonical" href="https://dibolsoni.github.com" />
      </Helmet>
      <Home />
    </div>
    );
  };
};

export default App;
