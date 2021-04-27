import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './operators.css';
import BasicMathOperators from './BasicMathOperators';

class Operators extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            operators: []
        };
    }

    componentDidMount() {
        const {operators} = this.props;
        this.setState({
            operators: operators ? operators : [BasicMathOperators]
        });
    }


    render() {
        const {operators} = this.state;
        return (
            <div className="Operators" style={{gridTemplateColumns: `repeat(${operators.length}, 1fr)`}}>
                {operators.map((Ops, i) => 
                    <Ops 
                        key={i}
                    />
                )}
            </div>
        );
    }
}

Operators.propTypes = {
    operators: PropTypes.array
}

export default Operators;

