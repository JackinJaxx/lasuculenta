import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import useIngredient from "@/hooks/IngredientService";
import PropTypes from "prop-types";
import ErrorIcon from "@/assets/icons/ErrorIcon";

const columns = [
  { id: "consecutive", label: "#", minWidth: 10, align: "center" },
  { id: "name", label: "Name", minWidth: 10, align: "center" },
  {
    id: "predicted_quantity",
    label: "Predicted Quantity",
    minWidth: 10,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  { id: "unit", label: "Unit", minWidth: 10, align: "center" },
  {
    id: "last_month_used",
    label: "Last Month Used",
    minWidth: 10,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "stock",
    label: "Stock",
    minWidth: 10,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "difference",
    label: "Difference",
    minWidth: 10,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "priority",
    label: "Priority",
    minWidth: 10,
    align: "center",
    format: (value) => {
      const translations = {
        mucho: "HIGH",
        moderado: "MODERATE",
        poco: "LOW",
      };
      return translations[value.toLowerCase()] || value.toUpperCase();
    },
  },
];

const TablePrediction = ({ date }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, loading, error, predictIngredients } = useIngredient();
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    if (date) {
      console.log("date", date);
      predictIngredients(date);
    }
  }, [date]);

  useEffect(() => {
    if (data) {
      console.log("datadd", data);
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

  const getPriorityColor = (priority) => {
    if (priority === "mucho") return "#E86161"; // Rojo claro
    if (priority === "moderado") return "#F0E291"; // Amarillo claro
    if (priority === "poco") return "#76CB9C"; // Verde claro
    return "inherit"; // Color por defecto si no coincide
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <div className="loading-icon-table">
                    <LoadingIcon />
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <div className="loading-icon-table">
                    <ErrorIcon />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              ingredientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center" style={{ color: "#4b2e2e" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    {columns.slice(1).map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: "#4b2e2e", // Color de texto para todas las celdas de TableBody
                            backgroundColor:
                              column.id === "priority"
                                ? getPriorityColor(value)
                                : "inherit",
                          }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

TablePrediction.propTypes = {
  date: PropTypes.string.isRequired,
};

export default TablePrediction;
