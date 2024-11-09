import ShoppingCardIcon from "@/assets/icons/ShoppingCarIcon";
import "./shoppingCard.css";
import { useState } from "react";
import PropTypes from "prop-types";
const ShoppingCard = ({ platillos }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCart = () => {
    setIsExpanded(true); // Expande la tarjeta solo cuando está minimizada
  };

  const minimizeCart = (event) => {
    event.stopPropagation(); // Evita que el evento se propague
    setIsExpanded(false); // Minimiza la tarjeta
  };

  return (
    <div
      className={`shopping-card ${isExpanded ? "expanded" : ""}`}
      onClick={!isExpanded ? toggleCart : null} // Solo asigna el evento cuando está minimizado
    >
      {isExpanded ? (
        <div className="shopping-card-inside">
          <div className="shopping-minimize" onClick={minimizeCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="4"
              viewBox="0 0 24 4"
              fill="none"
            >
              <path
                d="M-8 2C-8 1.46957 -7.78929 0.96086 -7.41421 0.585787C-7.03914 0.210714 -6.53043 0 -6 0H22C22.5304 0 23.0391 0.210714 23.4142 0.585787C23.7893 0.96086 24 1.46957 24 2C24 2.53043 23.7893 3.03914 23.4142 3.41421C23.0391 3.78929 22.5304 4 22 4H-6C-6.53043 4 -7.03914 3.78929 -7.41421 3.41421C-7.78929 3.03914 -8 2.53043 -8 2Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="shopping-header">
            <p>Pedido</p>
            <input type="text" placeholder="Ingresa el nombre del cliente" />
          </div>
          <div className="shopping-items">
            {platillos.map((platillo) => (
              <div key={platillo.id} className="shopping-item">
                <p className="shopping-item-name">{platillo.name}</p>
                <p className="shopping-item-count">{platillo.count}</p>
              </div>
            ))}
          </div>
          <button className="shopping-button">Enviar</button>
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
};

export default ShoppingCard;
