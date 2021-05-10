import React, { PureComponent } from 'react';
import Calculator from '../containers/Calculator'
import History from '../containers/History'
import Header from '../containers/Header'

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            <Header />
            <Calculator />
            <History />                
            </>
        );
    }
}

export default Home;