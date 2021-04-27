import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { handleOperator } from '../../store/calculator/actions';
import Button from '../Button';


class BasicMathOperators extends PureComponent {
    state = {  }
    generateOperatorsButtons(){
        const {handleOperator} = this.props;
        return [
            <Button key={'+'} type="Operator" label={"+"} behavior={() => handleOperator("+")} />,
            <Button key={'-'} type="Operator" label={"-"} behavior={() => handleOperator("-")} />,
            <Button key={'*'} type="Operator" label={"*"} behavior={() => handleOperator("*")} />,
            <Button key={'/'} type="Operator" label={"/"} behavior={() => handleOperator("/")} />,
        ]
    }
    render() {
        const operatorButons = this.generateOperatorsButtons();

        return (
            <div className="BasicMathOperators">{operatorButons.map(button => button)}</div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleOperator: (operator) => dispatch(handleOperator(operator)),
});

export default connect(undefined,  mapDispatchToProps)(BasicMathOperators);