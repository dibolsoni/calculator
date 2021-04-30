import React from 'react';
import Calculator from './containers/Calculator';

import './App.css';

class App extends React.PureComponent {
  render(){
    return (
    <div className="App">
      <Calculator />
    </div>
    );
  };
};

export default App;
