import React, { PureComponent } from 'react';
import Calculator from '../containers/Calculator'
import History from '../containers/History'

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            <Calculator />
            <History />                
            </>
        );
    }
}

export default Home;