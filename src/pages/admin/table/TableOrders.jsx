import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import useOrders from "@/hooks/OrderService";
import LoadingIcon from "@/assets/icons/LoadingIcon";

const columns = [
  { id: "consecutive", label: "#", minWidth: 10, align: "center" },
  { id: "table_number", label: "Table Number", minWidth: 10, align: "center" },
  { id: "client_name", label: "Client", minWidth: 10, align: "center" },
  { id: "requested_on", label: "Requested On", minWidth: 10, align: "center" },
  {
    id: "take_by",
    label: "Take By",
    minWidth: 10,
    align: "center",
    format: (value) => {
      return value ? value.name : "N/A";
    },
  },
];

export default function TableOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, loading, error, fetchOrders } = useOrders();
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    fetchOrders(rowsPerPage, page);
  }, []);

  useEffect(() => {
    if (data && data.content) {
      // Acumula los datos de la nueva página con los existentes
      setIngredientes((prevIngredientes) => {
        // Filtra para evitar duplicados si se solicita la misma página nuevamente
        const newItems = data.content.filter(
          (newItem) => !prevIngredientes.some((item) => item.id === newItem.id)
        );
        return [...prevIngredientes, ...newItems];
      });
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchOrders(rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#4b2e2e",
                    color: "#f0e5cf",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {loading  && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <div className="loading-icon-table">
                    <LoadingIcon />
                  </div>
                </TableCell>
              </TableRow>
          )}
            {ingredientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.slice(1).map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data?.totalElements || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
