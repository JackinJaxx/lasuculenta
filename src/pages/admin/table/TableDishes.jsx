import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import usePlatillos from "@/hooks/PlatillosService";
import { useEffect, useState } from "react";
import "./table.css"
import LoadingIcon from "@/assets/icons/LoadingIcon";
const columns = [
  { id: "consecutive", label: "#", minWidth: 50, align: "center" },
  { id: "name", label: "Name", minWidth: 10 },
  {
    id: "sell_price",
    label: "Sell Price",
    minWidth: 40,
    align: "right",
    // FORMATO DE MONEDA
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "right",
  },
  {
    id: "icon",
    label: "Icon",
    minWidth: 100,
    align: "center",
  },
];

export default function TableDishes() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, loading, error, fetchPlatillos } = usePlatillos();
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    fetchPlatillos();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setIngredientes(data);
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
          {(loading && ingredientes.length === 0) && (
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
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    {columns.slice(1).map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "icon" && value ? (
                            <img
                              src={value}
                              className="img-table-icon"
                              alt="Ingredient Icon"
                              width={200}
                              height={200}
                            />
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={ingredientes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
