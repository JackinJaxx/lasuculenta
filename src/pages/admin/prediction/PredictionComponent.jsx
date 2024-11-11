import PredictionIcon from "@/assets/icons/predictIcon";
import TablePrediction from "../table/TablePrediction";
import { TextField } from "@mui/material";
import { useState } from "react";
import Alert from "@/components/alert/AlertCustom";

const PredictionComponent = () => {
  const [visiblePrediction, setVisiblePrediction] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handlePrediction = () => {
    if (selectedDate) {
      setVisiblePrediction(true);
    } else {
      Alert.error("Please select a date");
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  return (
    <div className="ingredeint-operation">
      <p>Predictions</p>
      <div className="admin-predictions">
        <TextField
          type="date"
          label="Start Date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
        />
        <button className="btn-predictions" onClick={handlePrediction}>
          <PredictionIcon />
        </button>
      </div>
      {visiblePrediction && (
        <div className="admin-table">
          <TablePrediction date={selectedDate} />
        </div>
      )}
    </div>
  );
};

export default PredictionComponent;
