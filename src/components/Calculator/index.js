import React from 'react';
import {connect} from 'react-redux';
import "./calculator.css";
import Button from './Button'
import {
    addDigit,
    handleEqual, 
    removeLastDigit, 
    handleOperator
} from '../../store/display/actions';


class Calculator extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { 
            showDisplay: 0
         };
    }

    componentDidUpdate(prevProps) {
        const {digits, result} = this.props;
        if (!digits.length)
            return this.setState({
                showDisplay: result ? result : null
            })
        else if (digits !== prevProps.digits){
            this.setState({
                showDisplay: digits
            });
        }
    }

    generateNumberButtons(){
        const {addNumber, clearDigit} = this.props;
        let buttons = [];
        for(let i=9; i > -1 ; i--){
            buttons.push(
                <Button
                    type="Number"
                    label={i} 
                    behavior={() => addNumber(i)}
                    key={i}  
                />
            );
        }
        buttons.push(<Button key={'.'} type="Number" label={'.'} behavior={() => addNumber('.')}  />)
        buttons.push(<Button key={'c'} type="Operator" label={'C'} behavior={() => clearDigit('c')} />);
        return buttons;
    }

    generateOperatorsButtons(){
        const {handleOperator} = this.props;
        return [
            <Button key={'+'} type="Operator" label={"+"} behavior={() => handleOperator("+")} />,
            <Button key={'-'} type="Operator" label={"-"} behavior={() => handleOperator("-")} />,
            <Button key={'*'} type="Operator" label={"*"} behavior={() => handleOperator("*")} />,
            <Button key={'/'} type="Operator" label={"/"} behavior={() => handleOperator("/")} />,
        ]
    }

    handleKey(event){
        const {addNumber, clearDigit, handleOperator} = this.props;
        event.preventDefault();
        console.log(event)
        switch (event.key) {
            case "+":
            case "-":
            case "*":
            case "/":
                handleOperator(event.key)
                break;
            case "c":
            case "C": 
                clearDigit(event.key) 
                break;        
            default:
                addNumber(event.key)
                break;
        }
    }

    render() {
        const numbersButtons = this.generateNumberButtons();
        const operatorButons = this.generateOperatorsButtons();
        const {value, operator, possible_result, handleEqual} = this.props;
        const {showDisplay} = this.state;
        return (
            <div className="Calculator" onKeyPress={(e) => this.handleKey(e)}>
                <div className="Title">Calculadora</div>
                <div className="Operation">
                    <span>{value? `value: ${value}` : undefined}</span>
                    <span>{operator? `operator: ${operator}` : undefined}</span>
                    <span>{possible_result? `possible_result: ${possible_result}` : undefined}</span>
                </div>
                <div className="Display">
                    <div className="ShowDisplay">{ showDisplay }</div>
                    <div className="EqualDisplay" onClick={() => handleEqual()}>=</div>
                </div>
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
    digits: state.digits,
    value: state.first_value,
    operator: state.operator,
    possible_result: state.possible_result,
    result: state.result
});

const mapDispatchToProps = (dispatch) => ({
    addNumber: (value) => dispatch(addDigit(value)),
    handleOperator: (operator) => dispatch(handleOperator(operator)),
    clearDigit: () => dispatch(removeLastDigit()),
    handleEqual: () => dispatch(handleEqual())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);