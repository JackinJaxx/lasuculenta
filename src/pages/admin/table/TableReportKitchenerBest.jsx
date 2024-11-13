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
import useKitchener from "@/hooks/KitchenerService";

const columns = [
  { id: "consecutive", label: "#", minWidth: 50, align: "left" },
  { id: "name", label: "Name", minWidth: 10 },
  {
    id: "lastname",
    label: "Lastname",
    minWidth: 10,
  },
  {
    id: "orders_made",
    label: "Orders Made",
    minWidth: 40,
    align: "center",
  },
];

export default function TableKitchenerReport({
  searchText,
  refresh,
  since,
  from,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, loading, error, bestKitchener } = useKitchener();
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
      bestKitchener(since, from);
      setRefreshTable(false);
    }
  }, [refreshTable]);

  useEffect(() => {
    if (since && from) {
      bestKitchener(since, from);
    }
  }, []);

  useEffect(() => {
    console.log(data);
    if (data) {
      if (data.content) {
        if (data.content.length > 0) {
          setPlatillos(data.content);
        }
      }
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
      ingredient.lastname.toLowerCase().includes(searchText.toLowerCase())
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

TableKitchenerReport.propTypes = {
  searchText: PropTypes.string.isRequired,
  refresh: PropTypes.bool,
  since: PropTypes.string,
  from: PropTypes.string,
};
