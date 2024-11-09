import ShoppingCardIcon from "@/assets/icons/ShoppingCarIcon";
import "./shoppingCard.css";
import { useState } from "react";
import PropTypes from "prop-types";
import ShoppingMinimizeIcon from "@/assets/icons/ShoppingMinimizeIcon";
import { set } from "react-hook-form";

const ShoppingCard = ({ platillos, handleSendOrder, beforeExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState(null);
  const [showErrorAnimation, setShowErrorAnimation] = useState(false);
  const [tableSelected, setTableSelected] = useState(null);

  const toggleCart = () => {
    if (platillos.length > 0 && tableSelected) {
      setIsExpanded(!isExpanded);
    } else {
      setClientName("");
      beforeExpand()
        .then((table) => {
          setIsExpanded(true);
          setTableSelected(table);
        })
        .catch(() => {
          console.log("Expansión cancelada o popup cerrado sin selección");
        });
    }
  };

  const minimizeCart = (event) => {
    event.stopPropagation();
    setIsExpanded(false);
  };

  const onSucess = () => {
    setClientName("");
    setIsExpanded(false);
    setTableSelected(null);
  };

  const handleSendClick = () => {
    if (platillos.length === 0 || clientName === "") {
      setError("Debes agregar el nombre del cliente ");
      setShowErrorAnimation(false); // Resetea la animación quitando la clase temporalmente
      setTimeout(() => setShowErrorAnimation(true), 0); // Activa la clase para la animación
      return;
    }
    setError(null);
    setShowErrorAnimation(false);
    handleSendOrder(clientName, onSucess);
  };

  return (
    <div
      className={`shopping-card ${isExpanded ? "expanded" : ""}`}
      onClick={!isExpanded ? toggleCart : null}
    >
      {isExpanded ? (
        <div className="shopping-card-inside">
          <div className="shopping-minimize" onClick={minimizeCart}>
            <ShoppingMinimizeIcon />
          </div>
          <div className="shopping-header">
            <div className="shopping-header-title">
              <p>Pedido</p>
              <p className="table-number">Mesa {tableSelected}</p>
            </div>
            <input
              type="text"
              className={showErrorAnimation ? "shopping-error" : ""}
              placeholder="Ingresa el nombre del cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="shopping-items">
            {platillos.map((platillo) => (
              <div key={platillo.id} className="shopping-item">
                <p className="shopping-item-name">{platillo.name}</p>
                <p className="shopping-item-count">{platillo.count}</p>
              </div>
            ))}
          </div>
          <button
            className={`shopping-button ${
              platillos.length === 0 || clientName === "" ? "disabled" : ""
            }`}
            onClick={handleSendClick}
          >
            Enviar
          </button>
          {error && <p className="shopping-error-msg">{error}</p>}
        </div>
      ) : (
        <ShoppingCardIcon />
      )}
    </div>
  );
};

ShoppingCard.propTypes = {
  platillos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleSendOrder: PropTypes.func.isRequired,
  beforeExpand: PropTypes.func.isRequired,
};

export default ShoppingCard;
