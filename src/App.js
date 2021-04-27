import React from 'react';
import Calculator from './components/Calculator';
import Numbers from './components/Numbers'

import './App.css';

class App extends React.PureComponent {
  render(){
    return (
    <div className="App">
      {/* <Calculator /> */}
      <Numbers />
    </div>
    );
  };
};

export default App;
