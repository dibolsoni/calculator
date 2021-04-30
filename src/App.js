import React from 'react';
import Calculator from './containers/Calculator';
import { Helmet } from 'react-helmet-async';


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
    </div>
    );
  };
};

export default App;
