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
        const {digits, result} = this.props;
        this.setState({showDisplay: result && digits.length === 0 ? result : digits})
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
        const {first_value, operator, second_value, handleEqual} = this.props;
        const {showDisplay} = this.state;
        return (
            <div className="Calculator" onKeyPress={(e) => this.handleKey(e)}>
                <div className="Title">Calculadora</div>
                <div className="Operation">
                    <span>{first_value? `x: ${first_value}` : undefined}</span>
                    <span>{operator?  operator : undefined}</span>
                    <span>{second_value? `y: ${second_value}` : undefined}</span>
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
    second_value: state.last_operation.second_value,
    operator: state.operator,
    result: state.last_operation.result
});

const mapDispatchToProps = (dispatch) => ({
    handleEqual: () => dispatch(handleEqual())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);