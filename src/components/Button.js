import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            active: false
         };
    }

    handleClick(e){
        e.preventDefault();
        const {active} = this.state;
        this.setState({active: !active});
        const {behavior} = this.props;
        behavior();

    }
    render() {
        const {label} = this.props;
        return ( 
        <div onClick={(e) => this.handleClick(e)}>
            {label}
        </div>           
        );
    }
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    behavior: PropTypes.func.isRequired
}
export default Button;