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


        if (!digits) 
            return;

        const joinedDigits = digits.join('');
        this.setState({
            showDisplay: isNumber(result) && digits.length === 0 ? 
            result : joinedDigits
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
            case 'y':
                return redo();
            default:
                return;
        }
    }

    handleKey(event){
        const {addDigit, clearDigit, handleOperator, handleEqual, reset} = this.props;
        event.preventDefault();
        if (event.ctrlKey || event.altKey)
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
        const {first_value, operator, second_value, handleEqual, reset, digits, undo, redo, hasPast, hasFuture} = this.props;
        const {showDisplay} = this.state;
        return (
            <div 
                id="calculator"
                ref={this.containerRef}
                className="Calculator" 
                tabIndex={-1}
                onKeyPress={(e) => this.handleModKeys(e)}
                onKeyUp={(e) => this.handleKey(e)}
            >
                <div className="Title">Calculator</div>
                <div className="Display">
                    <div className="Operation">
                        <Button
                            type="Reset"
                            label="reset"
                            behavior={reset}
                        />
                        <span>{isNumber(first_value)? first_value: undefined}</span>
                        <span>{operator?  operator : undefined}</span>
                        <span>{second_value && digits.length === 0? second_value : undefined}</span>
                    </div>
                    <div className="ShowDisplay">{ showDisplay ? showDisplay : 0}</div>
                    <div className="EqualDisplay">
                        <Button
                            disabled={!hasPast}
                            type="UndoRedo"
                            label="undo"
                            behavior={undo}
                        />
                        <Button
                            disabled={!hasFuture}
                            type="UndoRedo"
                            label="redo"
                            behavior={redo}
                        />
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
    hasPast: state.past.length > 0 ? true : false,
    hasFuture: state.future.length > 0 ? true : false
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