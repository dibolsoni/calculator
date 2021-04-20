import React from 'react';
import "./calculator.css";
import Button from './Button'
import {addDigit} from '../../store/display/actions';
import {connect} from 'react-redux';

//mock
const handleOperator = (operator) => {};

class Calculator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    generateNumberButtons(){
        const {addNumber} = this.props;
        let buttons = [];
        for(let i=9; i > -1 ; i--){
            buttons.push(
                <Button
                    type="Number"
                    label={i} 
                    behavior={() => addNumber(i)}  
                />
            );
        }
        buttons.push(<Button type="Number" label={'.'} behavior={() => addNumber('.')}  />)
        buttons.push(<Button type="Operator" label={'C'} behavior={() => handleOperator('c')} />);
        return buttons;
    }

    generateOperatorsButtons(){
        return [
            <Button type="Operator" label={"+"} behavior={() => handleOperator("+")} />,
            <Button type="Operator" label={"-"} behavior={() => handleOperator("-")} />,
            <Button type="Operator" label={"*"} behavior={() => handleOperator("*")} />,
            <Button type="Operator" label={"/"} behavior={() => handleOperator("/")} />,
        ]
    }

    render() {
        const {digits, display} = this.props;
        const numbersButtons = this.generateNumberButtons();
        const operatorButons = this.generateOperatorsButtons();
        return (
            <div className="Calculator">
                <div className="Title">Calculadora</div>
                <div className="Display">{ digits.length ? digits.reverse() : display }</div>
                <div className="Buttons">
                    <div className="Numbers">{numbersButtons.map(button => button)}</div>
                    <div className="Operators">{operatorButons.map(button => button)}</div>
                </div>                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    display: state.display,
    digits: state.digits
});

const mapDispatchToProps = (dispatch) => ({
    addNumber: (value) => dispatch(addDigit(value)),
    handleOperator: (operator) => dispatch(handleOperator(operator))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);