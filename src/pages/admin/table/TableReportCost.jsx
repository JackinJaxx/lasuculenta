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
import LoadingIcon from "@/assets/icons/LoadingIcon";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@/components/alert/AlertCustom";
import PropTypes from "prop-types";
import "./table.css";

const columns = [
  { id: "consecutive", label: "#", minWidth: 50, align: "left" },
  { id: "name", label: "Name", minWidth: 10 },
  {
    id: "sell_price",
    label: "Sell Price",
    minWidth: 40,
    align: "center",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "center",
    format: (value) => value.replace(/_/g, " "),
  },
  {
    id: "real_cost",
    label: "Real Cost",
    minWidth: 40,
    align: "center",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "revenue",
    label: "Revenue",
    minWidth: 40,
    align: "center",
    format: (value) => `$${value.toFixed(2)}`,
  },
];

export default function TableReportCost({ searchText, refresh }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, loading, error, getAllSellTable } = usePlatillos();
  const [platillos, setPlatillos] = useState([]);
  const [refreshTable, setRefreshTable] = useState(refresh);

  useEffect(() => {
    if (refresh) {
      setRefreshTable(true);
    } else {
      setRefreshTable(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (refreshTable) {
      getAllSellTable();
      setRefreshTable(false);
    }
  }, [refreshTable]);

  useEffect(() => {
    getAllSellTable();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setPlatillos(data);
    }
  }, [data]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredIngredients = platillos.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchText.toLowerCase()) ||
      ingredient.sell_price.toString().includes(searchText) ||
      ingredient.category.toLowerCase().includes(searchText.toLowerCase())
  );

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
            {loading && platillos.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <div className="loading-icon-table">
                    <LoadingIcon />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {filteredIngredients
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
                        {column.id === "icon" && value ? (
                          <img
                            src={value}
                            className="img-table-icon"
                            alt="Dish Icon"
                            width={50}
                            height={50}
                          />
                        ) : column.format ? (
                          column.format(value)
                        ) : (
                          value
                        )}
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
        count={platillos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

TableReportCost.propTypes = {
  searchText: PropTypes.string.isRequired,
  refresh: PropTypes.bool,
};
