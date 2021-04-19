import React from 'react';
import {newValue} from '../store/actions';
import {connect} from 'react-redux';


class calculator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleClick(){
        const {changeValue} = this.props;
        console.log("changevalue")
        changeValue(10);

    }

    render() {
        const {display} = this.props;
        return (
            <div onClick={(e) => this.handleClick(e)}>Calulator {display !== null ? display: "no display"} </div>
        );
    }
}

const mapStateToProps = (state) => ({
    display: state.display
});

const mapDispatchToProps = (dispatch) => ({
    changeValue: (value) => dispatch(newValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(calculator);