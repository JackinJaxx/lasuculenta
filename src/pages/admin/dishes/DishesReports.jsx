import Loader from "@/components/spinner/Spinner";
import TableDishes from "../table/TableDishes";
import "./dishesReports.css";
import { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import TableReportCost from "../table/TableReportCost";
import SearchBar from "@/components/search/Search";

const DishesReports = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedReport, setSelectedReport] = useState(""); // Estado para el radio button seleccionado

  const handleRadioChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="ingredeint-operation">
      <Loader isLoading={loading} />
      <p>Reports</p>

      {/* Grupo de radio buttons */}
      <FormControl component="fieldset">
        <FormLabel component="legend" className="radio-title">
          Select a report
        </FormLabel>
        <RadioGroup
          aria-label="report"
          name="report"
          value={selectedReport}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="costoCartaVsCostoReal"
            className="radio-button"
            control={<Radio />}
            label="Difference in the cost of the dish on the menu with the actual cost based on the ingredients"
          />
        </RadioGroup>
      </FormControl>

      <div className="admin-table">
        {selectedReport === "costoCartaVsCostoReal" ? (
          <>
            <SearchBar placeholder={"Search"} onChange={handleSearchChange} />
            <TableReportCost refresh={refresh} searchText={searchText} />
          </>
        ) : (
          <p className="no-report-selected">Select a report to display</p>
        )}
      </div>
    </div>
  );
};

export default DishesReports;
