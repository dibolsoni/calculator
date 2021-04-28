import React from 'react';
import {connect} from 'react-redux';
import "./calculator.css";
import {
    handleEqual, resetState, 
} from '../../store/calculator/actions';
import Numbers from '../Numbers';
import Operators from '../Operators';
import Button from '../Button';
import { isNumber } from 'lodash';

class Calculator extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { 
            showDisplay: 0
         };
    }

    componentDidUpdate() {
        const {digits, result} = this.props;
        this.setState({
            showDisplay: isNumber(result) && digits.length === 0 ? 
            `result: ${result}` : `number: ${digits.join('')}`
        })
    }


    handleKey(event){
        const {addDigit, clearDigit, handleOperator} = this.props;
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
                addDigit(event.key)
                break;
        }
    }

    render() {
        const {first_value, operator, second_value, handleEqual, reset, digits} = this.props;
        const {showDisplay} = this.state;
        return (
            <div className="Calculator" onKeyPress={(e) => this.handleKey(e)}>
                <div className="Title">Calculadora</div>
                <div className="Display">
                    <div className="Operation">
                        <Button
                            type="Operator"
                            label="reset"
                            behavior={reset}
                        />
                        <span>{isNumber(first_value)? `x: ${first_value}` : undefined}</span>
                        <span>{operator?  operator : undefined}</span>
                        <span>{second_value && digits.length === 0? `y: ${second_value}` : undefined}</span>
                        <Button
                            type="Operator"
                            label="history"
                            behavior={reset}
                        />
                    </div>
                    <div className="ShowDisplay">{ showDisplay ? showDisplay : 0}</div>
                    <div className="EqualDisplay">
                        <Button 
                            type="Equal"
                            label="=" 
                            behavior={handleEqual}
                        />
                    </div>
                </div>
                <div className="Buttons">
                    <Numbers />
                    <Operators />
                </div>                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    display: state.display,
    digits: state.digits,
    first_value: state.first_value,
    second_value: state.last_operation.second_value,
    operator: state.operator,
    result: state.last_operation.result
});

const mapDispatchToProps = (dispatch) => ({
    handleEqual: () => dispatch(handleEqual()),
    reset: () => dispatch(resetState())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);