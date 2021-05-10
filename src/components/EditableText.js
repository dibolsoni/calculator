import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class EditableText extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isEditing: false, newText: undefined };
    }

    componentDidUpdate() {
        const {text} = this.props;
        this.setState({text});
    }
    handleSubmit() {
        const {behavior, id} = this.props;
        const {newText} = this.state;
        behavior(id, newText);
        this.setState({isEditing: false, newText})
    }

    render() {
        const { text} = this.props;
        const {isEditing} = this.state;
        return (
            <> 
                {isEditing ?
                    <input
                        className="CalculatorInput" 
                        onChange={(e) => this.setState({newText: e.target.value})}
                        onKeyPress={(e) => e.key  === 'Enter' ? this.handleSubmit() : undefined}
                        onBlur={() => this.handleSubmit()}
                        placeholder={'press enter to save'}
                        type="text"
                        maxLength={50}
                        size={50}
                        autoFocus
                    />                 
                    :
                    <Button type="Input" label={text} behavior={() => this.setState({isEditing: true})} />
                }
            </>
        )
        ;
    }
}

EditableText.propTypes = {
    text: PropTypes.string.isRequired,
    behavior: PropTypes.func.isRequired
}

export default EditableText;