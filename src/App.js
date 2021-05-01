import React from 'react';
import { Helmet } from 'react-helmet-async';

import Calculator from './containers/Calculator';
import History from './containers/History'


import './App.css';

class App extends React.PureComponent {
  render(){
    return (
    <div className="App">
      <Helmet>
        <title>The Calculator App</title>
        <link rel="canonical" href="https://dibolsoni.github.com" />
      </Helmet>
      <Calculator />
      <History />
    </div>
    );
  };
};

export default App;
