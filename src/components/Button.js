import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
         };
    }

    handleClick(e){
        e.preventDefault();
        const {behavior} = this.props;
        behavior();

    }
    render() {
        const {type, label, disabled} = this.props;
        return (
            <div
                className={`CalculatorButton ${type} ${label} ${disabled ? 'disabled': null}`}
                onClick={(e) => this.handleClick(e)}
            >
                {label}
            </div>           
        );
    }
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.any.isRequired,
    behavior: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}
export default Button;