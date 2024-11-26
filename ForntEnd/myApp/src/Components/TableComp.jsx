import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableComp = ({ columns, rows }) => {
  console.log("rows: ", rows, "columns:", columns);

  return (
    <Paper style={{ height: "50vh", width: { xs: '90%', sm: '80%' }}}>
      <TableVirtuoso
        data={rows}
        components={{
          Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
          )),
          Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
          ),
          TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
          TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
        }}
        fixedHeaderContent={() => (
          <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: '#20B2AA', zIndex: 2 }}>
            {columns.map((column, index) => (
              <TableCell key={index} style={{ width: "100px", fontWeight: 'bold', textAlign: 'center', fontSize:"99%" }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        )}
        itemContent={(_index, row) => (
          <>
            {columns.map((column, index) => (
              <TableCell key={index} sx={{textAlign: 'center'}}>
                {row[column.key]}
              </TableCell>
            ))}
          </>
        )}
      />
    </Paper>
  );
};

export default TableComp;