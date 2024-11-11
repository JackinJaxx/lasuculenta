import ShoppingMinimizeIcon from "@/assets/icons/ShoppingMinimizeIcon";
import "./modalTable.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useOrders from "@/hooks/OrderService";
import Loader from "../spinner/Spinner";
import ErrorIcon from "@/assets/icons/ErrorIcon";
const ModalTable = ({ handlers, isVisible }) => {
  const numTables = 10;
  const { data: orders, loading, error, fetchOrders } = useOrders();

  useEffect(() => {
    // if (isVisible) {
    //   fetchOrders();
    // }
  }, [isVisible]);

  return (
    isVisible &&
    (error ? (
      <div className="error-msg">
        <ErrorIcon />
        <p>An error occurred while loading the tables</p>
      </div>
    ) : loading ? (
      <Loader isLoading={loading} />
    ) : (
      <div className="modal-overlay">
        <div className="modal-table">
          <div className="modal-header">
            <p>Select a table</p>
            <button onClick={handlers.closePopupHandler}>
              <ShoppingMinimizeIcon />
            </button>
          </div>
          <div className="modal-body">
            {[...Array(numTables)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlers.selectTableHandler(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    ))
  );
};

ModalTable.propTypes = {
  handlers: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ModalTable;
