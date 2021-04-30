import React from 'react';
import './numbers.css';
import { connect } from 'react-redux';
import Button from '../../components/Button';

import {
    addDigit,
    removeLastDigit
} from "../../store/calculator/actions";

class Numbers extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    generateNumberButtons(){
        const {addDigit, clearDigit} = this.props;
        let buttons = [];
        for(let i=9; i > -1 ; i--){
            buttons.push(
                <Button
                    key={i}
                    type="Number"
                    label={i} 
                    behavior={() => addDigit(i)}
                />
            );
        }
        buttons.push(
            <Button 
                key={'.'} 
                type="Number" 
                label={'.'} 
                behavior={() => addDigit('.')} 
            />
        );
        buttons.push(
            <Button 
                key={'c'} 
                type="Number" 
                label={'C'} 
                behavior={() => clearDigit('c')} 
            />
        );
        return buttons;
    }

    render() {
        const numbersButtons = this.generateNumberButtons();

        return (
            <div className="Numbers">{numbersButtons.map(button => button)}</div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addDigit: (digit) => dispatch(addDigit(digit)),
    clearDigit: () => dispatch(removeLastDigit()),
});

export default connect(undefined, mapDispatchToProps)(Numbers);