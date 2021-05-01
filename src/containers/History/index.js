import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './history.css';

import Table from '../../components/Table'
import { removeHistory } from '../../store/calculator/actions';

class History extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    generateData(history) {
        const data = history.map(row => ({
                remove: 'x',
                operation: row.first_value + row.operator + row.second_value + ' = ' + row.result,
                name: "click here",
                obs: ""
        }));
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
        return (
            <div className="History">
               {history?.length ? 
                    <Table 
                        data={this.generateData(history)} 
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
    removeHistory: (index) => dispatch(removeHistory(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(History);