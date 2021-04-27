import React from 'react';
import {connect} from 'react-redux';
import "./calculator.css";
import {
    handleEqual, 
} from '../../store/calculator/actions';
import Numbers from '../Numbers';
import Operators from '../Operators';

class Calculator extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { 
            showDisplay: 0
         };
    }

    componentDidUpdate() {
        const {digits} = this.props;
        this.setState({showDisplay:digits})
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
    second_value: state.first_value,
    operator: state.operator,
    possible_result: state.possible_result,
    result: state.result
});

const mapDispatchToProps = (dispatch) => ({
    handleEqual: () => dispatch(handleEqual())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);