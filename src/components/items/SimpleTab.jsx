import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


let id = 0;

function SimpleTable(props) {
  const { classes, header, rows } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        {header && (
          <TableHead>
            <TableRow>
              {header.map(val => (
                <TableCell align="center" key={val}>{val}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.map(row => (
            <TableRow key={id++}>
              {row.map(cell => (
                <TableCell align="center" key={cell}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

SimpleTable.defaultProps = {
  header: null,
};

export default withStyles(styles)(SimpleTable);
