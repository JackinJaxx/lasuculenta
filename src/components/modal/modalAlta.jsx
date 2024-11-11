import ErrorIcon from "@/assets/icons/ErrorIcon";
import Loader from "../spinner/Spinner";
import "./modalAlta.css";
import { useState } from "react";
import ShoppingMinimizeIcon from "@/assets/icons/ShoppingMinimizeIcon";
import PropTypes from "prop-types";

const ModalAlta = ({ handlers, isVisible, title, children }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
            <p>{title}</p>
            <button onClick={handlers.closePopupHandler}>
              <ShoppingMinimizeIcon />
            </button>
          </div>
          <div className="modal-body">
            {children} {/* Renderiza los children aquí */}
          </div>
        </div>
      </div>
    ))
  );
};

ModalAlta.propTypes = {
  handlers: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node, // Añadido para especificar que children es un nodo válido
};

export default ModalAlta;
