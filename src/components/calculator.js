import React from 'react';
import Button from './Button'
import {addDigit} from '../store/display/actions';
import {connect} from 'react-redux';


class calculator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    generateNumbersButtons(){
        const {addNumber} = this.props;
        let buttons = [];
        for(let i=0; i < 10 ; i++){
            buttons.push(
                <Button
                    className={`button ${i}`} 
                    label={i} 
                    behavior={() => addNumber(i)}  
                />
            );
        }
        return buttons;
    }

    render() {
        const {display} = this.props;
        const numberButtons = this.generateNumbersButtons();
        return (
            <>
                <div className="Title">Calculadora</div>
                <div className="Display">{display}</div>
                {numberButtons.map(button => button)}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    display: state.display,
    digits: state.digits
});

const mapDispatchToProps = (dispatch) => ({
    addNumber: (value) => dispatch(addDigit(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(calculator);