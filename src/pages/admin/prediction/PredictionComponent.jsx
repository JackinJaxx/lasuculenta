import PredictionIcon from "@/assets/icons/predictIcon";
import TablePrediction from "../table/TablePrediction";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Alert from "@/components/alert/AlertCustom";
import { set } from "react-hook-form";
import NotificationFloat from "@/components/Notifications/NotificationFloat";

const PredictionComponent = () => {
  const [visiblePrediction, setVisiblePrediction] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const handlePrediction = () => {
    if (selectedDate) {
      setVisiblePrediction(true);
    } else {
      setNotification({
        isVisible: true,
        message: "Please select a date to generate a prediction based on it.",
      });
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNotificationClose = () => {
    setNotification({ isVisible: false, message: "" });
  };

  useEffect(() => {
    setNotification({
      isVisible: true,
      message: "Please select a date to generate a prediction based on it.",
    });
  }, []);

  return (
    <div className="ingredeint-operation">
      <NotificationFloat
        isVisible={notification.isVisible}
        message={notification.message}
        onClose={handleNotificationClose}
      />
      <p>Prediction</p>
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
