import React from 'react';
import {connect} from 'react-redux';
import "./calculator.css";
import {
    addDigit,
    removeLastDigit,
    handleEqual, 
    handleOperator, 
    resetState, 
} from '../../store/calculator/actions';
import Numbers from '../Numbers';
import Operators from '../Operators';
import Button from '../../components/Button';
import { isNumber } from 'lodash';
import { redo, undo } from '../../store/undoRedo/actions';

class Calculator extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { 
            showDisplay: 0
         };

         this.containerRef = React.createRef();
    }
    
    componentDidMount() {
        this.containerRef.current.focus();
    }

    componentDidUpdate() {
        const {digits, result} = this.props;
        this.setState({
            showDisplay: isNumber(result) && digits.length === 0 ? 
            `result: ${result}` : `number: ${digits.join('')}`
        })
    }

    handleModKeys(event) {
        event.preventDefault();
        const {undo, redo} = this.props;
        if (!event.ctrlKey)
            return;
        switch (event.key) {
            case 'z':
                return undo();
            case 'r':
                return redo();
            default:
                return;
        }
    }

    handleKey(event){
        const {addDigit, clearDigit, handleOperator, handleEqual, reset} = this.props;
        event.preventDefault();
        if (event.ctrlKey)
            return this.handleModKeys(event);
        switch (event.key) {
            case "+":
            case "-":
            case "*":
            case "/":
                handleOperator(event.key);
                break;
            case "Backspace":
            case "c":
            case "C": 
                clearDigit();
                break;
            case "Enter":
                handleEqual();
                break;
            case "Delete":
                reset();
                break;        
            default:
                addDigit(event.key);
                break;
        }
    }

    render() {
        const {first_value, operator, second_value, handleEqual, reset, digits} = this.props;
        const {showDisplay} = this.state;
        return (
            <div 
                id="calculator"
                ref={this.containerRef}
                className="Calculator" 
                tabIndex={-1}
                onKeyPress={(e) => this.handleModKeys(e)}
                onKeyUp={(e) => this.handleKey(e)}
                autoFocus
            >
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
    digits: state.present.digits,
    first_value: state.present.first_value,
    second_value: state.present.last_operation.second_value,
    operator: state.present.operator,
    result: state.present.last_operation.result,
    history: state.past
});

const mapDispatchToProps = (dispatch) => ({
    addDigit: (digit) => dispatch(addDigit(digit)),
    handleOperator: (operator) => dispatch(handleOperator(operator)),
    clearDigit: () => dispatch(removeLastDigit()),
    handleEqual: () => dispatch(handleEqual()),
    reset: () => dispatch(resetState()),
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);