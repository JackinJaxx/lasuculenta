import Loader from "@/components/spinner/Spinner";
import TableDishes from "../table/TableDishes";
import "./waitersReports.css";
import { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import TableReportCost from "../table/TableReportCost";
import SearchBar from "@/components/search/Search";
import TableWaiterReport from "../table/TableReportWaiter";
import NotificationFloat from "@/components/Notifications/NotificationFloat";
import { set } from "react-hook-form";

const WaitersReports = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedReport, setSelectedReport] = useState(""); // Estado para el radio button seleccionado
  const [since, setSince] = useState(""); // Estado para la fecha 'since'
  const [from, setFrom] = useState(""); // Estado para la fecha 'from'
  const [validate, setValidate] = useState(false);
  const handleRadioChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const handleNotificationClose = () => {
    setNotification({ isVisible: false, message: "" });
  };

  return (
    <div className="ingredeint-operation">
      <Loader isLoading={loading} />
      <NotificationFloat
        isVisible={notification.isVisible}
        message={notification.message}
        onClose={handleNotificationClose}
      />
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
            label="Name of the waiter who takes the most orders"
          />
        </RadioGroup>
      </FormControl>

      <div className="admin-table">
        {selectedReport === "costoCartaVsCostoReal" ? (
          <>
            <div className="date-inputs">
              <TextField
                label="Since"
                type="date"
                value={since}
                onChange={(e) => {
                    if(validate){
                        setValidate(false);
                        setSince(e.target.value);
                    }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="From"
                type="date"
                value={from}
                onChange={(e) => {
                    if(validate){
                        setValidate(false);
                        setFrom(e.target.value);
                    }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <button
                className="ingredient-save-btn"
                onClick={() => {
                   
                  if (since && from) {
                    setRefresh(true);
                    setValidate(true);
                  } else {
                    setNotification({
                      isVisible: true,
                      message: "Please select a date range",
                    });
                  }
                }}
              >
                Search
              </button>
            </div>
            {validate && (
              <>
                <SearchBar
                  placeholder={"Search"}
                  onChange={handleSearchChange}
                />
                <TableWaiterReport
                  searchText={searchText}
                  refresh={refresh}
                  since={since}
                  from={from}
                />
              </>
            )}
            {/* aca input dates */}
          </>
        ) : (
          <p className="no-report-selected">Select a report to display</p>
        )}
      </div>
    </div>
  );
};

export default WaitersReports;
