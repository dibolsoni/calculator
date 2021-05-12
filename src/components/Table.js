import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { find, toUpper } from 'lodash';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';


const StyledTableCell = withStyles(theme => ({
  head: {

  },
  body: {

  }
}))(TableCell);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography color="secondary">{toUpper(headCell.label)}</Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {

  },

  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = ({ selected, removeHistory, selectedSize, title }) => {
  const classes = useToolbarStyles();

  const handleRemove = () => {
    if (selectedSize < 1)
      return;
    selected.forEach(element => {
      removeHistory(element.props.id)
    });
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selectedSize > 0,
      })}
    >
      {selectedSize > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {selectedSize} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h2" id="tableTitle" component="h2">
          {title}
        </Typography>
      )}

      {selectedSize > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => handleRemove()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        undefined
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  removeHistory: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};


const AccordionStyled = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 320,
    border: 0,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

export default function EnhancedTable({data,columns, dense, removeHistory, title}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      return setSelected(newSelecteds);
    }
    setSelected([]);
  };

  const removeSelectedFromList = React.useCallback((id) => {
    return setSelected(selected.filter(item => item.props.id !== id))
  },[selected])

  const handleClick = (event, name) => {
    const {props} = name;
    if (!props || event.target.onclick)
      return;
    const found = find(selected, {props: {id: props.id}})
    if(!found)
      return setSelected([...selected, name])   
   
    removeSelectedFromList(props.id)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => {
    return find(selected, {props: {id: id}}) ? true : false;
  };

  const selectedSize = React.useMemo((selecteds = selected, items = data) => {
    selecteds.forEach( item => {
      const {props} = item;
      const {id} = props;
      if (!find(items, {id: id}))
        removeSelectedFromList(id);
    });
    return selecteds.length;
  }, [selected, data, removeSelectedFromList])


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
      <AccordionStyled>
        <AccordionSummary
          expandIcon={<ExpandMore color={'primary'} />}
          aria-controls="history-content"
          id="history-header"
        >
        <EnhancedTableToolbar
          selectedSize={selectedSize} 
          selected={selected} 
          removeHistory={removeHistory}
          title={title} 
        />
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="history table"
          >
            <EnhancedTableHead
              headCells={columns}
              classes={classes}
              numSelected={selectedSize}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `history-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      color="primary"
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox 
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                         {row.id}
                      </StyledTableCell>
                      <StyledTableCell>{row.operation}</StyledTableCell>
                      <StyledTableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          size={'small'}
        />
        </TableContainer>
        </AccordionDetails>
      </AccordionStyled>

  );
}
