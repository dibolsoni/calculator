import React from 'react';
import {useTable} from 'react-table';

function Table({ columns, data, removeHistory }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })

    const handleCellClick = (index_cell) => {
        switch (index_cell) {
            case 0:
                return removeHistory(index_cell)
       
            default:
                console.log(index_cell);
        }
    }
  
    // Render the UI for your table
    return (
      <table className="Table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr  {...row.getRowProps()}>
                {row.cells.map((cell,i)=> {
                  return <td  onClick={(e) => handleCellClick(i)}  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
export default Table;