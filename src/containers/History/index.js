import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './history.css';

import Table from '../../components/Table'
import { changeHistoryName, removeHistory } from '../../store/calculator/actions';

import Button from '../../components/Button'
import EditableText from '../../components/EditableText';

class History extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };

    }


    generateData(history) {
        const {removeHistory, changeHistoryName} = this.props;
        const data = history.map(
            row => 
            {
                const name = row.name ? row.name : 'click here';
                return ({
                    remove: <Button label={'x'} behavior={(id) => removeHistory(id)} />,
                    operation: row.first_value + row.operator + row.second_value + ' = ' + row.result,
                    name: <EditableText id={row.id} text={name} behavior={(id, name) => changeHistoryName(id, name) } />,
                    obs: ""
                })
            }
        );
        return data;
    }

    generateColumns() {
        return [
            {
                Header: 'Calculator History',
                columns: [
                    {
                        Header: ' ',
                        accessor: 'remove'
                    },
                    {
                        Header: 'Operation',
                        accessor: 'operation'
                    },
                    {
                        Header: 'Name',
                        accessor: 'name'
                    },
                    {
                        Header: 'Obs',
                        accessor: 'obs'
                    }
                ]
            }
        ]
    }
    render() {
        const {history, removeHistory} = this.props;
       if (this.refInput?.current) console.log(this.refInput.current.onfocus)

        return (
            <div className="History">
               {history?.length ? 
                    <Table 
                        data={this.generateData(history).reverse()} 
                        columns={this.generateColumns()}
                        removeHistory={(i) => removeHistory(i)}
                    /> 
                : 
                    undefined}
            </div>
        )
        ;
    }
}

const mapStateToProps = (state) => ({
    history: state.present.history
})

const mapDispatchToProps = (dispatch) => ({
    removeHistory: (index) => dispatch(removeHistory(index)),
    changeHistoryName: (index, name) => dispatch(changeHistoryName(index, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(History);